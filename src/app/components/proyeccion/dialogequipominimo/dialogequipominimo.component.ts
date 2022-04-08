import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialoginsumosComponent } from '../dialoginsumos/dialoginsumos.component';
import Swal from 'sweetalert2';


export interface equipoMinimo {
  detalle: string,
  cantidad: string,
  valor: string,
  totalMes: string,
  total: string
}

@Component({
  selector: 'app-dialogequipominimo',
  templateUrl: './dialogequipominimo.component.html',
  styleUrls: ['./dialogequipominimo.component.css']
})
export class DialogequipominimoComponent implements OnInit {

  equipominimo: equipoMinimo;
  checked: boolean = true;

  constructor(public dialogRef: MatDialogRef<DialoginsumosComponent>, @Inject(MAT_DIALOG_DATA)
  public tiempoProyecto: number) { }

  ngOnInit(): void {
    this.equipominimo = {
      detalle: '',
      cantidad: '',
      valor: '',
      totalMes: '',
      total: ''
    }
  }

  grabarEquipoMinimo() {
    if(this.equipominimo.detalle == '' || this.equipominimo.cantidad == '' || this.equipominimo.valor == ''){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar todos los datos para continuar'
      });
    }else{

      if (this.checked) {

        this.equipominimo.totalMes = (parseFloat(this.equipominimo.cantidad) * parseFloat(this.equipominimo.valor)).toFixed(2);
        this.equipominimo.total = (parseFloat(this.equipominimo.cantidad) * parseFloat(this.equipominimo.valor) * this.tiempoProyecto).toFixed(2);
        this.dialogRef.close(this.equipominimo);   
        
      }else{

        this.equipominimo.totalMes = (parseFloat(this.equipominimo.cantidad) * parseFloat(this.equipominimo.valor)).toFixed(2);
        this.equipominimo.total = (parseFloat(this.equipominimo.cantidad) * parseFloat(this.equipominimo.valor)).toFixed(2);
        this.dialogRef.close(this.equipominimo);

      }

      
    }
  }

}
