import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { PrefacturaI } from 'src/app/models/prefatura.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ClienteserService } from 'src/app/services/clienteser.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialogconvenio',
  templateUrl: './dialogconvenio.component.html',
  styleUrls: ['./dialogconvenio.component.css']
})
export class DialogconvenioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogconvenioComponent>, @Inject(MAT_DIALOG_DATA)
  public prefacturaConvenio: any,
    private toastr: ToastrService) { }

  // para crear la fecha actual en php a mysql
  //   $date = date('Y-m-d H:i:s');
  // mysql_query("INSERT INTO `table` (`dateposted`) VALUES ('$date')");

  cliente: ClienteI;

  pagos: string = "0";

  medidorNuevo: ProsernuevoI;

  numeroPagos: number = 0;

  valorCuota: string = '0';

  ngOnInit(): void {
    if (this.prefacturaConvenio == null) {
      this.dialogRef.close();
    } else {
      console.log(this.prefacturaConvenio);

    }
  }

  capturar() {

    let calculo = 0;

    if (this.pagos == '' || this.pagos == '0') {
      this.valorCuota = '0';
      this.numeroPagos = 0;
    } else if (this.pagos == '1') {
      calculo = parseFloat(this.prefacturaConvenio.neto_prefac);
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 1;
    } else if (this.pagos == '3') {
      calculo = parseFloat(this.prefacturaConvenio.neto_prefac) / 3;
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 3;

    } else if (this.pagos == '6') {
      calculo = parseFloat(this.prefacturaConvenio.neto_prefac) / 6;
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 6;

    }
  }

  registrarConvenio() {
    if (this.pagos == '' || this.pagos == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe Seleccionar el número de pagos del convenio para continuar'
      });
    } else {
      // mensaje de confirmacion al realizar un registro, actualiza o elimniar
      this.toastSuccess("Se a registrao exitosamente el convenio de pago");
      this.cancelar();
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

}
