import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogmaximumcompras',
  templateUrl: './dialogmaximumcompras.component.html',
  styleUrls: ['./dialogmaximumcompras.component.css']
})
export class DialogmaximumcomprasComponent implements OnInit {


  @Input() empresa: string ='';

  constructor() { }

  ngOnInit(): void {
  }

}
