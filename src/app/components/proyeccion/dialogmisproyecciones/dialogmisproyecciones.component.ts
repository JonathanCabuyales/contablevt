import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { LoginService } from 'src/app/services/login.service';
import { ProyeccionService } from 'src/app/services/proyeccion/proyeccion.service';
import { DialogfechasComponent } from '../dialogfechas/dialogfechas.component';

@Component({
  selector: 'app-dialogmisproyecciones',
  templateUrl: './dialogmisproyecciones.component.html',
  styleUrls: ['./dialogmisproyecciones.component.css']
})
export class DialogmisproyeccionesComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'descripcion', 'viabilidad', 'estado', 'fechas', 'detalles', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  token: string = '';

  hojapedido = {
    detalle: '',
    cantidad: '',
    estado: 'NO APROBADO'
  }

  // variable para guardar las proyecciones
  listaproyecciones: any[];
  listahojapedido: any[];

  lastIndex: number = 0;

  constructor(public dialogRef: MatDialogRef<DialogmisproyeccionesComponent>, @Inject(MAT_DIALOG_DATA)
    public proyeccion: any,
    private _cookie: CookieService,
    private _login: LoginService,
    private _proyeccion: ProyeccionService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");    

    this._login.getuserdata(this.token).subscribe(res => {
      // el id de usuario desde el token es "id"
      this._proyeccion.getProyeccionesUsuario(this.token, res.data.id).subscribe(res => {
        
        this.listaproyecciones = res.data;

        console.log(res);

        if (this.listaproyecciones.length) {

          for (let i = 0; i < this.listaproyecciones.length; i++) {

            this.listaproyecciones[i].empleados_pro = JSON.parse(res.data[i].empleados_pro);
            this.listaproyecciones[i].equipo_pro = JSON.parse(res.data[i].equipo_pro);
            this.listaproyecciones[i].insumos_pro = JSON.parse(res.data[i].insumos_pro);
            this.listaproyecciones[i].rendimiento_pro = JSON.parse(res.data[i].rendimiento_pro);
            this.listaproyecciones[i].valores_pro = JSON.parse(res.data[i].valores_pro);
            this.listaproyecciones[i].fechas_pro = JSON.parse(res.data[i].fechas_pro);
            // this.listaproyecciones[i].actividades_act = JSON.parse(res.data[i].actividades_act);
            // this.listaproyecciones[i].hojapedido_hoja = JSON.parse(res.data[i].hojapedido_hoja);

          }

          this.dataSource = new MatTableDataSource(this.listaproyecciones);
          this.dataSource.paginator = this.paginator;

        }

      });
    });
  }

  guardarFechas(proyeccion){
    
    const dialogRef = this.dialog.open(DialogfechasComponent, {
      width: '650px',
      data: proyeccion
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
      }

    });

    
  }


  selectItem(item){

    this.dialogRef.close(item);

  }


  generarPdf(proyeccion) {

    console.log(proyeccion);
    

    const pdf = new PdfMakeWrapper();

    pdf.pageMargins([40, 60, 40, 60]);

    pdf.info({
      title: 'PROYECCION'
    });

    pdf.add(new Table([
      [{ text: 'Descripción Proyecto', fillColor: '#1d1d24', color: '#fff' },
      proyeccion.descripcion_pro]
    ]).alignment('center').fontSize(12).widths(['25%', '75%']).end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Table([
      [{ text: 'Proyeccion Realizada Por', fillColor: '#1d1d24', color: '#fff' },
      proyeccion.usuario,
      { text: 'Viabilidad Del Proyecto', fillColor: '#1d1d24', color: '#fff' },
      proyeccion.viabilidad_pro]
    ]).alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);

    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{ text: 'Valores Proyecto', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Table([
      ['', '', { text: 'IVA', fillColor: '#1d1d24', color: '#fff' }, { text: 'Valor Total', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);
    pdf.add(new Table([
      [{ text: 'Valor Contrato', fillColor: '#1d1d24', color: '#fff' }, proyeccion.valores_pro.valorPrestamo + " $", proyeccion.valores_pro.ivaValorContrato + " $", proyeccion.valores_pro.valorTotalContrato + " $"],
      [{ text: 'Rentención Renta', fillColor: '#1d1d24', color: '#fff' }, proyeccion.valores_pro.retencionRenta + " $", proyeccion.valores_pro.ivaRetencionRenta + " $", proyeccion.valores_pro.valorTotalRetencion + " $"],
      [{ text: 'Valor a Cobrar', fillColor: '#1d1d24', color: '#fff', bold: true }, '', '', { text: proyeccion.valores_pro.valoraCobrar + ' $', fillColor: '#1d1d24', color: '#fff', bold: true }]
    ]).alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);

    // seccion personal
    pdf.add(new Txt('\n\n').end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{ text: 'Personal Requerido', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('Tiempo Del Proyecto: ').fontSize(14).end);
    pdf.add(new Txt(proyeccion.tiempo_pro).bold().fontSize(14).end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{ text: 'Tipo Personal', fillColor: '#122268', color: '#fff' },
      { text: 'Cantidad', fillColor: '#122268', color: '#fff' },
      { text: 'Remuneración', fillColor: '#122268', color: '#fff' },
      { text: 'Decimo Tercer', fillColor: '#122268', color: '#fff' },
      { text: 'Decimo Cuarto', fillColor: '#122268', color: '#fff' },
      { text: 'Total', fillColor: '#122268', color: '#fff' }]
    ]).alignment('center').fontSize(10).widths(['20%', '16%', '16%', '16%', '16%', '16%']).end);


    let totalTiempoProyecto = '0';

    for (let i = 0; i < proyeccion.empleados_pro.length; i++) {

      totalTiempoProyecto = (parseFloat(totalTiempoProyecto) + parseFloat(proyeccion.empleados_pro[i].total)).toFixed(2);
      pdf.add(new Table([
        [{ text: proyeccion.empleados_pro[i].empleado }, 
        { text: proyeccion.empleados_pro[i].cantidad }, 
        { text: proyeccion.empleados_pro[i].remuneracion }, 
        { text: proyeccion.empleados_pro[i].decimotercer }, 
        { text: proyeccion.empleados_pro[i].decimocuarto }, 
        { text: proyeccion.empleados_pro[i].total }]
      ]).alignment('center').fontSize(10).widths(['20%', '16%', '16%', '16%', '16%', '16%']).end);
    }

    pdf.add(new Table([
      // ['', '', '', { text: 'Total Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: this.totalEmpleadosSueldos + ' $', fillColor: '#1d1d24', color: '#fff' }],
      ['', '', '', { text: 'Total Tiempo Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: totalTiempoProyecto, fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['20%', '16%', '16%', '32%', '16%']).end);
    pdf.add(new Table([
      // ['', '', '', { text: 'Total Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: this.totalEmpleadosSueldos + ' $', fillColor: '#1d1d24', color: '#fff' }],
      ['', '', '', { text: 'Total Tiempo Proyecto', fillColor: '#1d1d24', color: '#fff' }, 
      { text: parseFloat(totalTiempoProyecto) * parseInt(totalTiempoProyecto), fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['20%', '16%', '16%', '32%', '16%']).end);
    
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    // seccion equipo minimo
    pdf.add(new Table([
      [{ text: 'Equipo Minimo', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{ text: 'Detalle', fillColor: '#126817', color: '#fff' },
      { text: 'Cantidad', fillColor: '#126817', color: '#fff' },
      { text: 'Valor', fillColor: '#126817', color: '#fff' },
      { text: 'Total Mes', fillColor: '#126817', color: '#fff' },
      { text: 'Total', fillColor: '#126817', color: '#fff' }]
    ]).alignment('center').fontSize(10).widths(['28%', '18%', '18%', '18%', '18%']).end);


    let totalEquipoMinimo = '0';

    for (let i = 0; i < proyeccion.equipo_pro.length; i++) {

      totalEquipoMinimo = (parseFloat(totalEquipoMinimo) + parseFloat(proyeccion.equipo_pro[i].total)).toFixed(2);

      pdf.add(new Table([
        [{ text: proyeccion.equipo_pro[i].detalle },
        { text: proyeccion.equipo_pro[i].cantidad },
        { text: proyeccion.equipo_pro[i].valor },
        { text: proyeccion.equipo_pro[i].totalMes },
        { text: proyeccion.equipo_pro[i].total }]
      ]).alignment('center').fontSize(10).widths(['28%', '18%', '18%', '18%', '18%']).end);
    }

    pdf.add(new Table([
      ['',
        '',
        '',
        { text: 'Total Equipo', fillColor: '#1d1d24', color: '#fff' },
        { text: totalEquipoMinimo + ' $', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['20%', '16%', '16%', '32%', '16%']).end);

    // seccion insumos
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{ text: 'Insumos', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{ text: 'Detalle', fillColor: '#AF1B1B', color: '#fff' },
      { text: 'Cantidad', fillColor: '#AF1B1B', color: '#fff' },
      { text: 'Valor', fillColor: '#AF1B1B', color: '#fff' },
      { text: 'Total Mes', fillColor: '#AF1B1B', color: '#fff' },
      { text: 'Total', fillColor: '#AF1B1B', color: '#fff' }]
    ]).alignment('center').fontSize(10).widths(['28%', '18%', '18%', '18%', '18%']).end);


    let totalInsumos = '0';

    for (let i = 0; i < proyeccion.insumos_pro.length; i++) {

      totalInsumos = (parseFloat(totalInsumos) + parseFloat(proyeccion.insumos_pro[i].total)).toFixed(2);

      pdf.add(new Table([
        [{ text: proyeccion.insumos_pro[i].detalle },
        { text: proyeccion.insumos_pro[i].cantidad },
        { text: proyeccion.insumos_pro[i].valor },
        { text: proyeccion.insumos_pro[i].totalMes },
        { text: proyeccion.insumos_pro[i].total }]
      ]).alignment('center').fontSize(10).widths(['28%', '18%', '18%', '18%', '18%']).end);
    }

    pdf.add(new Table([
      ['',
        '',
        '',
        { text: 'Total Insumos', fillColor: '#1d1d24', color: '#fff' },
        { text: totalInsumos + ' $', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['20%', '16%', '16%', '32%', '16%']).end);

    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    // seccion analisis del proyecto

    pdf.add(new Table([
      [{ text: 'Analisis', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      ['',
        { text: 'Valor a Cobrar', fillColor: '#1d1d24', color: '#fff' },
        { text: proyeccion.valores_pro.valoraCobrar + ' $', fillColor: '#C8C8C8', color: '#1d1d24' },
        ''],
      ['',
        { text: 'Total Personal', fillColor: '#1d1d24', color: '#fff' },
        { text: totalTiempoProyecto + ' $', fillColor: '#C8C8C8', color: '#1d1d24' },
        ''],
      ['',
        { text: 'Total Equipo Minimo', fillColor: '#1d1d24', color: '#fff' },
        { text: totalEquipoMinimo + ' $', fillColor: '#C8C8C8', color: '#1d1d24' },
        ''],
      ['',
        { text: 'Total Insumos', fillColor: '#1d1d24', color: '#fff' },
        { text: totalInsumos + ' $', fillColor: '#C8C8C8', color: '#1d1d24' },
        ''],
      ['',
        { text: 'Analisis', fillColor: '#1d1d24', color: '#fff' },
        { text: (parseFloat(proyeccion.valores_pro.valoraCobrar) - parseFloat(totalTiempoProyecto) - parseFloat(totalEquipoMinimo) - parseFloat(totalInsumos)).toFixed(2) + ' $', fillColor: '##969FA5', color: '#fff' },
        '']
    ]).alignment('center').fontSize(10).layout('noBorders').widths(['20%', '30%', '30%', '20%']).end);

    // Fin del pdf
    pdf.create().open();

  }


  // mensajes 

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    if (filtro == '' || filtro == null) {
    } else {
      filtro = filtro.trim(); // Remove whitespace
      filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filtro;
    }
  }

  // funcion para cambiar los dias trabajados en el proyecto
  cambiarFecha(evento: any){
    console.log(evento);
    
  }

}
