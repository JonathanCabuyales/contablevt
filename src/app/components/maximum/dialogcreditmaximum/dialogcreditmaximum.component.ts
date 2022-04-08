import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CuentasLibroI } from 'src/app/models/cuentas/cuentas_contables';
import { MaximumItemI } from 'src/app/models/maximum/maximum';
import { CuentasContablesService } from 'src/app/services/cuentas/cuentas-contables.service';
import { MaximumService } from 'src/app/services/maximum/maximum.service';

export interface Movimientos{
  id_movimiento?: string,
  cuenta: string,
  movimiento_data: {
    monto: string,
    tipo_cuenta: string,
    detalle: string,
    debe_haber: string,

  }
  token?: string
}

@Component({
  selector: 'app-dialogcreditmaximum',
  templateUrl: './dialogcreditmaximum.component.html',
  styleUrls: ['./dialogcreditmaximum.component.css']
})
export class DialogcreditmaximumComponent implements OnInit {

  @Input() num_factura_padre: string;
  @Input() tipo_comprobante_padre: string;
  @Input() fecha_emision_padre: string;
  
  movimiento: Movimientos;

  @Output() 
  refrescar = new EventEmitter<any>();

  
  cambioCuentaPrincipalBool: boolean = false;
  item: MaximumItemI;
  cuentasItems: any = [];

  cuentas_tipo: any = [];

  formularioLibro: CuentasLibroI;
  token: any;
  id_libro: string = '';
  agregarCuentas: any[] = [];
  lastIndex: number = 0;
  indexCuentaPrincipal: number = 0;
  tipos = ['Debe', 'Haber'];


  temporalMaximum: any []= [];

  lastIndexAsiento: number = 0;

  //variable para cargar cuentas principales
  cargarPrincipales: any[] = [];
  
  //variable para mostrar los libros

  cargarLibros: any [] = [];
  mostrarOpcionesPrincipales: any[] = [];
  constructor(
    private matDialog: MatDialog,
    private _cuentas: CuentasContablesService,
    private _maximum: MaximumService,
    private _cookie: CookieService,
    private _fb: FormBuilder
  ) {
    this.token = this._cookie.get('token');
    this.movimiento ={
      cuenta: '#',
      movimiento_data: {
        debe_haber: '',
        detalle: '',
        monto: '',
        tipo_cuenta: '',
      }
    }
    /* this.item = {
      cantidad: '',
      categoria: '',
      codigobarras: '',
      descripcion: '',
      descuento: '',
      fechaelaboracion: '',
      fechavencimiento: '',
      ivaSelccion:'',
      nombre_poser: '',
      numerolote: '',
      precio: ''
    }

    this.formularioLibro = {
      codigo: '',
      cuenta_libro: '',
      debe_haber: '',
      detalle: '',
      fecha_emision: '',
      nom_factura: '',
      parcial: '',
      tipo_compobante: '',
      valor: '',
      cuenta_num: ''
    } */
    
    // this.formularioMovimientos();
   }

  ngOnInit(): void {

    this.cargarCuentas();
    // this.cargarCuentasPrincipales();
    this.traerLibro();

    
  }

  cargarCuentas(){
    this._cuentas.getCuentas()
    .subscribe((resp) =>{
      console.log(resp.data);
      
      this.cuentas_tipo = resp.data;
    });
  }

  grabarItem(){

  }

  cargarCuentasPrincipales(){
    this.mostrarOpcionesPrincipales = [];
    this._maximum.cargarCuentasPrincipales(this.token)
    .subscribe((resp) =>{
      console.log(resp.data);
      this.mostrarOpcionesPrincipales = (resp.data);
      
    });

  }

  

  crearFormulario(){
    
  }


  formularioMovimientos(): FormGroup {
    return this._fb.group({
      cuenta: ['']
    });  
  }

  agregarMovimiento(){
    this.cuentasItems.push(
      {
        debe_haber: '',
        detalle: '',
        monto: '',
        tipo_cuenta: '',
      }
    );
  }
  
  
  addItem(){
    /* let nuevoInsertCuenta = {
      cuentaPrincipal: this.formularioLibro.cuenta_num,
      fecha: this.formularioLibro.fecha_emision,
      num_factura: this.formularioLibro.nom_factura,
      data: [{cuenta: this.formularioLibro.cuenta_libro,
        detalle: this.formularioLibro.detalle,
        parcial: this.formularioLibro.parcial,
        valor: this.formularioLibro.valor,
        asiento: this.formularioLibro.debe_haber}]
    }

    if(!this.cambioCuentaPrincipalBool){
      if(this.agregarCuentas.length === 0){
        this.agregarCuentas[0] = nuevoInsertCuenta
      }else{
        this.lastIndex = nuevoInsertCuenta.data.length;
        let ultimos_valores = nuevoInsertCuenta.data[nuevoInsertCuenta.data.length-1];
        nuevoInsertCuenta.data[this.lastIndex] =  [{
          cuenta: this.formularioLibro.cuenta_libro,
          detalle: this.formularioLibro.detalle,
          parcial: this.formularioLibro.parcial,
          valor: this.formularioLibro.valor,
          asiento: this.formularioLibro.debe_haber]
        }
      }
    }

    console.log(nuevoInsertCuenta); */
    
    
    this.formularioLibro.tipo_compobante = this.tipo_comprobante_padre;
    this.formularioLibro.nom_factura = this.num_factura_padre;
    this.formularioLibro.fecha_emision = this.fecha_emision_padre;
    this.formularioLibro.codigo = this.id_libro;
    console.log(this.formularioLibro);
    this.formularioLibro.token = this.token;

    

    this._maximum.insertFacturaMaximum(this.formularioLibro)
    .subscribe((resp) => {
      console.log(resp);

      if(resp.data){
        let formulariom_factura = {
          id_cuenta_principal: this.formularioLibro.cuenta_num,
          valor_cuenta: this.formularioLibro.cuenta_num,
          id_factura: resp.id_last,
          token: this.token
        }
        
        this._maximum.insertarRelacion(formulariom_factura).subscribe((resp) =>{
          console.log(resp);
          
        })
      }

      this.refrescar.emit(true);
      
    })

  }

  cambioCuentaPrincipal(){
    this._maximum.getPrincipalesCuentas(this.token)
    .subscribe((resp) =>{
      // console.log(resp.data[0].nro_asiento);
      
      if(resp.data?.length === 0){
        this.mostrarOpcionesPrincipales = [];
        this.mostrarOpcionesPrincipales.push({nro_asiento: resp.data.length + 1});
        // this.indexCuentaPrincipal = resp.data[0].valor_cuenta;
        this.indexCuentaPrincipal = resp.data.length;
      }else{
        this.mostrarOpcionesPrincipales = [];
        let index = parseInt(resp.data[0].nro_asiento);
        this.indexCuentaPrincipal = index;
        for(let i = 0; i <= index; i++){
          console.log('entra for');
          
          this.mostrarOpcionesPrincipales.push({nro_asiento: i + 1});
          
        }
      }
      console.log(this.mostrarOpcionesPrincipales);
      /* this._maximum.verifciarDatosJWT(this.token)
      .subscribe((respUser) =>{
        console.log(respUser);

        this._maximum.insertarRelacion({id_usuario: respUser.data.data.id, nro_asiento: this.indexCuentaPrincipal + 1, fecha: this.fecha_emision_padre, token: this.token})
        .subscribe((respAsiento: any) =>{
          console.log(respAsiento);
          
        })
        
      }); */
      
      
    });
    /* this.cambioCuentaPrincipalBool = true;
    this.mostrarOpcionesPrincipales = [];
    console.log(this.indexCuentaPrincipal);
    if(this.indexCuentaPrincipal === 0){
      this.mostrarOpcionesPrincipales.push(this.indexCuentaPrincipal + 1);
    }else{
      for(let i = 0; i <= this.indexCuentaPrincipal; i++){
        this.mostrarOpcionesPrincipales.push( i + 1);
      }
    } */

    
    // console.log(this.mostrarOpcionesPrincipales);
    console.log(this.tipo_comprobante_padre, this.num_factura_padre, this.fecha_emision_padre);
    
    
    
  }

  enviar(){

    let data = [{cuenta: this.movimiento.cuenta, fecha: this.fecha_emision_padre, data: [...this.cuentasItems]}];
    
    let enviarBD = {
      id_asiento: this.movimiento.cuenta,
      num_factura: this.num_factura_padre,
      tipo_comprobante: this.tipo_comprobante_padre,
      detalle: JSON.stringify(data),
      token: this.token
      
    }

    this._maximum.getFacturasMaximum(this.token)
    .subscribe((resp) =>{
      console.log(resp);

      for(let i = 0; i <resp.data?.length; i++){
        if(this.movimiento.cuenta === resp.data[i].id_asiento){
          console.log(JSON.parse(resp.data[i].detalle));
          let jsonAgregar: any[] = JSON.parse(resp.data[i].detalle);
          
          this.temporalMaximum.push({ data: [...this.cuentasItems]})
          

          console.log(this.temporalMaximum);
          
          
        }
        
      }
      
    });

    console.log(enviarBD);
    
  

    /* this._maximum.insertFacturaMaximum(enviarBD)
    .subscribe((respDB) =>{
      console.log(respDB);
      
    }, (err) =>{
      console.log(err);
      
    }); */
    /* console.log(this.movimiento.cuenta);
    console.log(data);
    
    
    console.log(this.cuentasItems); */
    
  }


  //funcion para traer los datos del libro
  traerLibro(){
    this.mostrarOpcionesPrincipales = [];
    this._maximum.getFacturasMaximum(this.token)
    .subscribe((resp) =>{
      console.log(resp);
    // this.mostrarOpcionesPrincipales.push(resp.data);
      this.cargarLibros = resp.data;
      this.refrescar.emit(this.cargarLibros);
    })
  }


  //funcion para traer la data que existe en el movimiento
  /* getMovimiento(){
    this._maximum.getMovimiento(this.token)
    .subscribe((resp) =>{
      console.log(resp);
      
    })
  } */

  

  

}
