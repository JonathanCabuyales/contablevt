import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { SueldosService } from 'src/app/services/sueldos.service';
import { PdfMakeWrapper, Txt, Img, Columns, Table } from 'pdfmake-wrapper';
import Swal from 'sweetalert2';
import { RolI } from 'src/app/models/sueldos/rol.interface';
import { CookieService } from 'ngx-cookie-service';
import { DialogeditrolComponent } from '../dialogeditrol/dialogeditrol.component';
import { MatDialog } from '@angular/material/dialog';
import { SueldosI } from 'src/app/models/sueldos/sueldos.interface';

@Component({
  selector: 'app-sueldospagados',
  templateUrl: './sueldospagados.component.html',
  styleUrls: ['./sueldospagados.component.css']
})
export class SueldospagadosComponent implements OnInit {

  displayedColumns: string[] = ['empleado', 'ingresos', 'egresos', 'otrosvalores',
    'netorecibir', 'autorizacion'];
  dataSource: MatTableDataSource<any>;


  meses: any[] = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  fecha: string = '';

  mesReporte: any = '0';
  anioreporte: string = '';

  listaRoles: any[];
  rolUpadate: RolI;

  showCargar: boolean = false;
  token: string;

  constructor(private _bdemapa: BdemapaService,
    private router: Router,
    private _sueldo: SueldosService,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private dialog: MatDialog) { 

    }

  ngOnInit(): void {
    
    this.token = this._cookie.get('token');
    
    this.mesReporte = '0';
    this.anioreporte =  '' + new Date().getFullYear();
    this.listaRoles = [];
    this.dataSource = new MatTableDataSource(this.listaRoles);
   
  }

  excel() {

    let mes = new Date().getMonth();
    let anio = new Date().getFullYear();

    if(this.listaRoles.length){
      this._bdemapa.exportToExcel(this.listaRoles, "Roles_" +
      this.anioreporte + '_' + mes);
    }else{
      this.toastError("");
    }
  }

  loadRoles() {
    
    this._sueldo.getAll(this.token).subscribe(res => {
      if (res.data.length) {
        this.listaRoles = res.data;

        this.dataSource = new MatTableDataSource(this.listaRoles);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastWarning("No se encuentran registros en Roles de pago");

        this.listaRoles = [];
        this.dataSource = new MatTableDataSource(this.listaRoles);
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  editrol(rolupdate){
    const dialogRef = this.dialog.open(DialogeditrolComponent, {
      width: '900px',
      data: rolupdate
    });

    dialogRef.afterClosed().subscribe(res => {
      
      if(res == true){
        this.loadRoles();
      }

    });
    
  }

  aprobar(aprobar: SueldosI) {

    
    aprobar.token = this.token;
    aprobar.aprobado = 'SI';

    // console.log(aprobar);

    this._sueldo.updateSueldo(aprobar).subscribe(res => {

      if(res.data == true){
        this.loadRoles();
      this.toastSuccess("grabado");
      }else{
        this.toastError("No hemos podido aprobar el rol intente más tarde por favor.");
      }
      
      
    });

  }

  // seccion para mostrar el boton de carga
  capturar() {
    if (this.mesReporte == '0') {
      this.showCargar = false;
    } else {
      this.showCargar = true;
    }
  }

  cargarReporte() {

    if (this.mesReporte == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar el mes para continuar'
      });
    } else {

      // let ultimoDia = new Date(today.getFullYear(), this.mesReporte, 0).getDate()

      if(this.mesReporte < 10){
        this.fecha = this.anioreporte + '-0' + this.mesReporte + '-15' ;
      }else{
        this.fecha = this.anioreporte + '-' + this.mesReporte + '-15' ;
      }
      console.log(this.fecha);
      

      this._sueldo.getSueldosMes(this.fecha, this.token).subscribe(res => {

        if (res.data.length) {
          this.listaRoles = res.data;
          
          this.dataSource = new MatTableDataSource(this.listaRoles);
          this.dataSource.paginator = this.paginator;
        } else {
          this.toastError("No se encuentrar registros");
          this.listaRoles = [];
          this.dataSource = new MatTableDataSource(this.listaRoles);
          this.dataSource.paginator = this.paginator;
        }
      });

    }
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

    let obtener_mes = this.meses[this.mesReporte - 1];
    console.log(obtener_mes);
    //TODO: dias trabajados
    let calcular_dias = new Date(parseInt(this.anioreporte), this.mesReporte, 0);

    
    pdf.add(new Table([
      [{ text: 'Apellidos:', bold: true }, rol.apellidos, '', { text: 'Periodo:', bold: true }, { text: `${obtener_mes} - ${ this.anioreporte }` }]
    ]).layout('noBorders').fontSize(11).widths(['15%', '25%', '25%', '20%', '15%']).end);

    pdf.add(new Table([
      [{ text: 'Nombres:', bold: true }, rol.nombres, '', { text: 'Días trabajados:', bold: true }, { text: `${calcular_dias.getDate()}` }]
    ]).layout('noBorders').fontSize(11).widths(['15%', '25%', '25%', '20%', '15%']).end);

    pdf.add(new Table([
      [{ text: 'C.I.:', bold: true }, rol.ciruc, '']
    ]).layout('noBorders').fontSize(11).widths(['15%', '25%', '25%', '20%', '15%']).end);

    pdf.add(new Table([
      [{ text: 'RMU: ', bold: true }, rol.sueldo + ' $', '']
    ]).layout('noBorders').fontSize(11).widths(['15%', '25%', '25%', '20%', '15%']).end);

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
    
    if (rol.otrosingresos !== '0' || rol.otrosingresos === '0') {
      pdf.add(new Table([
        [{ text: 'Fondos de reserva 8.33%:', bold: true }, { text: (rol.sueldo * 0.0833).toFixed(2) + ' $', alignment: 'right'}, '', '']
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).layout('noBorders').end);
    }

    /* if(rol.otrosegresos !== '0'){
      pdf.add(new Table([
        [ '', '',{ text: 'Otros Egresos:', bold: true } , { text: rol.otrosegresos + ' $', alignment: 'right'}]
      ]).fontSize(11).widths(['25%', '25%', '25%', '25%']).relativePosition(0, -17).layout('noBorders').end);
    } */


    pdf.add(new Txt('\n\n').end);

    let calcular_sueldo = (parseFloat(rol.sueldo) + (parseFloat(rol.sueldo) * 0.0833) - parseFloat(rol.iessindividual)).toFixed(2);
    let calcular_ingresos = (parseFloat(rol.sueldo) + (parseFloat(rol.sueldo) * 0.0833)).toFixed(2);

    if(rol.totalingresos !== '0'){
      pdf.add(new Table([
        [{ text: 'Total Ingresos: ', bold: true}, { text: calcular_ingresos + ' $' ,bold: true, alignment: 'right'}, { text: 'Total Egresos: ', bold: true}, { text: rol.total_egresos + ' $' ,bold: true, alignment: 'right'}]
      ]).fontSize(11).widths(['25%','25%','25%','25%']).layout('noBorders').end);
    }

    pdf.add(new Txt('\n').end);

    if(rol.neto_recibir !== '0'){
      pdf.add(new Table([
        [{ text: ' A recibir: ', bold: true, fillColor: '#1d1d24', color: '#fff'}, { text: calcular_sueldo + ' $' ,bold: true, alignment: 'right', fillColor: '#1d1d24', color: '#fff'}, '','']
      ]).fontSize(11).widths(['25%','25%','25%','25%']).layout('noBorders').end);
    }

    pdf.add(new Txt('\n\n').end);

    // Fin de la factura
    pdf.create().open();

  }

  // mensajes 

  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
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

}
