import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuentas'
})
export class CuentasPipe implements PipeTransform {
  tmpCuentas: any [] = [];
  transform(value: any) {
    console.log(value);

    for(let i = 0; i < value.length; i ++){
      console.log(value[i]);

      let dividirTexto = value[i].tipo_cuenta.split(',');
      console.log(dividirTexto);
      
      this.tmpCuentas.push({...value[i], tipo_cuenta: dividirTexto})
      
      
      
    }

    console.log(this.tmpCuentas);
    

    return this.tmpCuentas;
    
    // return null;
  }

}
