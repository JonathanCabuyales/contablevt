import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialogeditnota',
  templateUrl: './dialogeditnota.component.html',
  styleUrls: ['./dialogeditnota.component.css']
})
export class DialogeditnotaComponent implements OnInit {

  nota = {
    descripcion_nota: '',
    token: '',
    id_nota: ''
  }

  constructor(public dialogRef: MatDialogRef<DialogeditnotaComponent>, @Inject(MAT_DIALOG_DATA)
  public notaupdate: any,
  private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.nota = this.notaupdate;

  }

  guardarNota(){

    if (this.nota.descripcion_nota == '' || this.nota.descripcion_nota == null) {
      this.toastError("No tenemos nada por guardar");
    } else {
      this.dialogRef.close(this.nota);
    }

  }

  
  clear(){
    this.nota.descripcion_nota = '';
  }


  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 5000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 5000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
