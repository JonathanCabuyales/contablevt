import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttEditorComponent } from 'ng-gantt';

@Component({
  selector: 'app-ganttpruebas',
  templateUrl: './ganttpruebas.component.html',
  styleUrls: ['./ganttpruebas.component.css']
})
export class GanttpruebasComponent implements OnInit {

  mostrarBoton: boolean = false;
  mostrarItems: any[] = [{
    desc: 'Prueba 1',
    fechaStart: '',
    fechaEnd: '',
    dias: '',
    check: false

  },
  {
    desc: 'Prueba 2',
    fechaStart: '',
    fechaEnd: '',
    dias: '',
    check: false

  },
  {
    desc: 'Prueba 2',
    fechaStart: '',
    fechaEnd: '',
    dias: '',
    check: false

  },
  {
    desc: 'Prueba 2',
    fechaStart: '',
    fechaEnd: '',
    dias: '',
    check: false

  },
  {
    desc: 'Prueba 1',
    fechaStart: '',
    fechaEnd: '',
    dias: '',
    check: false

  }]


  @ViewChild('editor', { static: true }) editor: GanttEditorComponent;
  @ViewChild('editorTwo', { static: true }) editorTwo: GanttEditorComponent;

  ngOnInit(): void {
    
  }


  /**
   * Model para ingresar las actividades y las imagenes
   * despues un modal para ingresar las fechas y los dias.
   * **/
  /* 
  agregar primero las actividades directamente con las imagenes y luego poder seleccionar y agregar
  las fechas y los dias si es que varios son de los mismos.
  */

  cambioValor(evento: any){
    console.log(evento);
    console.log(this.mostrarItems);

    for(let i=0; i< this.mostrarItems.length; i++){
      if(this.mostrarItems[i].check){
        this.mostrarBoton = true;
      }else{
        this.mostrarBoton = false;
      }
    }
    
    
  }

  mostrarData(){

  }

}
