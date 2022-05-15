import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasPipe } from './cuentasLibro/cuentas.pipe';
import { RecibirDataPipe } from './devolvernumprincipal/recibir-data.pipe';
import { AcreedorPipe } from './acreedor/acreedor.pipe';



@NgModule({
  declarations: [CuentasPipe, RecibirDataPipe, AcreedorPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CuentasPipe, RecibirDataPipe, AcreedorPipe
  ]
})
export class PipesModule { }
