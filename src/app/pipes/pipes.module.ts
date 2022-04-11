import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasPipe } from './cuentasLibro/cuentas.pipe';
import { RecibirDataPipe } from './devolvernumprincipal/recibir-data.pipe';



@NgModule({
  declarations: [CuentasPipe, RecibirDataPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CuentasPipe, RecibirDataPipe
  ]
})
export class PipesModule { }
