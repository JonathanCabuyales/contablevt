import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialofundacioncompras',
  templateUrl: './dialofundacioncompras.component.html',
  styleUrls: ['./dialofundacioncompras.component.css']
})
export class DialofundacioncomprasComponent implements OnInit {

  @Input() empresa: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
