import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'depreciacion'
})
export class DepreciacionPipe implements PipeTransform {

  transform(value: any) {
    // console.log(value);
    // console.log(JSON.parse(value));

    
    
    
    return JSON.parse(value);
  }

}
