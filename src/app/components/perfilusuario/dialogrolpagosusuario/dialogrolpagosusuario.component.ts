import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { LoginService } from 'src/app/services/login.service';
import { SueldosService } from 'src/app/services/sueldos.service';

@Component({
  selector: 'app-dialogrolpagosusuario',
  templateUrl: './dialogrolpagosusuario.component.html',
  styleUrls: ['./dialogrolpagosusuario.component.css']
})
export class DialogrolpagosusuarioComponent implements OnInit {

  displayedColumns: string[] = ['empleado', 'ingresos', 'egresos', 'otrosvalores',
    'netorecibir', 'autorizacion'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  token: string = '';

  constructor(private _cookie: CookieService,
    private _sueldos: SueldosService,
    private _login: LoginService) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');

    this.loadSueldos();

    let fecha = new Date('2021-09-15');
    console.log();
    

  }

  loadSueldos() {
    this._login.getuserdata(this.token).subscribe(res => {
      this._sueldos.getSueldoUsuario(this.token, res.data.id).subscribe(res => {
        console.log(res.data);
        
        if (res.data.length) {

          for (let i = 0; i < res.data.length; i++) {
            res.data[i].mes_rol = new Date(res.data[i].mes_rol).toLocaleDateString('es', { month: 'long' })            
          }

          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.paginator = this.paginator;
        }else{
          console.log("no hay nada");
          
        }
      });
    });

  }

  // seccion para crear el PDF rol de pago

  async previsualizarPDF(rol: any) {

    console.log(rol);
    
    const pdf = new PdfMakeWrapper();

    pdf.info({
      title: 'ROL DE PAGOS ' + rol.nombres + ' ' + rol.apellidos
    });
    pdf.add(new Txt('\n').end);
    pdf.add((await new Img('../../../assets/img/VTSESION.png').relativePosition(400, 75).height('100').width('100').build()));
    pdf.add(new Table([
      [{ text: 'ROL DE PAGOS VT PROYECTOS', bold: true, fontSize: 20 }, '']
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['78%', '22%']).end);
    pdf.add(new Txt('\n\n\n\n').end);
    pdf.add(new Table([
      [{ text: 'Datos del empleado:', bold: true }, '']
    ]).layout('noBorders').fontSize(12).widths(['78%', '22%']).end);
    pdf.add(new Txt('\n\n').end);

    pdf.add(new Table([
      [{ text: 'Apellidos:', bold: true }, rol.apellidos, '', { text: 'Periodo:', bold: true }, { text: rol.mes_rol  }]
    ]).layout('noBorders').fontSize(11).widths(['15%', '25%', '25%', '20%', '15%']).end);

    pdf.add(new Table([
      [{ text: 'Nombres:', bold: true }, rol.nombres, '', { text: 'Días trabajados:', bold: true }, { text: rol.diastrabajados }]
    ]).layout('noBorders').fontSize(11).widths(['15%', '25%', '25%', '20%', '15%']).end);

    pdf.add(new Table([
      [{ text: 'C.I.:', bold: true }, rol.ciruc, '']
    ]).layout('noBorders').fontSize(11).widths(['18%', '60%', '22%']).end);

    pdf.add(new Table([
      [{ text: 'RMU: ', bold: true }, rol.sueldo + '$', '']
    ]).layout('noBorders').fontSize(11).widths(['18%', '60%', '22%']).end);

    pdf.add(new Txt('\n\n').end);

    pdf.add(new Table([
      [{ text: 'INGRESOS', bold: true, fillColor: '#1d1d24', color: '#fff' }, { text: 'EGRESOS', bold: true, fillColor: '#1d1d24', color: '#fff' }]
    ]).fontSize(11).widths(['50%', '50%']).end);

    if (rol.iessindividual !== '0') {
      pdf.add(new Table([
        ['', '',{ text: 'Aporte IESS 9,45%:', bold: true }, { text: rol.iessindividual + ' $', alignment: 'right'}]
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).layout('noBorders').end);
    }

    if (rol.calculo_horas !== '0') {
      pdf.add(new Table([
        [{ text: 'Horas Extras:', bold: true }, { text: rol.calculo_horas + ' $', alignment: 'right'}, '', '']
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).layout('noBorders').end);
    }

    if(rol.anticipos !== '0'){
      pdf.add(new Table([
        [ '', '',{ text: 'Anticipos:', bold: true } , { text: rol.anticipos + ' $', alignment: 'right'}]
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).relativePosition(0, -17).layout('noBorders').end);
    }

    if (rol.bonostransporte !== '0') {
      pdf.add(new Table([
        [{ text: 'Bono de transporte:', bold: true }, { text: rol.bonostransporte + ' $', alignment: 'right'}, '', '']
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).layout('noBorders').end);
    }

    if(rol.prestamos_oficina !== '0'){
      pdf.add(new Table([
        [ '', '',{ text: 'Préstamo Oficina:', bold: true } , { text: rol.prestamos_oficina + ' $', alignment: 'right'}]
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).relativePosition(0, -17).layout('noBorders').end);
    }

    if (rol.bonosalimentacion !== '0') {
      pdf.add(new Table([
        [{ text: 'Bono de alimentación:', bold: true }, { text: rol.bonosalimentacion + ' $', alignment: 'right'}, '', '']
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).layout('noBorders').end);
    }
    
    if(rol.prestamo_hipotecario !== '0'){
      pdf.add(new Table([
        [ '', '',{ text: 'Préstamo Hipotecario:', bold: true } , { text: rol.prestamo_hipotecario + ' $', alignment: 'right'}]
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).relativePosition(0, -17).layout('noBorders').end);
    }

    if (rol.otrosingresos !== '0') {
      pdf.add(new Table([
        [{ text: 'Otros ingresos:', bold: true }, { text: rol.otrosingresos + ' $', alignment: 'right'}, '', '']
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).layout('noBorders').end);
    }

    if(rol.prestamo_quirografario !== '0'){
      pdf.add(new Table([
        [ '', '',{ text: 'Préstamo Quirografario:', bold: true } , { text: rol.prestamo_quirografario + ' $', alignment: 'right'}]
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).relativePosition(0, -17).layout('noBorders').end);
    }

    if (rol.sueldo !== '0') {
      pdf.add(new Table([
        [{ text: 'RMU:', bold: true }, { text: rol.sueldo + ' $', alignment: 'right'}, '', '']
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).layout('noBorders').end);
    }

    if(rol.otrosegresos !== '0'){
      pdf.add(new Table([
        [ '', '',{ text: 'Otros Egresos:', bold: true } , { text: rol.otrosegresos + ' $', alignment: 'right'}]
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).relativePosition(0, -17).layout('noBorders').end);
    }


    pdf.add(new Txt('\n\n').end);

    if(rol.totalingresos !== '0'){
      pdf.add(new Table([
        [{ text: 'Total Ingresos: ', bold: true}, { text: rol.totalingresos + ' $' ,bold: true, alignment: 'right'}, { text: 'Total Egresos: ', bold: true}, { text: rol.total_egresos + ' $' ,bold: true, alignment: 'right'}]
      ]).fontSize(11).widths(['25%','25%','25%','25%']).layout('noBorders').end);
    }

    pdf.add(new Txt('\n').end);

    if(rol.neto_recibir !== '0'){
      pdf.add(new Table([
        [{ text: ' A recibir: ', bold: true, fillColor: '#1d1d24', color: '#fff'}, { text: rol.neto_recibir + ' $' ,bold: true, alignment: 'right', fillColor: '#1d1d24', color: '#fff'}, '','']
      ]).fontSize(11).widths(['25%','25%','25%','25%']).layout('noBorders').end);
    }

    pdf.add(new Txt('\n\n').end);

    // Fin de la factura
    pdf.create().open();

  }
}
