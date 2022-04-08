import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UsuarioI } from 'src/app/models/usuario.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogempleado',
  templateUrl: './dialogempleado.component.html',
  styleUrls: ['./dialogempleado.component.css']
})
export class DialogempleadoComponent implements OnInit {

  showPassword: boolean = false;

  empleado: UsuarioI;

  imagenUsuario: string = '';

  // variables para la foto del usuario
  uploadPercent: Observable<number>;
  url: string = "";
  nombres: string = "";
  urlInicio: Observable<string>;

  constructor(public dialogRef: MatDialogRef<DialogempleadoComponent>, @Inject(MAT_DIALOG_DATA)
  public empleadoUpdate: UsuarioI,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.empleado = {
      id_usuario: 0,
      nombres: '',
      apellidos: '',
      ciruc: '',
      direccion: '',
      email: '',
      telefono: '',
      usuario: '',
      contrasenia: '',
      rol: '0',
      sueldo: '',
      fotoperfil: '',
      tipocontrato: '0',
      create_at: new Date()
    }

    if (this.empleadoUpdate == null) {
      this.empleadoUpdate = {
        id_usuario: 0,
        nombres: '',
        apellidos: '',
        ciruc: '',
        direccion: '',
        email: '',
        telefono: '',
        usuario: '',
        contrasenia: '',
        rol: '0',
        sueldo: '',
        fotoperfil: '',
        tipocontrato: '0',
        create_at: new Date()
      }
    } else {
      this.empleado = this.empleadoUpdate;
    }
  }

  guardar() {

    // Tipo de roles empleado, administrador, superadministrador
    if (this.empleado.usuario == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el usuario'
      });
    } else if (this.empleado.contrasenia == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe proporcionar una contraseña para el usuario'
      });
    } else if (this.empleado.nombres == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Los nombres del empleado son necesarios'
      });
    } else if (this.empleado.apellidos == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Los apelldios del empleado son necesarios'
      });
    } else if (this.empleado.ciruc == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la cédula'
      });
    } else if (this.empleado.direccion == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la dirección '
      });
    } else if (this.empleado.email == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El correo electronico es necesario'
      });
    } else if (this.empleado.telefono == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de teléfono'
      });
    } else if (this.empleado.nombres == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Los nombres del empleado son necesarios'
      });
    }

    else if (this.empleado.fotoperfil == ''){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No podemos continuar ingrese la foto de perfil de usuario'
      });
    } 
    else if (this.empleado.sueldo == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No podemos continuar ingrese el sueldo del Empleado'
      });
    } else if (this.empleado.tipocontrato == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No podemos continuar ingrese el tipo de contrato del Empleado'
      });
    } else if (this.empleado.rol == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar el rol del empleado'
      });
    } else {

      if (this.empleadoUpdate == null) {
        delete this.empleado.id_usuario;
        delete this.empleado.create_at;
        this.dialogRef.close(this.empleado);
      } else {
        delete this.empleado.create_at;
        this.dialogRef.close(this.empleado);
      }
    }

  }


  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    let hora = new Date().getHours();
    let min = new Date().getMinutes();
    let seg = new Date().getSeconds();

    const filePathCV = `fotosperfil/foto__${anio}_${mes}_${dia}___${hora}_${min}_${seg}`;
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
          this.empleado.fotoperfil = url;
          this.imagenUsuario = url;
        }
      });
    });

  }

  cancelar() {
    this.dialogRef.close();
  }

  // cambiar de text a password
  contrasena() {
    if (this.showPassword == true) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }

}
