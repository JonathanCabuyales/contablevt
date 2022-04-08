import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miles'
})
export class MilesPipe implements PipeTransform {

  // function() {// should be altered to suit your needs
  //   return function(input) {
  //       var ret=(input)?input.toString().replace(".",","):null;
  //       if(ret){
  //           var decArr=ret.split(",");
  //           if(decArr.length>1){
  //               var dec=decArr[1].length;
  //               if(dec===1){ret+="0";}
  //           }//this is to show prices like 12,20 and not 12,2
  //       }
  //       return ret;
  //   };

  public transform(floatValue: any) {
    let multiplier = 1
    let decimals = 2;
    let floatMultiplied = floatValue * multiplier;
    let stringFloat = floatMultiplied + "";
    let arraySplitFloat = stringFloat.split(".");
    let decimalsValue = "0";
    if (arraySplitFloat.length > 1) {
        decimalsValue = arraySplitFloat[1].slice(0, decimals);
    }
    let integerValue = arraySplitFloat[0];
    let arrayFullStringValue = [integerValue, decimalsValue];
    let FullStringValue = arrayFullStringValue.join(".")
    let floatFullValue = parseFloat(FullStringValue) + "";
    let formatFloatFullValue = new Intl.NumberFormat('es-ES', { minimumFractionDigits: decimals }).format(parseInt(floatFullValue));
    return formatFloatFullValue;
    // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  }

}
