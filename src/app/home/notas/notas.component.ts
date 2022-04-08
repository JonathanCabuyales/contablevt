import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  active = 0;
  token: string = '';
  usuario: string;
  rol: string;
  foto: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(e) {
    
  }


}
