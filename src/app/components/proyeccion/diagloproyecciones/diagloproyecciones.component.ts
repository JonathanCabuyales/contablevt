import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ProyeccionService } from 'src/app/services/proyeccion/proyeccion.service';
import { DialogconfirmacionComponent } from '../../dialogs/dialogconfirmacion/dialogconfirmacion.component';
import { DialogfechasregistradasComponent } from '../dialogfechasregistradas/dialogfechasregistradas.component';

@Component({
  selector: 'app-diagloproyecciones',
  templateUrl: './diagloproyecciones.component.html',
  styleUrls: ['./diagloproyecciones.component.css']
})
export class DiagloproyeccionesComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'descripcion', 'observaciones', 'viabilidad', 'estado', 'detalles', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaproyecciones: any[];
  token: string;

  analisis = {
    valoraCobrar: '',
    totalpersonal: '',
    totalequipo: '',
    totalinsumos: '',
    analisis: ''
  }

  proyeccionRechazar = {
    token: '',
    id_pro: ''
  }

  constructor(private _cookie: CookieService,
    private _proyeccion: ProyeccionService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');
    this.loadProyecciones();
  }

  loadProyecciones() {
    this._proyeccion.getProyecciones(this.token).subscribe(res => {

      console.log(res);
      
      this.listaproyecciones = res.data;

      if (this.listaproyecciones.length) {

        for (let i = 0; i < this.listaproyecciones.length; i++) {

          this.listaproyecciones[i].empleados_pro = JSON.parse(res.data[i].empleados_pro);
          this.listaproyecciones[i].equipo_pro = JSON.parse(res.data[i].equipo_pro);
          this.listaproyecciones[i].insumos_pro = JSON.parse(res.data[i].insumos_pro);
          this.listaproyecciones[i].rendimiento_pro = JSON.parse(res.data[i].rendimiento_pro);
          this.listaproyecciones[i].valores_pro = JSON.parse(res.data[i].valores_pro);
          this.listaproyecciones[i].fechas_pro = JSON.parse(res.data[i].fechas_pro);

        }

      } else {
        this.listaproyecciones = [];
      }

      this.dataSource = new MatTableDataSource(this.listaproyecciones);
      this.dataSource.paginator = this.paginator;
      
    });
  }

  aprobarProyecto(proyeccion) {
    console.log(proyeccion);

    let totalTiempoProyecto = '0';
    let totalEquipoMinimo = '0';
    let totalInsumos = '0';

    for (let i = 0; i < proyeccion.empleados_pro.length; i++) {
      totalTiempoProyecto = (parseFloat(totalTiempoProyecto) + parseFloat(proyeccion.empleados_pro[i].total)).toFixed(2);
    }

    for (let i = 0; i < proyeccion.equipo_pro.length; i++) {
      totalEquipoMinimo = (parseFloat(totalEquipoMinimo) + parseFloat(proyeccion.equipo_pro[i].total)).toFixed(2);
    }


    for (let i = 0; i < proyeccion.insumos_pro.length; i++) {
      totalInsumos = (parseFloat(totalInsumos) + parseFloat(proyeccion.insumos_pro[i].total)).toFixed(2);
    }

    this.analisis.valoraCobrar = proyeccion.valores_pro.valoraCobrar;
    this.analisis.totalequipo = totalEquipoMinimo;
    this.analisis.totalinsumos = totalInsumos;
    this.analisis.totalpersonal = totalTiempoProyecto;
    this.analisis.analisis = (parseFloat(proyeccion.valores_pro.valoraCobrar) - parseFloat(totalTiempoProyecto) - parseFloat(totalEquipoMinimo) - parseFloat(totalInsumos)).toFixed(2);

    proyeccion.token = this.token;
    proyeccion.analisis = this.analisis;


    this._proyeccion.aprobarProyeccion(proyeccion).subscribe(res=>{
      if(res.data){
        this._proyeccion.sendMailAprobado(proyeccion).subscribe(res=>{
          if(res.data){
            this.loadProyecciones();
            this.toastSuccess("Hemos aprobado el proyecto " + proyeccion.descripcion_pro + ", se ha enviado una notificación al responsable.");
          }
        });
      }
    });    
    
  }

  rechazarProceso(proceso){

    console.log(proceso);
    

    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '450px',
      data: 'recharzar el proceso ' + proceso.descripcion_pro
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.proyeccionRechazar.token = this.token;
        this.proyeccionRechazar.id_pro = proceso.id_pro;
    
        this._proyeccion.rechazarProyeccion(this.proyeccionRechazar).subscribe(res=>{
          
          if(res.data){
            this.toastSuccess("El proceso fue Rechazado");
            this.loadProyecciones();
          }else{
            this.toastError("Tenemos problemas para actualizar la información por favor intentalo más tarde");
            this.loadProyecciones();
          }
          
        });
      }

    });
  }

  verFechas(proceso){
    const dialogRef = this.dialog.open(DialogfechasregistradasComponent, {
      width: '650px',
      data: proceso
    }
    );

    dialogRef.afterClosed().subscribe(res=>{
      
    });
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
    pdf.add(new Table([
      [{ text: 'Observaciones', fillColor: '#1d1d24', color: '#fff' },
      proyeccion.informacion_pro]
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
        [{ text: proyeccion.empleados_pro[i].empleado }, { text: proyeccion.empleados_pro[i].cantidad }, { text: proyeccion.empleados_pro[i].remuneracion }, { text: proyeccion.empleados_pro[i].decimotercer }, { text: proyeccion.empleados_pro[i].decimocuarto }, { text: proyeccion.empleados_pro[i].total }]
      ]).alignment('center').fontSize(10).widths(['20%', '16%', '16%', '16%', '16%', '16%']).end);
    }

    pdf.add(new Table([
      // ['', '', '', { text: 'Total Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: this.totalEmpleadosSueldos + ' $', fillColor: '#1d1d24', color: '#fff' }],
      ['', '', '', { text: 'Total Tiempo Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: totalTiempoProyecto, fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['20%', '16%', '16%', '32%', '16%']).end);
    pdf.add(new Table([
      // ['', '', '', { text: 'Total Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: this.totalEmpleadosSueldos + ' $', fillColor: '#1d1d24', color: '#fff' }],
      ['', '', '', { text: 'Total Tiempo Proyecto', fillColor: '#1d1d24', color: '#fff' }, 
      { text: parseFloat(totalTiempoProyecto) * parseInt(proyeccion.tiempo_pro), fillColor: '#1d1d24', color: '#fff' }]
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
        { text: parseFloat(totalTiempoProyecto) * parseInt(proyeccion.tiempo_pro) + ' $', fillColor: '#C8C8C8', color: '#1d1d24' },
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
        { text: (parseFloat(proyeccion.valores_pro.valoraCobrar) - (parseFloat(totalTiempoProyecto) * parseInt(proyeccion.tiempo_pro)) - parseFloat(totalEquipoMinimo) - parseFloat(totalInsumos)).toFixed(2) + ' $', fillColor: '##969FA5', color: '#fff' },
        '']
    ]).alignment('center').fontSize(10).layout('noBorders').widths(['20%', '30%', '30%', '20%']).end);

    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    // seccion resultados del proyecto
    pdf.add(new Table([
      [{ text: 'Valores Rendimiento Proyecto', fillColor: '#1d1d24', color: '#fff' }]
    ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{ text: 'Margen de Error', fillColor: '#1d1d24', color: '#fff' },
      proyeccion.rendimiento_pro.margenerror + ' %',
      { text: '% Bancario', fillColor: '#1d1d24', color: '#fff' },
      proyeccion.rendimiento_pro.porcentajeban + ' %']
    ]).alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);

    pdf.add(new Txt('\n').end);
    pdf.add(new Table([
      [{ text: 'Rendimiento Proyecto', fillColor: '#1d1d24', color: '#fff' }, { text: proyeccion.rendimiento_pro.rendimientoProyecto }, { text: 'Total Costo Inversión', fillColor: '#1d1d24', color: '#fff' }, { text: proyeccion.rendimiento_pro.totalCostoInversion }],
      [{ text: 'Rendimiento Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: proyeccion.rendimiento_pro.rendimientoMensual }, { text: 'Comparativo bancario rendimiento mejor tasa 4,5% Anual', fillColor: '#1d1d24', color: '#fff' }, { text: proyeccion.rendimiento_pro.comparativoBancario }],
      [{ text: 'Inversión', fillColor: '#1d1d24', color: '#fff', bold: true }, { text: proyeccion.rendimiento_pro.inversion }, { text: 'Rendimiento Comparativo', fillColor: '#1d1d24', color: '#fff' }, { text: proyeccion.rendimiento_pro.rendimientoComparativo }],
      [{ text: 'Otros no considerados depreciables', fillColor: '#1d1d24', color: '#fff' }, { text: proyeccion.rendimiento_pro.otrosNoConsiderados }, { text: 'Rendimiento Proyecto', fillColor: '#1d1d24', color: '#fff' }, { text: proyeccion.rendimiento_pro.rendimientoProyecto }]
    ]).alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);

    // Fin del pdf
    pdf.create().open();

  }

  // mensajes 

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 6000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
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

}
