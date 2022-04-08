import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Txt, Img, Table, Toc, Columns, Ul, Ol } from 'pdfmake-wrapper';
import { FacturaclienteI } from 'src/app/models/facturacliente.interface';
import { NovedadreporteI } from 'src/app/models/novedadreporte.interface';
import { FacturaService } from 'src/app/services/factura.service';
import { NovedadesService } from 'src/app/services/novedades.service';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import { DialogconvenioComponent } from '../dialogconvenio/dialogconvenio.component';

@Component({
  selector: 'app-dialogappfacturas',
  templateUrl: './dialogappfacturas.component.html',
  styleUrls: ['./dialogappfacturas.component.css']
})
export class DialogappfacturasComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'ciruc', 'cantidad', 'precio', 'convenio', 'pagos', 'cuota', 'acciones2'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaNovedadReporte: FacturaclienteI[];
  listacomprobar: NovedadreporteI[];
  novedad: NovedadreporteI;
  arregloExcel: NovedadreporteI[];
  urlImagenes: any[];

  dia: any;
  mes: any;
  anio: any;
  fechaFront: any;

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  textoBuscar: String = '';

  // variables para cargar las prefacturas
  listaPrefacturas: any[];
  fechaAutorizacion: any;
  fondoSocial: number = 0.50;

  token: any;

  constructor(private _novedad: NovedadesService,
    private _factura: FacturaService,
    public dialog: MatDialog,
    private _prefactura: PrefacturaService,
    private toastr: ToastrService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');
    this.loadPrefacturas();
    this.fechaAutorizacion = new Date().toLocaleString();

  }

  loadPrefacturas() {

    this._prefactura.getAll(this.token).subscribe(res => {

      if(res.length){
      this.listaPrefacturas = res;

      this.dataSource = new MatTableDataSource(this.listaPrefacturas);
      this.dataSource.paginator = this.paginator;
      }else{
        this.toastWarning("No se encuentran registros de prefacturas, intente nuevamente mas tarde.");
      }
      
    });
  }

  async generarFactura(prefactura: any) {
    
    let items = JSON.parse(prefactura.servicios_prefac);

    let totalItems = [];
    for (let i = 0; i < items.length; i++) {
      totalItems[i] = items[i];
    }
    const pdf = new PdfMakeWrapper();

    pdf.info({
      title: 'FACTURA_ELECTRONICA'
    });
    pdf.add(new Txt('\n').end);
    pdf.add((await new Img('../../../assets/img/gota2.png').relativePosition(90, 130).height('130').width('130').build()));
    pdf.add(new Columns(['', new Txt('FACTURA 000000000000000\n\n').fontSize(16).color('red').width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('NUMERO DE AUTORIZACION').bold().fontSize(10).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('00000000000000000000000000000\n\n').bold().fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('FECHA Y HORA DE AUTORIZACION').bold().fontSize(10).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt(this.fechaAutorizacion + '\n').bold().fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('AMBIENTE: ' + 'Produccion').fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('EMISION: ' + 'Normal\n\n').fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('CLAVE DE ACCESO: ').bold().fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('0000000000000000000000000000000000000000000000').fontSize(9).width('40%').end]).end);
    pdf.add(new Columns([new Txt('JUNTA ADMINISTRADORA DE AGUA POTABLE Y SANEAMIENTO DE SAN JUAN DE AMAGUAÑA\n\n').alignment('center').bold().fontSize(11).width('60%').end]).end);
    pdf.add(new Columns([new Txt('Dirección: San Juan de la Cruz Ricardo Alvarez S3-51 Y Nela Martínez').alignment('center').fontSize(9).width('60%').end]).end);
    pdf.add(new Columns([new Txt('Tel: Oficina: 0992155576 operador: 0962871530 / 3821791').alignment('center').fontSize(9).width('60%').end]).end);
    pdf.add(new Columns([new Txt('\nQUITO - AMAGUAÑA - ECUADOR ').alignment('center').fontSize(9).width('60%').end]).end);
    pdf.add(new Txt('\n\n').end);
    pdf.add(new Table([
      [new Columns(['\nRazon Social: ' + prefactura.nombres_cli + ' ' + prefactura.apellidos_cli + "\n\n" + 'email: ' + prefactura.email_cli + '\n\n', '\nCI / RUC: ' + prefactura.ciruc_cli + "\n\n" + "Telefono: " + prefactura.telefono_cli + '\n\n', '\nDirección: ' + prefactura.direccion_cli]).end]
    ]).bold().alignment('center').fontSize(10).widths(['100%']).end);
    pdf.add(new Txt('\n\n').end);
    pdf.add(new Table([
      ['Cantidad', 'Descripción', 'Precio U', 'Consumo', 'Descuentos', 'Subtotal']
    ]).bold().alignment('center').fontSize(9).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);
    for (let i = 0; i < items.length; i++) {
      pdf.add(new Table([
        [1, items[i].categoria_proser + ", " + items[i].descripcion_proser, items[i].precio_proser, 0, 0, (parseFloat(items[i].precio_proser))]
      ]).alignment('center').fontSize(9).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);
    }

    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
      subtotal += parseFloat(items[i].precio_proser);
    }
    pdf.add(new Table([
      [new Columns(['', '\n\nNúmero Medidor' + "\n" +
        "Lectura Pasada" + "\n" +
        "Lectura Actual" + "\n" +
        "Consumo m3" + "\n" +
        "Meses Deuda" + "\n" +
        "Total Factura",
        '\n\n171231234' + '\n' +
        "0" + '\n' +
        "0" + '\n' +
        "0" + '\n' +
        "0" + '\n' +
        (subtotal + this.fondoSocial), '']).alignment('left').end,
      new Txt('\nSubtotal 12%' + "\n\n" +
        'Subtotal 0%' + "\n\n" +
        'IVA 12%' + "\n\n" +
        'Fondo Social' + "\n\n" +
        'Total Factura').bold().end, '\n0.00' + "\n\n" +
        subtotal + "\n\n" +
        '0.00' + "\n\n" +
        this.fondoSocial + "\n\n" +
      (subtotal + this.fondoSocial)]
    ]).alignment('center').fontSize(9).widths(['79%', '11%', '10%']).end);

    // Fin de la factura
    pdf.create().open();
  };

  async generarFacturaConvenio(prefactura: any) {

    console.log(prefactura);

    let items = JSON.parse(prefactura.servicios_prefac);

    let totalItems = [];
    for (let i = 0; i < items.length; i++) {
      totalItems[i] = items[i];
    }
    const pdf = new PdfMakeWrapper();

    pdf.info({
      title: 'FACTURA_ELECTRONICA'
    });
    pdf.add(new Txt('\n').end);
    pdf.add((await new Img('../../../assets/img/gota2.png').relativePosition(90, 130).height('130').width('130').build()));
    pdf.add(new Columns(['', new Txt('FACTURA 000000000000000\n\n').fontSize(16).color('red').width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('NUMERO DE AUTORIZACION').bold().fontSize(10).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('00000000000000000000000000000\n\n').bold().fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('FECHA Y HORA DE AUTORIZACION').bold().fontSize(10).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt(this.fechaAutorizacion + '\n').bold().fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('AMBIENTE: ' + 'Produccion').fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('EMISION: ' + 'Normal\n\n').fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('CLAVE DE ACCESO: ').bold().fontSize(9).width('40%').end]).end);
    pdf.add(new Columns(['', new Txt('0000000000000000000000000000000000000000000000').fontSize(9).width('40%').end]).end);
    pdf.add(new Columns([new Txt('JUNTA ADMINISTRADORA DE AGUA POTABLE Y SANEAMIENTO DE SAN JUAN DE AMAGUAÑA\n\n').alignment('center').bold().fontSize(11).width('60%').end]).end);
    pdf.add(new Columns([new Txt('Dirección: San Juan de la Cruz Ricardo Alvarez S3-51 Y Nela Martínez').alignment('center').fontSize(9).width('60%').end]).end);
    pdf.add(new Columns([new Txt('Tel: Oficina: 0992155576 operador: 0962871530 / 3821791').alignment('center').fontSize(9).width('60%').end]).end);
    pdf.add(new Columns([new Txt('\nQUITO - AMAGUAÑA - ECUADOR ').alignment('center').fontSize(9).width('60%').end]).end);
    pdf.add(new Txt('\n\n').end);
    pdf.add(new Table([
      [new Columns(['\nRazon Social: ' + prefactura.nombres_cli + ' ' + prefactura.apellidos_cli + "\n\n" + 'email: ' + prefactura.email_cli + '\n\n', '\nCI / RUC: ' + prefactura.ciruc_cli + "\n\n" + "Telefono: " + prefactura.telefono_cli + '\n\n', '\nDirección: ' + prefactura.direccion_cli]).end]
    ]).bold().alignment('center').fontSize(10).widths(['100%']).end);
    pdf.add(new Txt('\n\n').end);
    pdf.add(new Table([
      ['Cantidad', 'Descripción', 'Precio U', 'Consumo', 'Descuentos', 'Subtotal']
    ]).bold().alignment('center').fontSize(9).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);
    // for (let i = 0; i < items.length; i++) {
    //   pdf.add(new Table([
    //     [1, items[i].categoria_proser + ", " + items[i].descripcion_proser, items[i].precio_proser, 0, 0, (parseFloat(items[i].valorpagos_con))]
    //   ]).alignment('center').fontSize(9).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);
    // }
    pdf.add(new Table([
      [1, "Convenio De Pago ", prefactura.valorpagos_con, 0, 0, (parseFloat(prefactura.valorpagos_con))]
    ]).alignment('center').fontSize(9).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);

    let subtotal = 0;
    
    pdf.add(new Table([
      [new Columns(['', '\nNúmero Medidor' + "\n" +
        "Lectura Pasada" + "\n" +
        "Lectura Actual" + "\n" +
        "Consumo m3" + "\n" +
        "Meses Deuda" + "\n" +
        "Convenio de Pago: " + "\n" +
        "Pagos Pendientes: " + "\n" +
        "Total Factura",
        '\n171231234' + '\n' +
        "0" + '\n' +
        "0" + '\n' +
        "0" + '\n' +
        "0" + '\n' +
        "SI" + '\n' +
        prefactura.cuotasporpagar_con + '\n' +
        (subtotal + this.fondoSocial), '']).alignment('left').end,
      new Txt('\nSubtotal 12%' + "\n\n" +
        'Subtotal 0%' + "\n\n" +
        'IVA 12%' + "\n\n" +
        'Fondo Social' + "\n\n" +
        'Total Factura').bold().end, '\n0.00' + "\n\n" +
        subtotal + "\n\n" +
        '0.00' + "\n\n" +
        this.fondoSocial + "\n\n" +
      (parseFloat(prefactura.valorpagos_con) + this.fondoSocial)]
    ]).alignment('center').fontSize(9).widths(['79%', '11%', '10%']).end);

    // Fin de la factura
    pdf.create().open();

  }

  convenio(prefacturaConvenio: any) {
    
    const dialogRef = this.dialog.open(DialogconvenioComponent, {
      width: '450px',
      data: prefacturaConvenio
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

      }
    });
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
