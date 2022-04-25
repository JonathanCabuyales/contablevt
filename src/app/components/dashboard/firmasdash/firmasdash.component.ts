import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FirmasService } from 'src/app/services/firmas/firmas.service';

@Component({
  selector: 'app-firmasdash',
  templateUrl: './firmasdash.component.html',
  styleUrls: ['./firmasdash.component.css']
})
export class FirmasdashComponent implements OnInit {

  // variables para el grafico de notificaciones 
  public option: {};

  token: string = '';

  // empleados
  grupo: any[];
  firmas: any[];


  constructor(private _cookie: CookieService,
    private _firmas: FirmasService) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");

    this.notificaciones();
    this.grupo = [];
  }

  notificaciones() {

    this.firmas = [];

    this._firmas.getAll(this.token).subscribe(res => {
      console.log(res);
      
      let totalFirmas = '0';
      for (let i = 0; i < res.data.length; i++) {

        this.grupo[i] = res.data[i].usuario;

        this.firmas[i] = (parseInt(res.data[i].repeticiones) * 8);

        totalFirmas = (parseInt(totalFirmas) + parseInt(res.data[i].repeticiones)).toFixed(0);
      }

      totalFirmas = (parseInt(totalFirmas) * 8).toFixed(0);

      this.option = {
        title: {
          text: '\nRecolección De Firmas         Total Firmas: ' + totalFirmas,
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.grupo,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Firmas',
            type: 'bar',
            barWidth: '60%',
            data: this.firmas
          }
        ]
      };

    });

    // let base = +new Date(1988, 9, 3);
    // let oneDay = 24 * 3600 * 1000;

    // let data = [[base, Math.random() * 300]];

    // for (let i = 1; i < 20000; i++) {
    //   let now = new Date((base += oneDay));
    //   data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    // }
  }


}
