import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acreedor'
})
export class AcreedorPipe implements PipeTransform {

  transform(value: string) {

    let primero = value.replace('[', "");
    let segundo = primero.replace(']', "");
    let generarArr:any[] = [];
    generarArr = segundo.split(',');
    console.log(generarArr);
    
    // console.log((value.replace(']', "")));
    // console.log(JSON.parse(value));
    
    return generarArr;
  }

}
