import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogperfilusuarioComponent } from 'src/app/components/perfilusuario/dialogperfilusuario/dialogperfilusuario.component';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnInit {

  @ViewChild('perfilusuario', { static: false }) perfilusuario: DialogperfilusuarioComponent;


  active = 0;

  showPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(e) {
    if(e == 0){
      this.perfilusuario.ngOnInit();
    }
  }

}
