import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteserService } from 'src/app/services/clienteser.service';
import { DialogProSerComponent } from '../dialog-pro-ser/dialog-pro-ser.component';

@Component({
  selector: 'app-dialogconfirmacion',
  templateUrl: './dialogconfirmacion.component.html',
  styleUrls: ['./dialogconfirmacion.component.css']
})
export class DialogconfirmacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogProSerComponent>, @Inject(MAT_DIALOG_DATA)
  private _cliente: ClienteserService) { }

  ngOnInit(): void {
  }

  confirmar(){
    let confirmacion = true;
    this.dialogRef.close(confirmacion);
  }

  cancelar(){
    this.dialogRef.close();
  }
}
