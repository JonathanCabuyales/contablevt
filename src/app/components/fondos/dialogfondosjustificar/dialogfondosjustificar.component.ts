import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FondoI } from 'src/app/models/fondos/fondo.interface';
import { FondodetallesI } from 'src/app/models/fondos/fondosdetalles.interface';
import { FondosService } from 'src/app/services/fondos/fondos.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dialogfondosjustificar',
  templateUrl: './dialogfondosjustificar.component.html',
  styleUrls: ['./dialogfondosjustificar.component.css']
})
export class DialogfondosjustificarComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'monto', 'foto', 'fechaasignacion', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  valorjustificacion: string = '';
  descripcionjustificacion: string = '';

  // variable para capturar el fondo enviado desde el componente justificacion
  fondoasignado: FondoI;
  fondojustificado: string = '0';
  fondonojustificado: string = '0';

  // variables para la foto del detalle de la justificacion
  uploadPercent: Observable<number>;
  url: string = "";
  nombres: string = "";
  urlInicio: Observable<string>;
  imagenDetalle: string = '';

  listadetallesnueva: any[];
  listadetallesguardados: any[];

  detalle: FondodetallesI;

  lastIndex: number = 0;

  token: string = '';

  id_usuario: string = '';
  id_fon: string = '';

  parametros = {
    id_usuario: '',
    id_fon: '',
    token: ''
  };

  fondojusupdate = {
    id_fonjus: '',
    detalles_fonjus: '',
    justificado_fonjus: '',
    nojustificado_fonjus: '',
    token: ''
  }

  id_fonjus: string = '';

  fecha: string = '';

  constructor(public dialogRef: MatDialogRef<DialogfondosjustificarComponent>, @Inject(MAT_DIALOG_DATA)
  public fondo: any,
    private toastr: ToastrService,
    private _fondos: FondosService,
    private _cookie: CookieService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");

    this.listadetallesnueva = [];

    this.fondoasignado = {
      id_fon: '',
      id_usuario: '',
      monto_fon: '',
      descripcion_fon: '',
      fechaasignacion_fon: '',
    }

    this.detalle = {
      descripcion: '',
      monto: '',
      foto: '',
      fecha: ''
    };

    this.fondoasignado = this.fondo;

    this.id_usuario = this.fondoasignado.id_usuario;
    this.id_fon = this.fondoasignado.id_fon;

    this.parametros.id_usuario = this.id_usuario;
    this.parametros.id_fon = this.id_fon;
    this.parametros.token = this.token;

    this.loadFondosJustificados();

    this.fecha = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
    new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

  }


  registrardetalle() {
    console.log(this.valorjustificacion);

    if (this.valorjustificacion == '' || this.valorjustificacion == null || this.valorjustificacion < '0') {
      this.toastError("Debes ingresar el valor para continuar");
    } else if (this.descripcionjustificacion == '') {
      this.toastError("Debes ingresar una pequeña descripción para continuar");
    } else if (this.valorjustificacion > this.fondoasignado.monto_fon) {
      this.toastError("No puedes justificar un valor mayor al asignado");
    } else if (this.imagenDetalle == '') {
      this.toastError("Ups, debes ingresar la envidencia fotografica para continuar");
    } else {
      console.log("todo bien");

      if (this.valorjustificacion > this.fondonojustificado) {
        this.toastError("No puedes justificar un valor mayor al restante");
      } else {

        this.detalle.monto = this.valorjustificacion;
        this.detalle.descripcion = this.descripcionjustificacion;
        this.detalle.fecha = this.fecha;
        this.detalle.foto = this.imagenDetalle;

        if (!this.listadetallesnueva.length) {

          this.listadetallesnueva[0] = this.detalle;
          this.valorjustificacion = '';
          this.descripcionjustificacion = '';
          this.cancelar();

        } else {

          this.lastIndex = this.listadetallesnueva.length;
          this.listadetallesnueva[this.lastIndex] = this.detalle;

          this.valorjustificacion = '';
          this.descripcionjustificacion = '';
          this.cancelar();

        }

        this.fondojustificado = '0';
        this.fondonojustificado = '0';

        for (let i = 0; i < this.listadetallesnueva.length; i++) {

          this.fondojustificado = (parseFloat(this.fondojustificado) + parseFloat(this.listadetallesnueva[i].monto)).toFixed(2);

        }

        this.fondonojustificado = (parseFloat(this.fondoasignado.monto_fon) - parseFloat(this.fondojustificado)).toFixed(2);

        this.fondojusupdate.id_fonjus = this.id_fonjus;
        this.fondojusupdate.detalles_fonjus = JSON.stringify(this.listadetallesnueva);
        this.fondojusupdate.justificado_fonjus = this.fondojustificado;
        this.fondojusupdate.nojustificado_fonjus = this.fondonojustificado;
        this.fondojusupdate.token = this.token;

        this._fondos.updateFondoJustificacion(this.fondojusupdate).subscribe(res => {
          console.log(res);
          if (res.data) {
            this.loadFondosJustificados();
            this.toastSuccess("Hemos registrado correctamente tu detalle");
          } else {
            this.toastError("Upss, tenemos problemas para registrar el detalle, intentalo nuevamente");
          }
        });

      }
    }
  }

  deleteDetalle(detalle) {

    for (let i = 0; i < this.listadetallesnueva.length; i++) {

      if (this.listadetallesnueva[i].monto == detalle.monto &&
        this.listadetallesnueva[i].fecha == detalle.fecha) {

        this.listadetallesnueva.splice(i, 1);
        break;
      }

    }

    console.log(this.listadetallesnueva);
    this.fondojustificado = '0';
    this.fondonojustificado = '0';

    for (let i = 0; i < this.listadetallesnueva.length; i++) {

      this.fondojustificado = (parseFloat(this.fondojustificado) + parseFloat(this.listadetallesnueva[i].monto)).toFixed(2);

    }

    this.fondonojustificado = (parseFloat(this.fondoasignado.monto_fon) - parseFloat(this.fondojustificado)).toFixed(2);

    this.fondojusupdate.id_fonjus = this.id_fonjus;
    this.fondojusupdate.detalles_fonjus = JSON.stringify(this.listadetallesnueva);
    this.fondojusupdate.justificado_fonjus = this.fondojustificado;
    this.fondojusupdate.nojustificado_fonjus = this.fondonojustificado;
    this.fondojusupdate.token = this.token;

    this._fondos.updateFondoJustificacion(this.fondojusupdate).subscribe(res => {
      console.log(res);
      if (res.data) {
        this.loadFondosJustificados();
        this.toastSuccess("Hemos borrado el registro exitosmanete, no te olvides de justificar los fondos");
      } else {
        this.toastError("Upss, tenemos problemas para actualizar la información, intentalo nuevamente");
      }
    });

  }

  loadFondosJustificados() {
    this._fondos.getFondojustiUsuario(this.parametros).subscribe(res => {

      this.id_fonjus = res.data[0].id_fonjus;

      console.log(res.data[0].detalles_fonjus);
      
      if (res.data.length) {

        if (res.data[0].detalles_fonjus == '') {
          this.fondojustificado = res.data[0].justificado_fonjus;
          this.fondonojustificado = res.data[0].nojustificado_fonjus;

          this.listadetallesnueva = [];

          this.dataSource = new MatTableDataSource(this.listadetallesnueva);
          this.dataSource.paginator = this.paginator;

        } else {

          this.fondojustificado = res.data[0].justificado_fonjus;
          this.fondonojustificado = res.data[0].nojustificado_fonjus;

          this.listadetallesnueva = JSON.parse(res.data[0].detalles_fonjus);

          this.dataSource = new MatTableDataSource(this.listadetallesnueva);
          this.dataSource.paginator = this.paginator;
        }

      } else {

        this.fondojustificado = '0';
        this.fondonojustificado = this.fondoasignado.monto_fon;

        this.listadetallesnueva = [];

        this.dataSource = new MatTableDataSource(this.listadetallesnueva);
        this.dataSource.paginator = this.paginator;

      }

    });
  }

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]

    var aleatorio = Math.random();
    let fecha = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
    new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

    const filePathCV = `justificacionfondos/justificacion_id_fon${this.id_fon}_${fecha}_${aleatorio}`;
    //Igualar a foto capturada
    const fileCV = archivoCapturado;

    const refh = this.storage.ref(filePathCV);
    const taskh = this.storage.upload(filePathCV, fileCV);


    this.uploadPercent = taskh.percentageChanges();
    taskh.snapshotChanges().pipe(finalize(async () => this.urlInicio = refh.getDownloadURL())).subscribe();

    taskh.then((uploadSnapshot: firebase.default.storage.UploadTaskSnapshot) => {
      const downloadURL = refh.getDownloadURL();
      downloadURL.subscribe(url => {
        if (url) {
          this.imagenDetalle = url;
        }
      });
    });

  }

  cancelar() {
    this.detalle = {
      descripcion: '',
      monto: '',
      foto: '',
      fecha: ''
    }

    this.imagenDetalle = '';
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }

}
