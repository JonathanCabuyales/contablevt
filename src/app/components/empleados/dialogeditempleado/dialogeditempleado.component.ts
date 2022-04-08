
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UsuarioI } from 'src/app/models/usuario.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogeditempleado',
  templateUrl: './dialogeditempleado.component.html',
  styleUrls: ['./dialogeditempleado.component.css']
})
export class DialogeditempleadoComponent implements OnInit {

  public previsualizacion: string = "";
  public archivos: any = []
  public archivos2: any = []
  public loading: boolean
  uploadPercent: Observable<number>;
  url: string = "";
  nombres: string = "";
  urlInicio: Observable<string>;
  showPassword: boolean = false;
  empleado: UsuarioI;
  fotoSubir: string = "";


  constructor(private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<DialogeditempleadoComponent>, @Inject(MAT_DIALOG_DATA)
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
      rol: '',
      sueldo: '',
      fotoperfil: '',
      tipocontrato: '',

      create_at: new Date()
    }

    this.nombres = this.empleadoUpdate.nombres;
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
        rol: '',
        sueldo: '',
        fotoperfil: '',
        tipocontrato: '',
        create_at: new Date()
      }
    } else {
      this.empleado = this.empleadoUpdate;
    }
  }

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    console.log(archivoCapturado);

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();


    const filePathCV = `fotosperfil/foto__${this.nombres}__${anio}_${mes}_${dia}`;
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
          console.log(url);
        }
      });
    });


    // this.extraerBase64(archivoCapturado).then((imagen: any) => {
    //   this.previsualizacion = imagen.base;
    //   console.log(imagen);

    // })
    // this.archivos.push(archivoCapturado)

    // 
    // console.log(event.target.files);

  }

  onUploadFinish(event) {
    console.log(event);
  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result

        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


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
        text: 'Los apellidos del empleado son necesarios'
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
    else if (this.empleado.fotoperfil == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe agregar una foto'
      });
    }
    else {
      this.empleado.rol = "EMPLEADO";

      if (this.empleadoUpdate == null) {
        delete this.empleado.id_usuario;
        delete this.empleado.create_at;
        this.dialogRef.close(this.empleado)

      } else {
        delete this.empleado.create_at;
        this.dialogRef.close(this.empleado);
      }

    }


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


