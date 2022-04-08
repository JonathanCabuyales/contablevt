import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { SueldosI } from 'src/app/models/sueldos/sueldos.interface';
import { SueldosService } from 'src/app/services/sueldos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogeditrol',
  templateUrl: './dialogeditrol.component.html',
  styleUrls: ['./dialogeditrol.component.css']
})
export class DialogeditrolComponent implements OnInit {

  // varibales para los botones
  showSueldo: boolean = false;
  showCalcular: boolean = false;
  showValores: boolean = false;
  showHoras: boolean = false;

  // varibales para el calculo del sueldo
  sueldo: SueldosI;
  sueldodiastrabajados: any;
  decimotercer: any;
  decimocuarto: any;
  horasextras: string = '0';
  horassuplementarias: any;
  horascomplementarias: any;
  valorhora: any;
  dias: any;
  dias2: any;
  complementarias: any;
  suplementarias: any;
  token: string;

  constructor(public dialogRef: MatDialogRef<DialogeditrolComponent>, @Inject(MAT_DIALOG_DATA)
  public rolupdate: any,
    private _sueldo: SueldosService,
    private toastr: ToastrService,
    private _cookie: CookieService) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');

    this.sueldo = {
      id_usuario: 0,
      sueldo: '',
      diastrabajados: '',
      horasextras: '0',
      calculo_horas: '0',
      tipohoras: '',
      bonostransporte: '0',
      bonosalimentacion: '0',
      otrosingresos: '0',
      decimotercer: '0',
      decimocuarto: '0',
      totalingresos: '0.00',
      iessindividual: '0.00',
      iesspatronal: '0',
      iesstotal: '0',
      anticipos: '0',
      prestamos_oficina: '0',
      prestamo_hipotecario: '0',
      prestamo_quirografario: '0',
      otrosegresos: '0',
      total_egresos: '0.00',
      neto_recibir: '0.00',
      contrato: '',
      aprobado: 'NO',
      actafiniquito: '',
      token: ''
    };

    this.sueldo.id_usuario = this.rolupdate.id_usuario;
    this.sueldo.id_sueldos = this.rolupdate.id_sueldos;
    this.sueldo.sueldo = this.rolupdate.sueldo;
    this.sueldo.diastrabajados = this.rolupdate.diastrabajados;
    this.sueldo.horasextras = this.rolupdate.horasextras;
    this.sueldo.calculo_horas = this.rolupdate.calculo_horas;
    this.sueldo.tipohoras = this.rolupdate.tipohoras;
    this.sueldo.bonostransporte = this.rolupdate.bonostransporte;
    this.sueldo.bonosalimentacion = this.rolupdate.bonosalimentacion;
    this.sueldo.otrosingresos = this.rolupdate.otrosingresos;
    this.sueldo.decimotercer = this.rolupdate.decimotercer;
    this.sueldo.decimocuarto = this.rolupdate.decimocuarto;
    this.sueldo.totalingresos = this.rolupdate.totalingresos;
    this.sueldo.iessindividual = this.rolupdate.iessindividual;
    this.sueldo.iesspatronal = this.rolupdate.iesspatronal;
    this.sueldo.iesstotal = this.rolupdate.iesstotal;
    this.sueldo.anticipos = this.rolupdate.anticipos;
    this.sueldo.prestamos_oficina = this.rolupdate.prestamos_oficina;
    this.sueldo.prestamo_hipotecario = this.rolupdate.prestamo_hipotecario;
    this.sueldo.prestamo_quirografario = this.rolupdate.prestamo_quirografario;
    this.sueldo.otrosegresos = this.rolupdate.otrosegresos;
    this.sueldo.total_egresos = this.rolupdate.total_egresos;
    this.sueldo.neto_recibir = this.rolupdate.neto_recibir;
    this.sueldo.contrato = this.rolupdate.contrato;
    this.sueldo.aprobado = this.rolupdate.aprobado;
    this.sueldo.actafiniquito = this.rolupdate.actafiniquito;

    this.verificardias(this.rolupdate.diastrabajados);

  }


  verificardias(dias) {

    this.dias2 = parseInt(dias);

    if (this.dias2 <= 0 || this.dias2 >= 31) {
      // Swal.fire({
      //   icon: 'warning',
      //   confirmButtonColor: '#1d1d24',
      //   text: 'Los días laborados no pueden ser menor a 0 o mayor a 30'
      // });

      this.toastError("Los días laborados no pueden ser 0 o mayor a 30");
      this.showValores = false;
      this.showCalcular = false;
      this.cancelar();


    } else if (dias == "") {
      this.toastError("Los días laborados no pueden ser 0 o mayor a 30");
      this.showValores = false;
      this.showCalcular = false;
      this.cancelar();

    }
    else {

      this.sueldo.diastrabajados = dias;

      this.showValores = true;
      this.showCalcular = true;
    }
  }

  combohoras() {
    if (this.horasextras == 'S') {
      this.showHoras = true;
    } if (this.horasextras == 'C') {
      this.showHoras = true;
    }
  }

  calcularSueldo() {

    this.valorhora = (parseFloat(this.rolupdate.sueldo) / 240);
    // console.log(this.sueldo.diastrabajados);

    if (this.sueldo.diastrabajados == '' || this.sueldo.diastrabajados == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar los días laborados'
      });
    } else {
      if (this.sueldo.horasextras > '0') {
        if (this.horasextras == '0') {
          Swal.fire({
            icon: 'warning',
            confirmButtonColor: '#1d1d24',
            text: 'Debe seleccionar el tipo de horas extras para el calculo'
          });
        } else if (this.horasextras == 'C') {
          this.complementarias = this.valorhora * 2;

          this.sueldo.calculo_horas = (parseFloat(this.sueldo.horasextras) * this.complementarias).toFixed(2);
          this.sueldo.id_usuario = this.rolupdate.id_usuario;
          this.sueldo.tipohoras = 'C';

          this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.rolupdate.sueldo);
          this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos) + parseFloat(this.sueldo.calculo_horas)).toFixed(2);

          this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
          this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
          this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
          this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
          // (400/12)/30
          this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);

          this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);

          this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos)).toFixed(2);
          this.sueldo.sueldo = this.rolupdate.sueldo;

          this.showCalcular = false;
          this.showSueldo = true;

        } else if (this.horasextras == 'S') {

          this.suplementarias = this.valorhora * 1.5;
          this.sueldo.calculo_horas = (parseFloat(this.sueldo.horasextras) * this.suplementarias).toFixed(2);
          this.sueldo.id_usuario = this.rolupdate.id_usuario;
          this.sueldo.tipohoras = 'S';

          this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.rolupdate.sueldo);
          this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos) + parseFloat(this.sueldo.calculo_horas)).toFixed(2);

          this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
          this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
          this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
          this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
          // (400/12)/30
          this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);

          this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);

          this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos)).toFixed(2);

          this.sueldo.sueldo = this.rolupdate.sueldo;

          this.showCalcular = false;
          this.showSueldo = true;
        }


      } else {

        this.sueldo.id_usuario = this.rolupdate.id_usuario;
        this.sueldo.tipohoras = '';
        this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.rolupdate.sueldo);
        this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos)).toFixed(2);
        this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
        this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
        this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
        this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
        this.sueldo.horasextras = '0';
        this.sueldo.calculo_horas = '0';
        this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);
        this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);
        this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos)).toFixed(2);
        this.sueldo.sueldo = this.rolupdate.sueldo;

        this.showCalcular = false;
        this.showSueldo = true;
      }
    }

  }

  registrarSueldo() {

    if (this.sueldo.diastrabajados == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Los días laborados no pueden ser menor a 0 o mayor a 30'
      });
    } else {

      this.sueldo.token = this.token;
      
      this._sueldo.updateSueldo(this.sueldo).subscribe(res=>{

        if(res.data == true){
          this.dialogRef.close(true);
          this.cancelar();
          this.toastSuccess("Rol actualizado exitosamente!");
        }else{
          this.toastError("No hemos podido actualizar el rol intente nuevamente más tarde");
          this.dialogRef.close(false);
        } 
        
      });

      // this.showSueldo = false;

    }
  }

  cancelar() {
    this.showSueldo = false;
    this.showCalcular = true;
    this.showValores = false;
    this.horasextras = '0';
    this.showHoras = false;
    this.sueldo = {
      id_usuario: 0,
      sueldo: '',
      diastrabajados: '',
      horasextras: '0',
      calculo_horas: '0',
      tipohoras: '',
      bonostransporte: '0',
      bonosalimentacion: '0',
      otrosingresos: '0',
      decimotercer: '0',
      decimocuarto: '0',
      totalingresos: '0.00',
      iessindividual: '0.00',
      iesspatronal: '0',
      iesstotal: '0',
      anticipos: '0',
      prestamos_oficina: '0',
      prestamo_hipotecario: '0',
      prestamo_quirografario: '0',
      otrosegresos: '0',
      total_egresos: '0.00',
      neto_recibir: '0.00',
      contrato: '',
      aprobado: 'NO',
      actafiniquito: ''
    };
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }

}
