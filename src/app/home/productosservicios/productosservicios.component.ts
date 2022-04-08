import { Component, OnInit, ViewChild } from '@angular/core';
import { DialoginventarioComponent } from 'src/app/components/inventario/dialoginventario/dialoginventario.component';
import { DialoginventarioasignadoComponent } from 'src/app/components/inventario/dialoginventarioasignado/dialoginventarioasignado.component';
import { DialogproveedoresComponent } from 'src/app/components/inventario/dialogproveedores/dialogproveedores.component';
import { InventarioesmeraldasComponent } from 'src/app/components/inventario/inventarioesmeraldas/inventarioesmeraldas.component';

@Component({
  selector: 'app-productosservicios',
  templateUrl: './productosservicios.component.html',
  styleUrls: ['./productosservicios.component.css']
})

export class ProductosserviciosComponent implements OnInit {

  
  @ViewChild('proveedores', { static: false }) proveedores: DialogproveedoresComponent;
  @ViewChild('inventarionuevo', { static: false }) inventarionuevo: DialoginventarioComponent;
  @ViewChild('inventarioasignado', { static: false }) inventarioasignado: DialoginventarioasignadoComponent;
  @ViewChild('iventarioesmeraldas', {static: false}) iventarioesmeraldas: InventarioesmeraldasComponent;

  active = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(e) {
    if(e == 0){
      this.proveedores.ngOnInit();
    }else if(e == 1){
      this.inventarionuevo.ngOnInit();
    }else if(e == 2){
      this.inventarioasignado.ngOnInit();
    }else if (e == 3){
      this.iventarioesmeraldas.ngOnInit();
    }

  }

}