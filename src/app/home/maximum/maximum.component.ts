import { Component, OnInit, ViewChild } from '@angular/core';
import { CreatereportmaximumComponent } from 'src/app/components/maximum/createreportmaximum/createreportmaximum.component';

@Component({
  selector: 'app-maximum',
  templateUrl: './maximum.component.html',
  styleUrls: ['./maximum.component.css']
})
export class MaximumComponent implements OnInit {

  @ViewChild('reporte', { static: false }) reporte: CreatereportmaximumComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(e: any){

    if(e == 1){
      this.reporte.ngOnInit();
    }
    
  }

}
