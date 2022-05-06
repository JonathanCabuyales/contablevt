import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AtrasousuarioI } from 'src/app/models/atrasos/atrasousuario.interface';
import { SueldosI } from 'src/app/models/sueldos/sueldos.interface';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { AtrasosService } from 'src/app/services/atrasos/atrasos.service';
import { SueldosService } from 'src/app/services/sueldos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialogsueldoempleado',
  templateUrl: './dialogsueldoempleado.component.html',
  styleUrls: ['./dialogsueldoempleado.component.css']
})
export class DialogsueldoempleadoComponent implements OnInit {

  // 
  // ------------------------------------------------------------------------------------
  // 
  // actualizacion 30 de diciembre del 2021
  // 
  // se aumento el calculo de multas por atrasos, la condicion que se debe cumplir es:
  // que los atrasos sumen mas de 10 min,
  // el valor de la multa sera del 10% del sueldo del empleado
  // 
  // ------------------------------------------------------------------------------------
  // 

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

  // variable para el token
  token: string = '';

  // variable para el combo box del mes
  mesrol: string = '0';
  aniorol: string = '0';
  enablemes: boolean;

  id_usuario: any;
  atrasousuario: AtrasousuarioI;
  listaAtrasos: any[];

  // variables para los atrasos
  atrasosjusti: string = '0';
  tiempojusti: string = '0';
  atrasosnojusti: string = '0';
  tiemponojusti: string = '0';
  multaatrasos: string = '0';

  constructor(public dialogRef: MatDialogRef<DialogsueldoempleadoComponent>, @Inject(MAT_DIALOG_DATA)
  public empleadoSueldo: UsuarioI,
    private _sueldo: SueldosService,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private _atrasos: AtrasosService) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');
    this.listaAtrasos = [];

    this.aniorol = '' + new Date().getFullYear();

    // this.getAtrasos();
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
      mes_rol: ''
    };
    this.enablemes = false;


    // console.log(this.empleadoSueldo);

    this.atrasousuario = {
      id_usuario: '',
      token: this.token,
      fechadesde: '',
      fechahasta: ''
    }

    // this.getAtrasos();

  }


  verificardias(dias) {

    this.dias2 = parseInt(dias);

    if (this.dias2 <= 0 || this.dias2 >= 31) {

      this.toastError("Los días laborados no pueden ser 0 o mayor a 30");
      this.showValores = false;
      this.showCalcular = false;
      this.cancelar();


    } else if (dias == "") {

      this.toastError("Los días laborados no pueden ser 0 o mayor a 30");
      this.showValores = false;
      this.showCalcular = false;
      this.cancelar();

    } else if (this.mesrol == '0') {

      this.toastError("Debes seleccionar el mes del rol");
      this.showValores = false;
      this.showCalcular = false;
      this.cancelar();

    } else {

      this.sueldo.diastrabajados = dias;

      // ultimo dia del mes
      // let dia = new Date(new Date().getFullYear(), parseInt(this.mesrol), 0).getDate();

      this.atrasousuario.id_usuario = this.empleadoSueldo.id_usuario + '';
      this.atrasousuario.fechadesde = this.aniorol + '-' + this.mesrol + '-' + '01';
      this.atrasousuario.fechahasta = this.aniorol + '-' + this.mesrol + '-' + new Date(parseInt(this.aniorol), parseInt(this.mesrol), 0).getDate();

      console.log(this.atrasousuario);

      this._atrasos.getAtrasoUsuario(this.atrasousuario).subscribe(res => {
        if (res.data.length) {

          this.showValores = true;
          this.showCalcular = true;
          this.enablemes = true;

          this.listaAtrasos = res.data;

          for (let i = 0; i < this.listaAtrasos.length; i++) {
            if (this.listaAtrasos[i].justificado_atr == 'SI') {
              this.atrasosjusti = (parseInt(this.atrasosjusti) + 1).toFixed(0);
              this.tiempojusti = (parseFloat(this.tiempojusti) + parseFloat(this.listaAtrasos[i].tiempo_atr)).toFixed(0);
            } else {
              this.atrasosnojusti = (parseInt(this.atrasosnojusti) + 1).toFixed(0);
              this.tiemponojusti = (parseFloat(this.tiemponojusti) + parseFloat(this.listaAtrasos[i].tiempo_atr)).toFixed(0);
            }
          }

        } else {

          this.listaAtrasos = [];

          this.showValores = true;
          this.showCalcular = true;
          this.enablemes = true;

        }
      });

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

    this.valorhora = (parseFloat(this.empleadoSueldo.sueldo) / 240);

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
        this.sueldo.id_usuario = this.empleadoSueldo.id_usuario;
        this.sueldo.tipohoras = 'C';

        this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.empleadoSueldo.sueldo);
        this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos) + parseFloat(this.sueldo.calculo_horas)).toFixed(2);

        this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
        this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
        this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
        this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
        // (400/12)/30
        this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);

        this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);

        // actualizacion 30 de diciembre del 2021
        // si el tiempo de atraso no justificado es mayor que 10 se procede al descuento
        if (parseInt(this.tiemponojusti) > 10) {
          this.sueldo.otrosegresos = (parseFloat(this.multaatrasos) + ((parseFloat(this.empleadoSueldo.sueldo) * 10) / 100)).toFixed(2);
        } else {
          this.sueldo.otrosegresos = '0';
        }

        this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos) - parseFloat(this.sueldo.otrosegresos)).toFixed(2);

        this.sueldo.sueldo = this.empleadoSueldo.sueldo;

        this.showCalcular = false;
        this.showSueldo = true;

      } else if (this.horasextras == 'S') {

        this.suplementarias = this.valorhora * 1.5;
        this.sueldo.calculo_horas = (parseFloat(this.sueldo.horasextras) * this.suplementarias).toFixed(2);
        this.sueldo.id_usuario = this.empleadoSueldo.id_usuario;
        this.sueldo.tipohoras = 'S';

        this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.empleadoSueldo.sueldo);
        this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos) + parseFloat(this.sueldo.calculo_horas)).toFixed(2);

        this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
        this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
        this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
        this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
        // (400/12)/30
        this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);

        this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);

        // actualizacion 30 de diciembre del 2021
        // si el tiempo de atraso no justificado es mayor que 10 se procede al descuento
        if (parseInt(this.tiemponojusti) > 10) {
          this.sueldo.otrosegresos = (parseFloat(this.multaatrasos) + ((parseFloat(this.empleadoSueldo.sueldo) * 10) / 100)).toFixed(2);
        } else {
          this.sueldo.otrosegresos = '0';
        }

        this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos) - parseFloat(this.sueldo.otrosegresos)).toFixed(2);

        this.sueldo.sueldo = this.empleadoSueldo.sueldo;

        this.showCalcular = false;
        this.showSueldo = true;
      }


    } else {

      this.sueldo.id_usuario = this.empleadoSueldo.id_usuario;
      this.sueldo.tipohoras = '';
      this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.empleadoSueldo.sueldo);
      this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos)).toFixed(2);
      this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
      this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
      this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
      this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
      this.sueldo.horasextras = '0';
      this.sueldo.calculo_horas = '0';
      this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);
      this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);

      // actualizacion 30 de diciembre del 2021
      // si el tiempo de atraso no justificado es mayor que 10 se procede al descuento
      if (parseInt(this.tiemponojusti) > 10) {
        this.sueldo.otrosegresos = (parseFloat(this.multaatrasos) + ((parseFloat(this.empleadoSueldo.sueldo) * 10) / 100)).toFixed(2);
      } else {
        this.sueldo.otrosegresos = '0';
      }

      this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos) - parseFloat(this.sueldo.otrosegresos)).toFixed(2);
      this.sueldo.sueldo = this.empleadoSueldo.sueldo;

      this.showCalcular = false;
      this.showSueldo = true;

    }

  }

  registrarSueldo() {

    if (this.mesrol == '0') {
      this.toastError("Debes seleccionar el mes para crear el rol.");
    } else {

      this.sueldo.token = this.token;
      this.sueldo.mes_rol = this.aniorol + '-' + this.mesrol + '-15';

      let mes_rol = this.aniorol + '-' + this.mesrol + '-15';

      this._sueldo.verificarSueldo(this.empleadoSueldo.id_usuario, mes_rol, this.token).subscribe(res => {

        if (!res.data.length) {
          this.dialogRef.close();
          this.showSueldo = false;

          this._sueldo.createSueldo(this.sueldo).subscribe(res => {
            console.log(res);
            if (res.data) {
              
              this.cancelar();
              this.toastSuccess("grabado");

            } else {
              this.toastError("Tenemos Problemas para registar el rol intentalo más tarde");
            }
          });

        } else {
          this.showSueldo = true;
          this.toastError("Ya se encuentra registrado el rol para el mes seleccionado, por favor verifica el mes.");
        }
      });
    }

  }

  cancelar() {
    this.showSueldo = false;
    this.showCalcular = false;
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
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }

}
