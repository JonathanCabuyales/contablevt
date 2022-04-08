import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recibirData'
})
export class RecibirDataPipe implements PipeTransform {

  transform(valor:any) {
    console.log(valor);
    let valor_enviar: any[] =[];
    for(let i=0; i < valor.length; i++){
      console.log(i);
      valor_enviar.push(...JSON.parse(valor[i].detalle));
    }

    // console.log(valor.filter(r => r.cuenta_num === '1'));
    
    console.log(valor_enviar);

    return valor_enviar;
    
    
    // return null;
  }

}
