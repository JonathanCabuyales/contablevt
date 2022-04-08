import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogtablapuja',
  templateUrl: './dialogtablapuja.component.html',
  styleUrls: ['./dialogtablapuja.component.css']
})
export class DialogtablapujaComponent implements OnInit {

  cincoPorciento: string = '';
  seisPorciento: string = '';
  sitePorciento: string = '';
  ochoPorciento: string = '';
  nuevePorciento: string = '';
  diezPorciento: string = '';

  costoInversion: number;

  constructor(public dialogRef: MatDialogRef<DialogtablapujaComponent>, @Inject(MAT_DIALOG_DATA)
  public valorContrato: number) { }

  ngOnInit(): void {

    this.valorContrato = 143107.5;
    this.costoInversion = 85453;

    this.cincoPorciento = ((this.valorContrato * 5)/100).toFixed(2);
    this.seisPorciento = ((this.valorContrato * 6)/100).toFixed(2);
    this.sitePorciento = ((this.valorContrato * 7)/100).toFixed(2);
    this.ochoPorciento = ((this.valorContrato * 8)/100).toFixed(2);
    this.nuevePorciento = ((this.valorContrato * 9)/100).toFixed(2);
    this.diezPorciento = ((this.valorContrato * 10)/100).toFixed(2);



  }



}
