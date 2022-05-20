import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComprasI } from 'src/app/models/compras.interface';
import Swal from 'sweetalert2';
import { ProdservService } from 'src/app/services/prodserv.service';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { ToastrService } from 'ngx-toastr';
import { DialogitemscompraComponent } from '../dialogitemscompra/dialogitemscompra.component';
import { DialogitemsnotaventaComponent } from '../dialogitemsnotaventa/dialogitemsnotaventa.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogproveedorescomprasComponent } from '../../inventario/dialogproveedorescompras/dialogproveedorescompras.component';
import { ProveedorI } from 'src/app/models/proveedor/proveedor.interface';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-dialogcompras',
  templateUrl: './dialogcompras.component.html',
  styleUrls: ['./dialogcompras.component.css']
})
export class DialogcomprasComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'cantidad', 'precio', 'descuento', 'total', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  compra: ComprasI;
  listaItems: any[];
  lastIndex: number = 0;

  nuevoProductoServicio: ProsernuevoI;
  subtotal12: string = '0';
  subtotal0: string = '0';
  iva: string = '0';
  ice: number = 0;
  propina: number = 0;
  totalFactura: string = '0';
  empresasSelect: any[] = ['LAMME', 'VT', 'MAXIMUM', 'FUNDACION']; 

  selectEmpresa: any = '0';

  // variables para mostrar botones
  showbtnFactura: boolean = false;
  showbtnNota: boolean = false;
  showComprobante: boolean = true;
  showBorrarItems: boolean = false;

  // variable para el proveedor
  proveedor: ProveedorI;

  // variable para el token
token: string = '';

  // lista para cargar empresas
  listaempresas: any[];

  constructor(public dialog: MatDialog,
    private _proser: ProdservService,
    private _compras: ComprasService,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private _empresa: EmpresaService) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');

    this.loadBusiness();
    this.nuevoProductoServicio = {
      id_proser: 0,
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '',
      descripcion_proser: '',
      precio_proser: 0,
      cantidad_proser: 1,
      cantidadfinal_proser: 0,
      preciosugerido_proser: '',
      lote_proser: '',
      IVA_proser: '0',
    }

    this.compra = {
      id_prove: '',
      tipocomprobante_com: '0',
      emsion_com: '',
      registro_com: '',
      serie_com: '',
      secuencia_com: '',
      autorizacionSRI_com: '',
      vencimiento_com: '',
      comceptos_com: '',
      formapago_com: '0',
      iva_com: '1',
      ICE_com: '',
      devolucionIVA: '',
      costogasto_com: '0'
    }

    this.proveedor = {
      id_prove: '',
      razonsocial_prove: '',
      ciruc_prove: '',
      direccion_prove: '',
      email_prove: '',
      telefono_prove: '',
      descripcion_prove: ''
    }

    this.showComprobante = false;
    this.showBorrarItems = false;
    this.listaItems = [];
    this.listaempresas = [];


    // console.log(this.selectEmpresa);
    

  }

  grabarCompra() {

    if (this.compra.tipocomprobante_com == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debes seleccionar el tipo de comprobante'
      });
    } else if (this.proveedor.razonsocial_prove == '') {
      // || this.compra.emsion_com == '' || this.compra.formapago_com == '0' || this.compra.costogasto_com == '0'
      // || this.compra.serie_com == '' || this.compra.secuencia_com == '' || this.compra.autorizacionSRI_com == '' 
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debes cargar la información del proveedor para continuar'
      });
    } else if (this.compra.emsion_com == '') {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debes seleccionar la fecha de emsion.'
      });

    } else if (!this.listaItems.length) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debes ingresar por lo menos un concepto de compra'
      });
    } else {

      if (this.compra.costogasto_com == 'GASTO') {

        // AQUI CONVERTIR JSON A CADENA

        let objeto = JSON.stringify(this.listaItems);

        this.compra.comceptos_com = objeto;
        this.compra.token = this.token;
        this.compra.id_prove = this.proveedor.id_prove;

        console.log(this.compra);

        this._compras.createCompra(this.compra).subscribe(res => {
          if (res.data) {
            this.toastSuccess("Compra Registrada Exitosamente!!!");
            this.borrarCompra();
            this.borrarItems();

            this.listaItems = [];
            this.dataSource = new MatTableDataSource(this.listaItems);
          }
        });

      } else if (this.compra.costogasto_com == 'COSTO') {

        let objeto = JSON.stringify(this.listaItems);

        this.compra.comceptos_com = objeto;
        this.compra.token = this.token;
        this.compra.id_prove = this.proveedor.id_prove;

        this._compras.createCompra(this.compra).subscribe(res => {

          if (res.data) {

            for (let i = 0; i < this.listaItems.length; i++) {

              if (this.listaItems[i].categoria == 'SERVICIO') {

              } else {
                this.nuevoProductoServicio.descripcion_proser = this.listaItems[i].descripcion;
                this.nuevoProductoServicio.cantidad_proser = this.listaItems[i].cantidad;
                this.nuevoProductoServicio.cantidadfinal_proser = this.listaItems[i].cantidad;
                this.nuevoProductoServicio.precio_proser = this.listaItems[i].precio;
                this.nuevoProductoServicio.categoria_proser = this.listaItems[i].categoria;
                this.nuevoProductoServicio.nombre_proser = this.listaItems[i].descripcion;
                this.nuevoProductoServicio.codigo_proser = this.listaItems[i].codigobarras;
                this.nuevoProductoServicio.preciosugerido_proser = this.listaItems[i].precio;
                this.nuevoProductoServicio.lote_proser = this.listaItems[i].lote;
                this.nuevoProductoServicio.IVA_proser = this.listaItems[i].iva;
                this.nuevoProductoServicio.token = this.token;
                this.nuevoProductoServicio.id_prove = this.proveedor.id_prove;

                // console.log(this.nuevoProductoServicio);

                this._proser.createProdSer(this.nuevoProductoServicio).subscribe(res => {
                });
              }
            }
            this.borrarCompra();
            this.borrarItems();
            this.toastSuccess("Compra Registrada Exitosamente!!!");
            this.listaItems = [];
            this.dataSource = new MatTableDataSource(this.listaItems);

          }

        });
      }
    }

  }

  comprobante() {
    if (this.compra.tipocomprobante_com == '0') {
      this.showbtnFactura = false;
      this.showbtnNota = false;
    } else if (this.compra.tipocomprobante_com == 'FACTURA') {
      this.showbtnFactura = true;
      this.showbtnNota = false;
      this.showBorrarItems = true;
      this.showComprobante = true;
    } else if (this.compra.tipocomprobante_com == 'NOTA DE VENTA') {
      this.showbtnNota = true;
      this.showbtnFactura = false;
      this.showBorrarItems = true;
      this.showComprobante = true;
    }
  }



  items() {

    const dialogRef = this.dialog.open(DialogitemscompraComponent, {
      width: '550px',
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      console.log(res);

      if (res != undefined) {

        if (!this.listaItems.length) {
          this.listaItems[0] = res;
        } else {
          this.lastIndex = this.listaItems.length;
          this.listaItems[this.lastIndex] = res;
        }

        this.subtotal12 = '0';
        this.subtotal0 = '0';
        this.iva = '0';
        this.totalFactura = '0';

        for (let i = 0; i < this.listaItems.length; i++) {
          this.subtotal12 = (parseFloat(this.subtotal12) + parseFloat(this.listaItems[i].subtotal12)).toFixed(2);
          this.subtotal0 = (parseFloat(this.subtotal0) + parseFloat(this.listaItems[i].subtotal0)).toFixed(2);
          this.iva = (parseFloat(this.iva) + parseFloat(this.listaItems[i].iva12)).toFixed(2);
        }

        this.totalFactura = (parseFloat(this.subtotal12) + parseFloat(this.subtotal0) + parseFloat(this.iva) + this.ice + this.propina).toFixed(2);
        this.dataSource = new MatTableDataSource(this.listaItems);
      }
    });
  }

  itemsNotaventa() {

    const dialogRef = this.dialog.open(DialogitemsnotaventaComponent, {
      width: '450px',
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        if (!this.listaItems.length) {
          this.listaItems[0] = res;
        } else {
          this.lastIndex = this.listaItems.length;
          this.listaItems[this.lastIndex] = res;
        }

        this.subtotal12 = '0';
        this.subtotal0 = '0';
        this.iva = '0';
        this.totalFactura = '0';

        for (let i = 0; i < this.listaItems.length; i++) {
          this.totalFactura = (parseFloat(this.totalFactura) + parseFloat(this.listaItems[i].notaVenta)).toFixed(2);
        }

        this.dataSource = new MatTableDataSource(this.listaItems);

      }
    });

  }

  deleteItem(item: any) {
    console.log(item);
    for (let i = 0; i < this.listaItems.length; i++) {

      if (this.listaItems[i].descripcion == item.descripcion && this.listaItems[i].cantidad == item.cantidad) {
        this.listaItems.splice(i, 1);
      }

    }

    if (this.compra.tipocomprobante_com == 'FACTURA') {

      this.subtotal12 = '0';
      this.subtotal0 = '0';
      this.iva = '0';
      this.totalFactura = '0';

      for (let i = 0; i < this.listaItems.length; i++) {
        this.subtotal12 = (parseFloat(this.subtotal12) + parseFloat(this.listaItems[i].subtotal12)).toFixed(2);
        this.subtotal0 = (parseFloat(this.subtotal0) + parseFloat(this.listaItems[i].subtotal0)).toFixed(2);
        this.iva = (parseFloat(this.iva) + parseFloat(this.listaItems[i].iva12)).toFixed(2);
      }

      this.totalFactura = (parseFloat(this.subtotal12) + parseFloat(this.subtotal0) + parseFloat(this.iva) + this.ice + this.propina).toFixed(2);
      this.dataSource = new MatTableDataSource(this.listaItems);

    } else if (this.compra.tipocomprobante_com == 'NOTA DE VENTA') {
      this.subtotal12 = '0';
      this.subtotal0 = '0';
      this.iva = '0';
      this.totalFactura = '0';

      for (let i = 0; i < this.listaItems.length; i++) {
        this.totalFactura = (parseFloat(this.totalFactura) + parseFloat(this.listaItems[i].notaVenta)).toFixed(2);
      }

      this.dataSource = new MatTableDataSource(this.listaItems);
    }
  }

  cargarProveedor() {

    const dialogRef = this.dialog.open(DialogproveedorescomprasComponent, {
      width: '70%'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.proveedor = res;
      }

    })
  }

  // seccion para generar comprobantes de retencion
  generarRetencion() {

  }

  // seccion para cargar las empresas
  loadBusiness(){
    this._empresa.getAll(this.token).subscribe(res=>{
      this.listaempresas = res.data;

      console.log(this.listaempresas);
      
    });
  }

  borrarItems() {
    this.listaItems = [];
    this.subtotal12 = '0';
    this.subtotal0 = '0';
    this.iva = '0';
    this.totalFactura = '0';
    this.dataSource = new MatTableDataSource(this.listaItems);
  }

  cancelarItems() {
    this.listaItems = [];
    this.compra.tipocomprobante_com = '0';
    this.showBorrarItems = false;
    this.showbtnFactura = false;
    this.showbtnNota = false;
    this.subtotal12 = '0';
    this.subtotal0 = '0';
    this.iva = '0';
    this.totalFactura = '0';
    this.showComprobante = false;
    this.borrarCompra();
    this.dataSource = new MatTableDataSource(this.listaItems);

  }

  borrarCompra() {

    this.compra = {
      id_prove: '',
      tipocomprobante_com: '0',
      emsion_com: '',
      registro_com: '',
      serie_com: '',
      secuencia_com: '',
      autorizacionSRI_com: '',
      vencimiento_com: '',
      comceptos_com: '',
      formapago_com: '0',
      iva_com: '1',
      ICE_com: '',
      devolucionIVA: '',
      costogasto_com: '0'
    }

    this.showComprobante = false;

  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  cambioValorEmpresa(valor: string){
    this.selectEmpresa = valor;
  }

}
