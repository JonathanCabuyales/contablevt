import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
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
  token: any ='';

  fechaMin: any = '';
  fechaMax: any = '';

  sumaTotalDias:number = 0;
  restaDiasTrabajados: number = 0;

  constructor(
    private _dialog: MatDialog,
    private _ref: MatDialogRef<CreateactividadesproyeccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _proyeccion: ProyeccionService,
    private _token: CookieService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {

    console.log(this.data);
    this.token = this._token.get('token');

    this.minMaxFecha();
    this.diasRestantes();
    this.fechaActividad = this.data.fechaStart;
    
  }


  minMaxFecha(){
    this.fechaMin = this.data.fechaStart;
    let fechaMaxTmp = moment(this.data.fechaStart).add(parseInt(this.data.diasTrabajados), 'days');
    this.fechaMax = fechaMaxTmp.toDate().getFullYear() +'-'+ (fechaMaxTmp.toDate().getMonth()<10 ? '0'+(fechaMaxTmp.toDate().getMonth() + 1): (fechaMaxTmp.toDate().getMonth()+1)) +'-'+(fechaMaxTmp.toDate().getDate() < 10 ? '0'+(fechaMaxTmp.toDate().getDate()) : fechaMaxTmp.toDate().getDate());
  }

  diasRestantes(){

    this._proyeccion.getActividadGantt(this.token, this.data.id_pro)
    .subscribe((respPro) =>{
      console.log(respPro);
      for(let i=0; i< respPro.data.length; i++){
        this.sumaTotalDias += parseInt(respPro.data[i].dias);
      }
      this.restaDiasTrabajados = parseInt(this.data.diasTrabajados) - this.sumaTotalDias;
    });
  }
  guardarActividades(){

    // this.restaDiasTrabajados = parseInt(this.data.diasTrabajados) - this.sumaTotalDias;
    if(parseInt(this.diasTrabajados) < this.restaDiasTrabajados){

      let fechaF:moment.Moment = moment(this.fechaActividad).add(this.diasTrabajados, 'days');
      let month = (fechaF.toDate().getMonth()) < 10 ? '0'+(fechaF.toDate().getMonth() + 1) : fechaF.toDate().getDate();
      let day = (fechaF.toDate().getDate() < 10 ?  '0'+fechaF.toDate().getDate(): fechaF.toDate().getDate());
      let fechaFinalUnir = fechaF.toDate().getFullYear()+'-'+ month + '-'+day;
      
      this.enviarData={
        actividad: this.actividadPrincipal,
        fechaStart: this.fechaActividad,
        fechaEnd: fechaFinalUnir,
        dias: this.diasTrabajados,
        antes: this.imgAntes,
        durante: this.imgDurante,
        despues: this.imgDespues,
        id_pro: this.data.id_pro,
        token: this.token
      }
  
      console.log(this.enviarData);
  
  
      this._proyeccion.insertActividad(this.enviarData)
      .subscribe((resp) =>{
        console.log(resp);
  
        this._ref.close();
      });
    }else{
      this._toastr.warning('Límite excedido por los días', 'Error días trabajados');
    }
    
    


    

    // this._ref.close(this.enviarData);

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
