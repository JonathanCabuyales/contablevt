import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { DocumentosService } from 'src/app/services/documentos.service';
import { DocumentosI } from 'src/app/models/documentos/documentos.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dialogdocumentos',
  templateUrl: './dialogdocumentos.component.html',
  styleUrls: ['./dialogdocumentos.component.css']
})
export class DialogdocumentosComponent implements OnInit {

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  uploadPercent: Observable<number>;
  url: Observable<string>;
  urlContrato: Observable<string>;
  urlIESS: Observable<string>;
  urlCV: Observable<string>;
  urlCedula: Observable<string>;

  urlC: string = '';
  urlI: string = '';
  urlH: string = '';
  urlCe: string = '';

  pdfSrc: string = '';
  pdfContrato: string = '';
  pdfIESS: string = '';
  pdfCV: string = '';
  pdfCedula: string = '';

  pdfContratoS: string = '';
  pdfIESSS: string = '';
  pdfCVS: string = '';
  pdfCedulaS: string = '';

  uploadPercentC: Observable<number>;
  uploadPercentI: Observable<number>;
  uploadPercentH: Observable<number>;
  uploadPercentCe: Observable<number>;

  nombres: string = '';

  documentos: DocumentosI;
  showRegistrar: boolean = false;

  id_usuario: string = '';

  constructor(public dialogRef: MatDialogRef<DialogdocumentosComponent>, @Inject(MAT_DIALOG_DATA)
  public usuario: any,
    private storage: AngularFireStorage,
    private _documentos: DocumentosService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.documentos = {
      id_usuario: this.usuario.id_usuario,
      contrato_doc: '',
      IESS_doc: '',
      hojavida_doc: '',
      cedula_doc: '',
      actafiniquito_doc: ''
    }

    this.nombres = this.usuario.nombres + ' ' + this.usuario.apellidos;
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    // ponle el nombre del archivo sumado el nombre del empleado

    this.pdfSrc = "e.target.files[0]";

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `cedula/cedula_${this.nombres}_fecha${id}`;

    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.url = ref.getDownloadURL())).subscribe();
  }

  contrato(e) {

    this.pdfContratoS = e.target.files[0];

    let $img: any = document.querySelector('#pdfContrato');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfContrato = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    const fileContrato = this.pdfContratoS;
    const filePathContrato = `contratos/contrato__${this.nombres}__${anio}_${mes}_${dia}`;

    const refc = this.storage.ref(filePathContrato);
    const taskc = this.storage.upload(filePathContrato, fileContrato);
    this.uploadPercentC = taskc.percentageChanges();
    taskc.snapshotChanges().pipe(finalize(async () => this.urlContrato = refc.getDownloadURL())).subscribe();

    taskc.then((uploadSnapshot: firebase.default.storage.UploadTaskSnapshot) => {
      const downloadURL = refc.getDownloadURL();
      downloadURL.subscribe(url => {
        if (url) {
          this.urlC = url;
        }
      });
    });

  }

  IESS(e) {

    this.pdfIESSS = e.target.files[0];
    let $img: any = document.querySelector('#pdfIESS');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfIESS = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    const fileIESS = this.pdfIESSS;
    const filePathIESS = `IESS/iess__${this.nombres}__${anio}_${mes}_${dia}`;

    const refi = this.storage.ref(filePathIESS);
    const taski = this.storage.upload(filePathIESS, fileIESS);
    this.uploadPercentI = taski.percentageChanges();
    taski.snapshotChanges().pipe(finalize(async () => this.urlIESS = refi.getDownloadURL())).subscribe();

    taski.then((uploadSnapshot: firebase.default.storage.UploadTaskSnapshot) => {
      const downloadURL = refi.getDownloadURL();
      downloadURL.subscribe(url => {
        if (url) {
          this.urlI = url;
        }
      });
    });
  }

  CV(e) {

    this.pdfCVS = e.target.files[0];
    let $img: any = document.querySelector('#pdfCV');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfCV = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
    
    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    const filePathCV = `hojadevida/hojadevida__${this.nombres}__${anio}_${mes}_${dia}`;
    const fileCV = this.pdfCVS;

    const refh = this.storage.ref(filePathCV);
    const taskh = this.storage.upload(filePathCV, fileCV);

    this.uploadPercentH = taskh.percentageChanges();
    taskh.snapshotChanges().pipe(finalize(async () => this.urlCV = refh.getDownloadURL())).subscribe();

    taskh.then((uploadSnapshot: firebase.default.storage.UploadTaskSnapshot) => {
      const downloadURL = refh.getDownloadURL();
      downloadURL.subscribe(url => {
        if (url) {
          this.urlH = url;
        }
      });
    });


  }

  cedula(e) {

    this.pdfCedulaS = e.target.files[0];
    let $img: any = document.querySelector('#pdfCedula');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfCedula = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    const fileCedula = this.pdfCedulaS;
    const filePathCedula = `cedula/cedula__${this.nombres}__${anio}_${mes}_${dia}`;

    const refce = this.storage.ref(filePathCedula);
    const taskce = this.storage.upload(filePathCedula, fileCedula);

    this.uploadPercentCe = taskce.percentageChanges();
    taskce.snapshotChanges().pipe(finalize(async () => this.urlCedula = refce.getDownloadURL())).subscribe();

    taskce.then((uploadSnapshot: firebase.default.storage.UploadTaskSnapshot) => {
      const downloadURL = refce.getDownloadURL();
      downloadURL.subscribe(url => {
        if (url) {
          this.urlCe = url;
        }
      });
    });

  }

  subirArchivos() {

    
    if (this.urlC == '') {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe subir el contrato en formato PDF'
      });

    } else if (this.urlI == '') {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe subir el aviso de IESS en formato PDF'
      });

    } else if (this.urlH == '') {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe subir la hoja de vida en formato PDF'
      });

    } else if (this.urlCe == '') {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe subir la cedula en formato PDF'
      });

    } else {

      this.documentos.contrato_doc = this.urlC;
      this.documentos.IESS_doc = this.urlI;
      this.documentos.hojavida_doc = this.urlH;
      this.documentos.cedula_doc = this.urlCe;

      this._documentos.createDocumentos(this.documentos).subscribe(res=>{
        if(res == true){
          this.toastSuccess("La documentación se ha grabado exitosamente");
          this.dialogRef.close();
        }else{
          this.toastError("");
        }
      });

    }
  }

  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
