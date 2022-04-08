import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogcomprasComponent } from 'src/app/components/compras/dialogcompras/dialogcompras.component';
import { DialogcomprasregistradasComponent } from 'src/app/components/compras/dialogcomprasregistradas/dialogcomprasregistradas.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  @ViewChild('compranueva', { static: false }) compranueva: DialogcomprasComponent;
  @ViewChild('comprasregistradas', { static: false }) comprasregistradas: DialogcomprasregistradasComponent;

  active = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(e) {
    if(e == 0){
      this.compranueva.ngOnInit();
    }else if(e == 1){
      this.comprasregistradas.ngOnInit();
    }

  }

}
