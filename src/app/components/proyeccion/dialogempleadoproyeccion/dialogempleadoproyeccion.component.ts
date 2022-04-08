import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpleadoproyeccionI } from 'src/app/models/empleadoproyeccion.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogempleadoproyeccion',
  templateUrl: './dialogempleadoproyeccion.component.html',
  styleUrls: ['./dialogempleadoproyeccion.component.css']
})
export class DialogempleadoproyeccionComponent implements OnInit {

  empleadoProyeccion: EmpleadoproyeccionI;

  constructor(public dialogRef: MatDialogRef<DialogempleadoproyeccionComponent>, @Inject(MAT_DIALOG_DATA)
  public tiempoProyecto: number) { }

  ngOnInit(): void {
    this.empleadoProyeccion = {
      empleado: '',
      cantidad: 0,
      remuneracion: 0,
      decimotercer: '',
      decimocuarto: '',
      iess: '',
      total: ''
    }    
  }

  agregarEmpleado(){
    if(this.empleadoProyeccion.empleado == ''){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el tipo de empleado'
      });
    }else if(this.empleadoProyeccion.cantidad == 0 || this.empleadoProyeccion.cantidad <= 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la cantidad de empleados'
      });
    }else if(this.empleadoProyeccion.remuneracion == 0 || this.empleadoProyeccion.remuneracion <= 0 || this.empleadoProyeccion.remuneracion < 400){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar una remuneración mínima para continuar'
      });
    }else{      
      this.empleadoProyeccion.decimotercer = ( (this.empleadoProyeccion.remuneracion/ 12) * this.empleadoProyeccion.cantidad).toFixed(2);
      this.empleadoProyeccion.decimocuarto = ((400/12) * this.empleadoProyeccion.cantidad).toFixed(2) ;
      this.empleadoProyeccion.iess = (((this.empleadoProyeccion.remuneracion * 11.15)/100) * this.empleadoProyeccion.cantidad).toFixed(2);
      this.empleadoProyeccion.total = ((this.empleadoProyeccion.cantidad * this.empleadoProyeccion.remuneracion) + parseFloat(this.empleadoProyeccion.decimocuarto) + parseFloat(this.empleadoProyeccion.decimotercer) + parseFloat(this.empleadoProyeccion.iess)).toFixed(2);      
      this.dialogRef.close(this.empleadoProyeccion);
    }
  }

}
