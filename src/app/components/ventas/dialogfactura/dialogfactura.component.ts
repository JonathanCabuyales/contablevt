import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { EmpleadoVentaI } from 'src/app/models/empleados/empleadoventa.interface';
import { EmpresaI } from 'src/app/models/empresa/empresa.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdservService } from 'src/app/services/prodserv.service';
import { DialogallclientesComponent } from '../../clientes/dialogallclientes/dialogallclientes.component';
import { DialogprodservComponent } from '../../productosservicios/dialogprodserv/dialogprodserv.component';
import { DialogempleadosventasComponent } from '../dialogempleadosventas/dialogempleadosventas.component';
import { LoginService } from 'src/app/services/login.service';
import { FacturaelectronicaService } from 'src/app/services/facturaelectronica/facturaelectronica.service';
import { FacturaelectronicaI } from 'src/app/models/facturaelectronica/facturaelectronica.interface';
import { $ } from 'protractor';
import { Observable } from 'rxjs';


 // variable para llamar a la libreria
 declare const obtenerComprobanteFirmado_sri: any;


@Component({
  selector: 'app-dialogfactura',
  templateUrl: './dialogfactura.component.html',
  styleUrls: ['./dialogfactura.component.css'],
})

export class DialogfacturaComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'cantidad',
    'precio',
    'eliminar',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaProSer: ProsernuevoI[];
  prodser: ProsernuevoI[];

 

  // variables para el cliente
  cliente: ClienteI;
  showCliente: boolean = false;

  // variable para cargar la informacion de la empresa
  empresa: EmpresaI;

  // variables para los empleados
  showVendedor: boolean = false;
  empleado: EmpleadoVentaI;

  // varibales para los items de la factura
  lastIndex: number = 0;
  subtotal12: string = '0.00';
  subtotal0: string = '0.00';
  iva: string = '0.00';
  ice: number = 0;
  propina: number = 0;
  totalFactura: string = '0.00';

  // variable para el token
  token: string = '';

  // variables para la firma
  p12password: string = '';
  file: any;

  // variable para capturar el producto o servicio
  item: ProsernuevoI;
  cantidaditem: string = '0';
  totalitem: string = '0';
  codigobarras: string = '';

  fechaactual: string = '';
  tipocomprobante: string = '0';

  facturaelec: FacturaelectronicaI;
  formapago: string = '0';

  secuencial: string = '0';


  constructor(
    public dialog: MatDialog,
    private _prodser: ProdservService,
    private _empresa: EmpresaService,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private _login: LoginService,
    private _facturaelec: FacturaelectronicaService
  ) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');

    this.empleado = {
      id_usuario: '',
      usuario: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      email: '',
    };

    this._facturaelec.getFacturaSecuencial(this.token).subscribe(res=>{
      
      if(res.data.length){
        this.secuencial = (parseInt(res.data[0].secuencial) + 1).toFixed(0);
      }else{
        this.secuencial = '1';
      }
    });

    this.loadEmpresa();
    this.loadUsuario();

    this.formapago = '0';

    this.cliente = {
      id_cli: 0,
      nombres_cli: '',
      apellidos_cli: '',
      ciruc_cli: '',
      direccion_cli: '',
      telefono_cli: '',
      email_cli: '',
      created_at: new Date(),
    };

    this.item = {
      id_proser: 0,
      id_prove: '',
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '0',
      descripcion_proser: '0',
      precio_proser: 0,
      preciosugerido_proser: '',
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      lote_proser: '',
      IVA_proser: '',
    };

    this.empresa = {
      nombre_emp: '',
      ruc_emp: '',
      direccion_emp: '',
      telefono_emp: '',
      email_emp: '',
      paginaweb_emp: '',
    };

    this.facturaelec = {
      id_usuario: this.empleado.id_usuario,
      nombre_empresa: '',
      ciruc_empresa: '',
      direccion_empresa: '',
      nombre_cliente: '',
      direccion_cliente: '',
      tipoidentificacion: '',
      ciruc_cliente: '',
      email_cliente: '',
      subtotal0: '',
      subtotal12: '',
      ivatotal: '',
      items: '',
      token: '',
      secuencial: ''
    };

    this.tipocomprobante = '0';

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    this.fechaactual = '';

    if (mes < 10 && dia < 10) {
      this.fechaactual = anio + '-0' + mes + '-0' + dia;
    } else if (mes < 10) {
      this.fechaactual = anio + '-0' + mes + '-' + dia;
    } else if (dia < 10) {
      this.fechaactual = anio + '-' + mes + '-0' + dia;
    } else {
      this.fechaactual = anio + '-' + mes + '-' + dia;
    }

    this.listaProSer = [];
  }

  loadEmpresa() {
    this._empresa.getAll(this.token).subscribe((res) => {
      if (res.data.length) {
        this.empresa = res.data[0];
      } else {
        this.toastWarning(
          'No hay información de la empresa, por favor verifique e intente nuevamente más tarde'
        );
      }
    });
  }

  // funcion para obetner la informacion del usuario activo
  loadUsuario() {
    this._login.getuserdata(this.token).subscribe((res) => {
      this.empleado.id_usuario = res.data.id;
      this.empleado.usuario = res.data.usuario;
      this.empleado.email = res.data.email;
    });
  }

  loadProSer() {
    const dialogRef = this.dialog.open(DialogprodservComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((res) => {

      if (res != undefined) {
        this.codigobarras = res.codigo_proser;
        this.item = res;
      }

    });
  }

  cargarClientes() {
    const dialogRef = this.dialog.open(DialogallclientesComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.showCliente = true;
        this.cliente = res;
      } else {
        this.showCliente = false;
      }
    });
  }

  // funcion para cargar los empleados de ventas
  loadEmpleadosVentas() {
    const dialogRef = this.dialog.open(DialogempleadosventasComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.showVendedor = true;
        this.empleado = res;
      }
    });
  }

  cargarItem() {
    console.log(this.codigobarras);

    if (this.codigobarras == '') {
      this.toastError('Debes ingresar el codigo para continuar');
    } else {
      this._prodser.getitemcodigo(this.codigobarras, this.token).subscribe((res) => {
          console.log(res);
          if (res.data.length) {
            this.item = res.data[0];
          } else {
            this.toastWarning('No tenemos registrado este codigo por favor verifica e intenalo nuevamente');
          }
        });
    }
  }

  // funcion para calcular el total de cada item ingresado de manera automatica
  calcularItem() {
    if (this.item.codigo_proser == '') {
      this.toastError('No has cargado el item');
      this.totalitem = '0';
    } else if (this.cantidaditem <= '0' || this.cantidaditem == null) {
      this.toastError('La cantidad no puede ser menor o igual a 0');
      this.totalitem = '0';
    } else if (this.item.cantidadfinal_proser < parseInt(this.cantidaditem)) {
      this.toastWarning('No tenemoms stock suficiente');
      this.totalitem = '0';
    } else {
      this.totalitem = (
        this.item.precio_proser * parseInt(this.cantidaditem)
      ).toFixed(2);
    }
  }

  sumarItem() {

    if (this.codigobarras == '') {
      this.toastError('No has cargado ningun item');
    } else if (this.cantidaditem <= '0' || this.cantidaditem == null) {
      this.toastError('No has ingresado la cantidad del item');
    } else if (this.item.cantidadfinal_proser < parseInt(this.cantidaditem)) {
      this.toastWarning('No tenemoms stock suficiente');
    } else {
      let additem = false;

      for (let i = 0; i < this.listaProSer.length; i++) {
        console.log(this.listaProSer);

        if (this.listaProSer[i].id_proser == this.item.id_proser) {
          additem = true;
          break;
        } else {
          additem = false;
        }
      }

      if (additem) {
        this.toastWarning(
          'Ya se encuentra registrado este item, borralo para que lo puedas añadir nuevamente'
        );
      } else {
        let stockrestante = this.item.cantidadfinal_proser - parseInt(this.cantidaditem);

        // console.log(this.item);
        
        if (this.item.IVA_proser == '12') {
          this.item.iva12 = (parseFloat(this.totalitem) * 0.12).toFixed(2);
          this.item.subtotal12 = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.subtotal0 = '0';
          this.item.total = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.iva0 = '0';
          this.item.cantidadvendida = this.cantidaditem;
          this.item.cantidadfinal_proser = stockrestante;
        } else if (this.item.IVA_proser == '0') {
          this.item.subtotal0 = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.total = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.iva12 = '0';
          this.item.iva0 = (parseFloat(this.cantidaditem) * this.item.precio_proser).toFixed(2);
          this.item.subtotal12 = '0';
          this.item.cantidadvendida = this.cantidaditem;
          this.item.cantidadfinal_proser = stockrestante;
        }

        if (!this.listaProSer.length) {
          this.listaProSer[0] = this.item;
        } else {
          this.lastIndex = this.listaProSer.length;
          this.listaProSer[this.lastIndex] = this.item;
        }

        this.subtotal12 = '0';
        this.subtotal0 = '0';
        this.iva = '0';
        this.totalFactura = '0';

        for (let i = 0; i < this.listaProSer.length; i++) {
          this.subtotal12 = (parseFloat(this.subtotal12) + parseFloat(this.listaProSer[i].subtotal12)).toFixed(2);
          this.subtotal0 = (parseFloat(this.subtotal0) + parseFloat(this.listaProSer[i].subtotal0)).toFixed(2);
          this.iva = (parseFloat(this.iva) + parseFloat(this.listaProSer[i].iva12)).toFixed(2);
        }

        this.totalFactura = (parseFloat(this.subtotal12) + parseFloat(this.subtotal0) + parseFloat(this.iva)).toFixed(2);

        this.borraritem();

        // console.log(this.listaProSer);
        
        this.dataSource = new MatTableDataSource(this.listaProSer);
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  // funcion para grabar la factura
  grabarFactura() {

    // datos de la empresa 
    this.facturaelec.nombre_empresa = this.empresa.nombre_emp;
    this.facturaelec.ciruc_empresa = this.empresa.ruc_emp;
    this.facturaelec.direccion_empresa = this.empresa.direccion_emp;

    // datos del cliente
    this.facturaelec.nombre_cliente = this.cliente.nombres_cli + ' ' + this.cliente.apellidos_cli;
    this.facturaelec.ciruc_cliente = this.cliente.ciruc_cli;
    this.facturaelec.direccion_cliente = this.cliente.direccion_cli;
    this.facturaelec.email_cliente = this.cliente.email_cli;

    // añado el total de la fatura al json
    let totalsinimp = '0';
    for (let i = 0; i < this.listaProSer.length; i++) {
      delete this.listaProSer[i].lote_proser;
      totalsinimp = (parseFloat(totalsinimp) + parseFloat(this.listaProSer[i].subtotal12) + parseFloat(this.listaProSer[i].subtotal0)).toFixed(2);
    }

     // items de la factura (servicios o productos) 
    // primero convierto en json a la lista y luego lo asigno
    this.facturaelec.items = JSON.stringify(this.listaProSer);

    this.facturaelec.totalsinimpu = totalsinimp;
    this.facturaelec.totalFactura = this.totalFactura;

    // token permiso para el backend
    this.facturaelec.token = this.token;

    if (this.tipocomprobante == '0') {
      this.toastError("Debes seleccionar el tipo de comprobante para continuar");
    } else if (this.cliente.ciruc_cli == '') {
      this.toastError("No has especificado al cliente");
    } else if (!this.listaProSer.length) {
      this.toastError("Verifica los detalles de la factura antes de continuar");
    } else if (this.formapago == '0') {
      this.toastError("Debes seleccionar la forma de pago");
    } else {

        //  RUC 04 Obligatorio
        //  CEDULA 05 Obligatorio
        //  PASAPORTE 06 Obligatorio
        //  VENTA A CONSUMIDOR FINAL* 07 Obligatorio
        //  IDENTIFICACION DELEXTERIOR* 08 Obligatorio
      if (this.cliente.ciruc_cli.length == 1*3) {

        if (this.cliente.ciruc_cli == '9999999999999') {
          this.facturaelec.tipoidentificacion = '07';
        } else {
          this.facturaelec.tipoidentificacion = '04';
        }
  
      } else if (this.cliente.ciruc_cli.length == 10) {
        this.facturaelec.tipoidentificacion = '05';
      }

        // SIN UTILIZACIÓN DEL SISTEMA FINANCIERO 01
        // COMPENSACIÓN DE DEUDAS 15
        // TARJETA DE DÉBITO 16
        // DINERO ELECTRÓNICO 17
        // TARJETA PREPAGO 18
        // TARJETA DE CRÉDITO 19
        // OTROS CON UTILIZACIÓN DEL SISTEMA FINANCIERO 20
        // ENDOSO DE TÍTULOS 21

      this.facturaelec.formapago = this.formapago;
      this.facturaelec.subtotal0 = this.subtotal0;
      this.facturaelec.subtotal12 = this.subtotal12;
      this.facturaelec.ivatotal = this.iva;
      this.facturaelec.id_usuario = this.empleado.id_usuario;
      this.facturaelec.secuencial = this.secuencial;

      console.log(this.facturaelec);
      console.log(this.listaProSer);
    
      // for (let i = 0; i < this.listaProSer.length; i++) {

      //   this.listaProSer[i].token = this.token;
      //   this._prodser.updateProdSerFactura(this.listaProSer[i]).subscribe(res=>{

      //   });
        
      // }


      this._facturaelec.createXML(this.facturaelec).subscribe((res) => {

        this.facturaelec.numeroautorizacion = res.data.claveacceso;
        this.facturaelec.secuencial = res.data.secuencial;

        console.log(res);
        
        // console.log(this.facturaelec);
        // debes cambiar la ruta para entrar al p12
        var ruta_certificado = "http://localhost/libreria_2021/DAISY FERNANDA CAIZA TIPAN 290921160443.p12";
        var pwd_p12 = "Caizad2021";
        var ruta_respuesta = "http://localhost/VT/APIVTPROYECTOS/libreria_2021/example.php";
        var ruta_factura = "http://localhost/VT/APIVTPROYECTOS/libreria_2021/xmlgenerados/"+res.data.claveacceso+".xml";
        var token = this.token;

        // esta seccion debes descomentar para la factura
        obtenerComprobanteFirmado_sri(ruta_certificado, pwd_p12, ruta_respuesta, ruta_factura,token);
        res.token = this.token;
        

        /*this._facturaelec.createFactura(this.facturaelec).subscribe(res=>{
          console.log(res);
          
        }); */

      });

    }

    //   console.log("registra");

    //   console.log(this.listaProSer);

    //   // primero se verifica que la factura esta aprobada y posterior se guarda en la base de datos
    //   // se envia la factura al backend
    //   // se debe sumar los valores del iva para crearlos
    //   //

    //   // for (let i = 0; i < this.listaProSer.length; i++) {
    //   //   // solo se grabaran items con categoria productos
    //   //   // servicio no se guardaran
    //   //   if(this.listaProSer[i].categoria_proser == 'PRODUCTO'){
    //   //     this._prodser.updateProdSer().subscribe(res=>{

    //   //     });
    //   //   }
    //   // }

    // }
  }

  // funciones para la seccion de items

  borrarItems(item: any) {
    for (let i = 0; i < this.listaProSer.length; i++) {
      if (this.listaProSer[i].id_proser == item.id_proser) {
        this.listaProSer.splice(i, 1);
      }
    }

    this.subtotal12 = '0';
    this.subtotal0 = '0';
    this.iva = '0';
    this.totalFactura = '0';

    if (this.listaProSer.length) {
      for (let i = 0; i < this.listaProSer.length; i++) {
        this.subtotal12 = (parseFloat(this.subtotal12) + parseFloat(this.listaProSer[i].subtotal12)).toFixed(2);
        this.subtotal0 = (parseFloat(this.subtotal0) + parseFloat(this.listaProSer[i].subtotal0)).toFixed(2);
        this.iva = (parseFloat(this.iva) + parseFloat(this.listaProSer[i].iva12)).toFixed(2);
      }

      this.totalFactura = (parseFloat(this.subtotal12) + parseFloat(this.subtotal0) + parseFloat(this.iva)).toFixed(2);
    }

    this.dataSource = new MatTableDataSource(this.listaProSer);
    this.dataSource.paginator = this.paginator;
  }

  borraritem() {
    this.cantidaditem = '0';
    this.codigobarras = '';
    this.totalitem = '0';
    this.item = {
      id_proser: 0,
      id_prove: '',
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '0',
      descripcion_proser: '0',
      precio_proser: 0,
      preciosugerido_proser: '',
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      lote_proser: '',
      IVA_proser: '',
    };
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje + '!!!', 'Advertencia', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4500,
    });
  }
}