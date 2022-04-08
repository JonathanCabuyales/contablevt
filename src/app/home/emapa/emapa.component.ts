import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogcortesComponent } from 'src/app/components/emapa/dialogcortes/dialogcortes.component';
import { DialognotificacionesComponent } from 'src/app/components/emapa/dialognotificaciones/dialognotificaciones.component';
import { DialognovedadesComponent } from 'src/app/components/emapa/dialognovedades/dialognovedades.component';
import { DialogreconexionesComponent } from 'src/app/components/emapa/dialogreconexiones/dialogreconexiones.component';

@Component({
  selector: 'app-emapa',
  templateUrl: './emapa.component.html',
  styleUrls: ['./emapa.component.css']
})
export class EmapaComponent implements OnInit {

  @ViewChild('notificaciones', { static: false }) notificaciones: DialognotificacionesComponent;
  @ViewChild('cortes', { static: false }) cortes: DialogcortesComponent;
  @ViewChild('reconexiones', {static: false}) reconexiones: DialogreconexionesComponent;
  @ViewChild('novedades', {static: false}) novedades: DialognovedadesComponent;

  active = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(e) {
    if(e == 0){
      this.notificaciones.ngOnInit();
    }else if(e == 1){
      this.cortes.ngOnInit();
    }else if (e == 2){
      this.reconexiones.ngOnInit();
    }else if ( e == 3){
      this.novedades.ngOnInit();
    }

  }


}
