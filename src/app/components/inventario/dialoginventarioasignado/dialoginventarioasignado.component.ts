import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioAsigI } from 'src/app/models/inventario/inventarioAsig.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { InventarioService } from 'src/app/services/inventario.service';
import { ProdservService } from 'src/app/services/prodserv.service';
import { DialogdevolucionComponent } from '../dialogdevolucion/dialogdevolucion.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BdemapaService } from 'src/app/services/bdemapa.service';

@Component({
  selector: 'app-dialoginventarioasignado',
  templateUrl: './dialoginventarioasignado.component.html',
  styleUrls: ['./dialoginventarioasignado.component.css']
})
export class DialoginventarioasignadoComponent implements OnInit {

  displayedColumns: string[] = ['asignado', 'descripcion', 'stockAsignado', 'stockEntregado', 'acciones'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables para cargar el inventario asignado

  listaInventarioAsignado: InventarioAsigI[];
  id_proser: number = 0;
  proSerVerificar: ProsernuevoI;
  prodSerAct: ProsernuevoI;

  stockRecibido: number;

  // variable para el token
  token: string = '';

  constructor(private _inventario: InventarioService,
    public dialog: MatDialog,
    private _proser: ProdservService,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private _excel: BdemapaService) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');

    this.loadInventarioAsignado();
    this.proSerVerificar = {
      id_proser: 0,
      codigo_proser: '',
      categoria_proser: '0',
      nombre_proser: '',
      descripcion_proser: '',
      precio_proser: 0,
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      preciosugerido_proser: '',
      lote_proser: '',
      IVA_proser: '0',
      token: ''

    };
    this.prodSerAct = {
      
      id_proser: 0,
      codigo_proser: '',
      categoria_proser: '0',
      nombre_proser: '',
      descripcion_proser: '',
      precio_proser: 0,
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      preciosugerido_proser: '',
      lote_proser: '',
      IVA_proser: '0',
      token: ''
    }
  }

  loadInventarioAsignado() {

    this._inventario.getAll(this.token).subscribe(res => {


      if(res.data.length){
        this.listaInventarioAsignado = res.data;

        this.dataSource = new MatTableDataSource(this.listaInventarioAsignado);
        this.dataSource.paginator = this.paginator;
      }else{
        this.toastError("No hemos podido encontrar registros asignados");
      }
      

    });
  }

  regresarStock(prodser: any) {

    this.id_proser = prodser.id_proser;
    let stockAsignado = parseInt(prodser.stockasignado_inv);
    let stockEntregado = parseInt(prodser.stockentregado_inv);

    if (stockEntregado == stockAsignado) {
      this.toastWarning("El usuario ya entrego en su totalidad el inventario asignado.");
    }else if (stockEntregado < stockAsignado) {

      this._proser.getOne(this.id_proser, this.token).subscribe(res => {
        
        this.proSerVerificar = res.data;

        const dialogRef = this.dialog.open(DialogdevolucionComponent, {
          width: '450px',
          data: prodser
        });

        dialogRef.afterClosed().subscribe(res => {
          if (res != undefined) {

            this.loadInventarioAsignado();

            let stockEntregado = res;

            if (parseInt(this.proSerVerificar[0].cantidadfinal_proser) > 0) {

              let aux = stockEntregado + parseInt(this.proSerVerificar[0].cantidadfinal_proser);

              if (aux > this.proSerVerificar.cantidad_proser) {

                Swal.fire({
                  icon: 'warning',
                  confirmButtonColor: '#1d1d24',
                  text: 'Ocurrio un error al actualizar el inventario!!!'
                });
              } else {

                this.prodSerAct.id_proser = this.proSerVerificar[0].id_proser;
                this.prodSerAct.codigo_proser = this.proSerVerificar[0].codigo_proser;
                this.prodSerAct.categoria_proser = this.proSerVerificar[0].categoria_proser;
                this.prodSerAct.nombre_proser = this.proSerVerificar[0].nombre_proser;
                this.prodSerAct.descripcion_proser = this.proSerVerificar[0].descripcion_proser;
                this.prodSerAct.precio_proser = this.proSerVerificar[0].precio_proser;
                this.prodSerAct.cantidad_proser = this.proSerVerificar[0].cantidad_proser;
                // this.prodSerAct.cantidadfinal_proser = parseInt(stockEntregado) + parseInt(this.proSerVerificar[0].cantidadfinal_proser);
                this.prodSerAct.token = this.token;

                this._proser.updateProdSer(this.prodSerAct).subscribe(res => {
                  if (res.data) {
                    this.toastSuccess("El inventario se ha actualizado exitosamente");
                  }else{
                    this.toastError("Tenemos problemas para actualizar el inventario por favor intentalo más tarde");
                  }
                }
                );
              }
          }
        }
        });

    });

    }
  }

  excel(){
    this._excel.exportToExcel(this.listaInventarioAsignado,'Inventario_asignado');
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 5000,
    });
  }

}
