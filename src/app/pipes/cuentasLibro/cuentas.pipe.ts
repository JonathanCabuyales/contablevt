import { Pipe, PipeTransform } from '@angular/core';
import { MaximumService } from 'src/app/services/maximum/maximum.service';

@Pipe({
  name: 'cuentas'
})
export class CuentasPipe implements PipeTransform {
  tmpCuentas: any [] = [];

  constructor(private _maximum: MaximumService){}
  transform(value: any) {
    
    console.log(value);
    console.log(JSON.parse(value));
    for(let i=0; i< JSON.parse(value).length; i++){
      this._maximum.getCuentasByAnexos(JSON.parse(value)[i])
      .subscribe((resp) =>{
        this.tmpCuentas.push(...resp.data);
      })
    }
    
    console.log(this.tmpCuentas);
    
    
    

    // return this.tmpCuentas;
    
    return this.tmpCuentas;
  }

}
