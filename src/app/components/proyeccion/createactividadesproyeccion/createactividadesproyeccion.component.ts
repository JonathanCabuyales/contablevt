import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyeccionService } from 'src/app/services/proyeccion/proyeccion.service';

@Component({
  selector: 'app-createactividadesproyeccion',
  templateUrl: './createactividadesproyeccion.component.html',
  styleUrls: ['./createactividadesproyeccion.component.css']
})
export class CreateactividadesproyeccionComponent implements OnInit {

  actividadPrincipal: string = '';
  fechaActividad: string = '';
  diasTrabajados: string = '';
  imgAntes: string = '';
  imgDurante: string = '';
  imgDespues: string = '';

  enviarData:any = {};

  constructor(
    private _dialog: MatDialog,
    private _ref: MatDialogRef<CreateactividadesproyeccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _proyeccion: ProyeccionService
  ) { }

  ngOnInit(): void {

    console.log(this.data);
    
  }

  guardarActividades(){

    this.enviarData={
      actividad: this.actividadPrincipal,
      fecha: this.fechaActividad,
      dias: this.diasTrabajados,
      antes: this.imgAntes,
      durante: this.imgDurante,
      despues: this.imgDespues
    }

    this._ref.close(this.enviarData);

  }

  cambioImg(evento :any, tipo: any){
    console.log(evento);

    this._proyeccion.insertImg(evento.target.files[0], this.data.id_pro)
    .subscribe((resp) =>{
      console.log(resp);
      
      if(tipo == 'antes'){
        this.imgAntes = resp.message;
      }else if(tipo == 'durante'){
        this.imgDurante = resp.message;
        
      }else{
        this.imgDespues = resp.message;

      }
      
    })
    
  }

}
