import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


export interface insumos {
  detalle: string,
  cantidad: string,
  valor: string,
  totalMes: string,
  total: string
}
@Component({
  selector: 'app-dialoginsumos',
  templateUrl: './dialoginsumos.component.html',
  styleUrls: ['./dialoginsumos.component.css']
})
export class DialoginsumosComponent implements OnInit {

  insumo: insumos;
  checked: boolean = true;

  constructor(public dialogRef: MatDialogRef<DialoginsumosComponent>, @Inject(MAT_DIALOG_DATA)
  public tiempoProyecto: number) { }

  ngOnInit(): void {
    this.insumo = {
      detalle: '',
      cantidad: '',
      valor: '',
      totalMes: '',
      total: ''
    }
  }

  grabarInsumo() {
    if (this.insumo.detalle == '' || this.insumo.cantidad == '' || this.insumo.valor == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar todos los datos para continuar'
      });
    } else {

      if (this.checked) {
        this.insumo.totalMes = (parseFloat(this.insumo.cantidad) * parseFloat(this.insumo.valor)).toFixed(2);
        this.insumo.total = (parseFloat(this.insumo.cantidad) * parseFloat(this.insumo.valor) * this.tiempoProyecto).toFixed(2);
        this.dialogRef.close(this.insumo);      
        
      }else{
        this.insumo.totalMes = (parseFloat(this.insumo.cantidad) * parseFloat(this.insumo.valor)).toFixed(2);
        this.insumo.total =  (parseFloat(this.insumo.cantidad) * parseFloat(this.insumo.valor)).toFixed(2);
        this.dialogRef.close(this.insumo);      

      }
    }
  }


}
