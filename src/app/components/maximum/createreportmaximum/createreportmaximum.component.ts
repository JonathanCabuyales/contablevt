import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaximumService } from 'src/app/services/maximum/maximum.service';

import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'app-createreportmaximum',
  templateUrl: './createreportmaximum.component.html',
  styleUrls: ['./createreportmaximum.component.css']
})
export class CreatereportmaximumComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['fecha', 'detalle', 'deudor', 'acreedor'];

  mostrarCuentasLibro: any[] = [];

  constructor(
    private _maximum: MaximumService
  ) { }

  ngOnInit(): void {
    this.getCuentas();
  }


  getCuentas(){
    this._maximum.getCuentasRegistradas()
    .subscribe((resp) => {
      console.log(resp);
      console.log(resp[0]);
      
      if(resp.length > 0){
        for(let f of resp){
          this._maximum.getCuentasByCuentas(f.id_cuenta)
        .subscribe((respAnexos) =>{
          console.log(respAnexos);
          f.anexos = respAnexos.data;
          
        });
        
        this.mostrarCuentasLibro.push(f);
        }
        console.log(this.mostrarCuentasLibro);
        this.dataSource = new MatTableDataSource(this.mostrarCuentasLibro);
        
      }
      
    })
  }

  descargarPDF(){
    console.log(this.mostrarCuentasLibro);
    
    const pdf = new PdfMakeWrapper();

    // margen del PDF
    // izquierda, arriba, derecha, abajo
    pdf.pageMargins([10, 20, 10, 10]);

    pdf.info({
      title: 'REPORTE'
    });

    // titulo del reporte
    pdf.add(new Table([
      [{ text: 'REPORTE', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);

    pdf.add(new Txt('\n').end);
    
    // cuerpo del reporte
    pdf.add(new Table([
      [{ text: 'Fecha', fillColor: '#1d1d24', color: '#fff' },
      { text: 'Codigo', fillColor: '#1d1d24', color: '#fff' },
      { text: 'Descripcion', fillColor: '#1d1d24', color: '#fff' },
      { text: 'Deudor', fillColor: '#1d1d24', color: '#fff' },
      { text: 'Acreedor', fillColor: '#1d1d24', color: '#fff' }]
    ]).bold().alignment('center').fontSize(10).widths(['10%', '10%', '60%', '10%', '10%']).end);
    
    // pdf.add(new Txt('\n').end);

    for(let i = 0; i < this.mostrarCuentasLibro.length; i ++){
      for(let j=0; j < this.mostrarCuentasLibro[i].anexos.length; j++){
        pdf.add(new Table([
          [this.mostrarCuentasLibro[i].fecharegistro,
          { text: this.mostrarCuentasLibro[i].anexos[j].cod },
          { text: this.mostrarCuentasLibro[i].anexos[j].descripcion},
          { text: (this.mostrarCuentasLibro[i].anexos[j].tipo === 'D') ? this.mostrarCuentasLibro[i].anexos[j].valor : '' },
          { text: (this.mostrarCuentasLibro[i].anexos[j].tipo === 'C') ?this.mostrarCuentasLibro[i].anexos[j].valor : ''}
        ]
        ]).bold().alignment('center').fontSize(9).widths(['10%', '10%', '60%', '10%', '10%']).end);
      }
    }

    // let subtotal = '0';
    // let total = '0';
    // let fondosocial = '0.00';
    // let interes  = '0.00';

    // for (let i = 0; i < res.length; i++) {
    //   subtotal = (parseFloat(subtotal) + parseFloat(res[i].neto_prefac)).toFixed(2);
    //   total = (parseFloat(total) + parseFloat(res[i].total_prefac)).toFixed(2);
    //   fondosocial = (parseFloat(fondosocial) + parseFloat(res[i].fondosocial_prefac)).toFixed(2);
    //   interes = (parseFloat(interes) + parseFloat(res[i].interes_prefac)).toFixed(2);

    
    // }

    // // valores del reporte
    // pdf.add(new Txt('\n\n').end);
    // pdf.add(new Table([
    //   [{ text: 'Facturas Generadas', fillColor: '#1d1d24', color: '#fff' },
    //   { text: res.length }],
    //   [{ text: 'Valor sin Fondo Social', fillColor: '#1d1d24', color: '#fff' },
    //   { text: subtotal + ' $' }],
    //   [{ text: 'Fondo Social', fillColor: '#1d1d24', color: '#fff' },
    //   { text: fondosocial + ' $' }],
    //   [{ text: 'Intereses Cobrados', fillColor: '#1d1d24', color: '#fff' },
    //   { text: interes + ' $' }],
    //   [{ text: 'Total Recaudado', fillColor: '#1d1d24', color: '#fff' },
    //   { text: total + ' $' }],
    // ]).bold().alignment('center').fontSize(12).widths(['50%', '50%']).end);

    // // Fin de la factura
    pdf.create().open();
    
  }

}
