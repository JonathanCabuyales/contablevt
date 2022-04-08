import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ProdservService } from 'src/app/services/prodserv.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MedidornuevoService } from 'src/app/services/medidornuevo.service';
import { PrefacturaI } from 'src/app/models/prefatura.interface';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import { DialogallclientesComponent } from '../dialogallclientes/dialogallclientes.component';


@Component({
  selector: 'app-dialognuevomedidor',
  templateUrl: './dialognuevomedidor.component.html',
  styleUrls: ['./dialognuevomedidor.component.css']
})
export class DialognuevomedidorComponent implements OnInit {

  clienteSeleccionado: ClienteI;

  pagos: string = "0";

  medidorNuevo: ProsernuevoI;

  numeroPagos: number = 0;

  valorCuota: number = 0;

  calculo: number = 0;

  btnRegistrar: boolean = false;

  numeroMedidor: string = '';

  id_instalacion: number = 0;

  id_cliente: number = 0;

  itemMedidor: ProsernuevoI;

  prefactura: PrefacturaI;

  fondoSocial: number = 0.50;

  // el valor del medidor es quemado en esta interfaz valor de 30$; cambiar el valor aqui.

  constructor(public dialog: MatDialog,
    private _prodser: ProdservService,
    private toastr: ToastrService,
    private _nuevoMedidor: MedidornuevoService,
    private _prefactura: PrefacturaService) { }

  ngOnInit(): void {

    // this.prodser();
    this.clienteSeleccionado = {
      id_cli: 0,
      nombres_cli: '',
      apellidos_cli: '',
      ciruc_cli: '',
      direccion_cli: '',
      telefono_cli: '',
      email_cli: '',
      created_at: new Date()
    };

    this.medidorNuevo = {
      id_proser: 0,
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '',
      descripcion_proser: '',
      precio_proser: 0,
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      preciosugerido_proser: '',
      IVA_proser: '0',
      lote_proser: '',
    };

    this.prefactura = {
      id_prefac: 0,
      id_cli: 0,
      id_usuario: 0,
      servicios_prefac: '',
      impuesto_prefac: 0,
      neto_prefac: 0,
      total_prefac: 0,
      metodo_prefac: '',
      convenio: 1,
      mesesatraso_prefac: 0,
      facturagenerada_prefac: 'N',
      create_at: new Date(),
      monto_con: 0,
      numerospagos_con: 0,
      valorpagos_con: 0,
      cuotasporpagar_con: 0,
      fechaultimopago_con: new Date(),
      fechacreacion_con: new Date()
    };
  }

  // prodser() {
  //   this._prodser.getOne(1).subscribe(res => {
  //     this.itemMedidor = res;
  //   });
  // }

  clientes() {
    const dialogRef = this.dialog.open(DialogallclientesComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.clienteSeleccionado = res;
        this.btnRegistrar = true;
      }
    });
  }

  capturar() {

    if (this.pagos == '' || this.pagos == '0') {

    } else if (this.pagos == '1') {
      this.valorCuota = 30;
      this.numeroPagos = 1;
    } else if (this.pagos == '3') {

      this.valorCuota = 30 / 3;
      this.numeroPagos = 3;

    } else if (this.pagos == '6') {

      this.valorCuota = 30 / 6;
      this.numeroPagos = 6;

    }
  }

  registrarMedidor() {
    if (this.numeroMedidor == "" || this.numeroMedidor == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de medidor'
      });
    } else if (this.pagos == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar el número de pagos'
      });
    } else {
      // AQUI CONVERTIR JSON A CADA Y VICEVERSA

      // console.log(JSON.stringify(this.productosServicios));

      // let objeto = JSON.stringify(this.productosServicios);
      // console.log(JSON.parse(objeto));

      this.id_cliente = +this.clienteSeleccionado.id_cli;
      delete this.prefactura.id_prefac;
      delete this.prefactura.create_at;
      this.prefactura.id_cli = this.id_cliente;
      this.prefactura.id_usuario = 1;
      this.prefactura.servicios_prefac = JSON.stringify(this.itemMedidor);
      this.prefactura.convenio = 1;
      this.prefactura.valorpagos_con = this.valorCuota + this.fondoSocial;
      this.prefactura.cuotasporpagar_con = this.numeroPagos;
      this.prefactura.numerospagos_con = this.numeroPagos;
      this.prefactura.facturagenerada_prefac = 'N';
      this.prefactura.monto_con = 30;
      this.prefactura.neto_prefac = 30;
      this.prefactura.total_prefac = 30 + this.fondoSocial;
      this.prefactura.metodo_prefac = "EFECTIVO";

      this._nuevoMedidor.createInstalacion(this.id_cliente).subscribe(res => {

        this.id_instalacion = res;

        this._nuevoMedidor.createMedidor(this.id_instalacion, this.numeroMedidor).subscribe(res => {
          
          if (res['resultado'] == 'OK') {
            this.toastSuccess("grabado");

            this._prefactura.createPrefactura(this.prefactura).subscribe(preres => {
              if (preres['resultado'] == 'OK') {
                this.toastSuccessPrefactura("La prefactura se ha generado exitosamente!!!.");
                this.clienteSeleccionado = {
                  id_cli: 0,
                  nombres_cli: '',
                  apellidos_cli: '',
                  ciruc_cli: '',
                  direccion_cli: '',
                  telefono_cli: '',
                  email_cli: '',
                  created_at: new Date()
                };

                this.numeroMedidor = '';
                this.pagos = '0';
                this.valorCuota = 0;
                this.numeroPagos = 0;
                this.btnRegistrar = false;

              }
            });
          }
        });

      });
    }
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastSuccessPrefactura(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
