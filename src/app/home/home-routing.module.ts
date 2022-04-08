import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialognuevomedidorComponent } from '../components/clientes/dialognuevomedidor/dialognuevomedidor.component';
import { DialogcomprasComponent } from '../components/compras/dialogcompras/dialogcompras.component';
import { DialogcomprasregistradasComponent } from '../components/compras/dialogcomprasregistradas/dialogcomprasregistradas.component';
import { DialogcortesComponent } from '../components/emapa/dialogcortes/dialogcortes.component';
import { DialognotificacionesComponent } from '../components/emapa/dialognotificaciones/dialognotificaciones.component';
import { DialogreconexionesComponent } from '../components/emapa/dialogreconexiones/dialogreconexiones.component';
import { DialogempleadosComponent } from '../components/empleados/dialogempleados/dialogempleados.component';
import { SueldosComponent } from '../components/empleados/sueldos/sueldos.component';
import { SueldospagadosComponent } from '../components/empleados/sueldospagados/sueldospagados.component';
import { HomeComponent } from '../components/home/home.component';
import { DialoginventarioComponent } from '../components/inventario/dialoginventario/dialoginventario.component';
import { DialoginventarioasignadoComponent } from '../components/inventario/dialoginventarioasignado/dialoginventarioasignado.component';
import { InventarioesmeraldasComponent } from '../components/inventario/inventarioesmeraldas/inventarioesmeraldas.component';
import { DialogcatastrosComponent } from '../components/proyeccion/dialogcatastros/dialogcatastros.component';
import { DialogrendimientoproyectoComponent } from '../components/proyeccion/dialogrendimientoproyecto/dialogrendimientoproyecto.component';
import { DialogappfacturasComponent } from '../components/ventas/dialogappfacturas/dialogappfacturas.component';
import { DialogfacturaComponent } from '../components/ventas/dialogfactura/dialogfactura.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ComprasComponent } from './compras/compras.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmapaComponent } from './emapa/emapa.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FirmasComponent } from './firmas/firmas.component';
import { FondosComponent } from './fondos/fondos.component';
import { NotasComponent } from './notas/notas.component';
import { ProductosserviciosComponent } from './productosservicios/productosservicios.component';
import { ProyeccionComponent } from './proyeccion/proyeccion.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'proyeccion', component: ProyeccionComponent, children: [
      { path: 'calculoproyeccion', component: DialogrendimientoproyectoComponent},
      { path: 'georeferencia', component: DialogcatastrosComponent }
    ]},
    { path: 'productosservicios', component: ProductosserviciosComponent, children: [
      { path: 'inventario', component: DialoginventarioComponent},
      { path: 'inventarioasignado', component: DialoginventarioasignadoComponent },
      { path: 'inventarioesmeraldas', component: InventarioesmeraldasComponent}
    ]},
    { path: 'clientes', component: ClientesComponent, children: [
      { path: 'todosclientes', component: ClientesComponent},
      { path: 'clientemedidor', component: DialognuevomedidorComponent }
    ]},
    { path: 'empleados', component: EmpleadosComponent, children: [
      { path: 'todosempleados', component: DialogempleadosComponent},
      { path: 'sueldos', component: SueldosComponent },
      { path: 'sueldospagados', component: SueldospagadosComponent }
    ]},
    { path: 'ventas', component: VentasComponent, children: [
      { path: 'factura', component: DialogfacturaComponent},
      { path: 'facturas', component: DialogappfacturasComponent }
    ]},
    { path: 'compras', component: ComprasComponent, children: [
      { path: 'compra', component: DialogcomprasComponent},
      { path: 'comprasregistradas', component: DialogcomprasregistradasComponent }
    ]},
    { path: 'emapa', component: EmapaComponent, children: [
      { path: 'notificaciones', component: DialognotificacionesComponent},
      { path: 'cortes', component: DialogcortesComponent },
      { path: 'reconexiones', component: DialogreconexionesComponent }
    ] },
    { path: 'fondos', component: FondosComponent},
    { path: 'notas', component: NotasComponent },
    { path: 'firmas', component: FirmasComponent }

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }