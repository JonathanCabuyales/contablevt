import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CuentasLibroI } from 'src/app/models/cuentas/cuentas_contables';
import { MaximumItemI } from 'src/app/models/maximum/maximum';
import { CuentasContablesService } from 'src/app/services/cuentas/cuentas-contables.service';
import { MaximumService } from 'src/app/services/maximum/maximum.service';
import { DialogcreatecuentasComponent } from '../dialogcreatecuentas/dialogcreatecuentas.component';

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
  almacenarIds: any[]=[];

  @Output() 
  refrescar = new EventEmitter<any>();

  @Output()
  num_factura = new EventEmitter<any>();
  tipo_comprobante = new EventEmitter<any>();
  fecha = new EventEmitter<any>();

  @Output()
  botonLibroE = new EventEmitter<any>();

  @Output()
  id_movimiento = new EventEmitter<any>();

  
  cambioCuentaPrincipalBool: boolean = false;
  item: MaximumItemI;
  cuentasItems: any[] = [];

  cuentas_tipo: any = [];

  formularioLibro: CuentasLibroI;
  token: any;
  id_libro: string = '';
  agregarCuentas: any[] = [];
  lastIndex: number = 0;
  indexCuentaPrincipal: number = 0;
  tipos = ['Debe', 'Haber', 'Parcial'];
  temporalMaximum: any []= [];

  lastIndexAsiento: number = 0;
  //variable para activar el boton de registrar el libro
  activarBotonLibro: boolean = false;

  //variable para cargar cuentas principales
  cargarPrincipales: any[] = [];
  
  //variable para mostrar los libros
  cargarLibros: any [] = [];
  mostrarOpcionesPrincipales: any[] = [];

  //variable para enviar a la base de datos
  enviarBD: any = {};

  tmpIva: any[] = [];
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
    // this.traerLibro();
    this.cargarCuentasPrincipales();
    
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
        tipo_cuenta: '#',
        iva: '#'
      }
    );

    this.tmpIva.push({
      montoIva: ''
    });
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
      console.log(resp.data);
      
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
      this._maximum.verifciarDatosJWT(this.token)
      .subscribe((respUser) =>{
        console.log(respUser);

        this._maximum.insertarRelacion({id_usuario: respUser.data.data.id, nro_asiento: this.indexCuentaPrincipal + 1, fecha: this.fecha_emision_padre, token: this.token})
        .subscribe((respAsiento: any) =>{
          console.log(respAsiento);
          
        })
        
      });
      
      
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

  enviar(i: any){
    let tmpDataLibro: any[] = [];
    
    

    console.log(this.cuentasItems);

    
    
    console.log(this.tmpIva);
    
    
    this._maximum.getFacturaIndividual(this.token, this.movimiento.cuenta)
    .subscribe((resp:any) =>{
      for(let i = 0; i < this.cuentasItems.length; i++){
    
        if(this.cuentasItems[i].iva === 'iva12'){
          console.log('entrra a iva 12');
          
          this.tmpIva[i].montoIva = (parseFloat(this.cuentasItems[i].monto) * 0.12).toFixed(2);
  
        }else{

          console.log('entra a iva 0');
          
          this.tmpIva[i].montoIva = (parseFloat(this.cuentasItems[i].monto)).toFixed(2);
        }
      }
      
      console.log(resp);
      if(resp.data.length > 0 ){

        for(let update of resp.data){
          if(update.id_asiento === this.movimiento.cuenta && update.registrado === '0'){
            console.log('existe', update);
            let cambiarJson = JSON.parse(update.detalle);
            console.log(update); 
            console.log(update.detalle); 
            for(let dataJson of cambiarJson){
              console.log(dataJson);
              for(let i = 0; i < this.cuentasItems.length; i++){
                this.cuentasItems[i].monto = this.tmpIva[i].montoIva;
              }
              tmpDataLibro = [...dataJson.data, ...this.cuentasItems];
              let temporalAgregar = [{
                ...dataJson,
                data: tmpDataLibro
              }]
              this.enviarBD = {
                id_asiento: this.movimiento.cuenta,
                num_factura: this.num_factura_padre,
                tipo_comprobante: this.tipo_comprobante_padre,
                detalle: JSON.stringify(temporalAgregar),
                token: this.token
              }
            }
          }
          
        }

        

        console.log(this.enviarBD);
        
        this._maximum.updateLibro(this.enviarBD)
        .subscribe((respUpdated) =>{
          console.log(respUpdated);
          this.traerLibro();
          this.botonLibroE.emit(true);
          this.cargarCuentasPrincipales();
          this.cuentasItems = [];
          
        })
      }else{
        for(let i=0; i< this.cuentasItems.length; i++){
          this.cuentasItems[i].monto = this.tmpIva[i].montoIva;
        }
        let data = [{cuenta: this.movimiento.cuenta, fecha: this.fecha_emision_padre, data: [...this.cuentasItems]}];
        this.enviarBD = {
          id_asiento: this.movimiento.cuenta,
          num_factura: this.num_factura_padre,
          tipo_comprobante: this.tipo_comprobante_padre,
          detalle: JSON.stringify(data),
          token: this.token
        }
        this._maximum.insertFacturaMaximum(this.enviarBD)
        .subscribe((respCreated) =>{
          console.log(respCreated);
          this.traerLibro();
          this.botonLibroE.emit(true);
          this.cargarCuentasPrincipales();
          this.cuentasItems = [];
          
        })
        
      }

      console.log(tmpDataLibro);
      console.log(this.enviarBD);

      
      
      
    });


    
  

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
    /* this.mostrarOpcionesPrincipales = [];
    this._maximum.getFacturasMaximum(this.token)
    .subscribe((resp) =>{
      console.log(resp);
    // this.mostrarOpcionesPrincipales.push(resp.data);
      this.cargarLibros = resp.data;
      for(let i=0; i< resp.data.length; i++){
        this.almacenarIds[i] = (resp.data[i].id_movimiento);
      }
      
      this.refrescar.emit({libros: this.cargarLibros, ids: this.almacenarIds});
      // this.id_movimiento.emit();
    }) */
  }


  //funcion para traer la data que existe en el movimiento
  /* getMovimiento(){
    this._maximum.getMovimiento(this.token)
    .subscribe((resp) =>{
      console.log(resp);
      
    })
  } */

  //funcion para traer la tipo_factura, numero_comprobante y fecha
  traerFactura(evento: any){
    /* let id = evento.target.value;
    this._maximum.getFacturaIndividual(this.token, id).
    subscribe((resp) =>{
      console.log(resp);
      
      if(resp.data.length > 0){
        this.num_factura.emit({num_factura: resp.data[0].num_factura, tipo_comprobante: resp.data[0].tipo_comprobante, fecha: JSON.parse(resp.data[0].detalle)[0].fecha});
      }else{
        return;
      }

      
    }) */
    // console.log(evento.target.value);
    
  } 

  eliminar(i: any){
    console.log(i);
    this.cuentasItems.splice(i, 1);
    
  }


  //funcion para agregar las cuentas de libro diario
  agregarCuenta(){
    const ref = this.matDialog.open(DialogcreatecuentasComponent, {
      width: '50vw'
    });
    ref.afterClosed().subscribe((res) =>{
      console.log(res);
      this.cargarCuentas();
    });
  }


  //funcion para agregar una nueva session
  /**
   * Limpiar tipo de comprobante,
   * num de comprobante,
   * fecha comprobante
   * **/
   agregarSeccion(){
     console.log('agregar nueva seccion');
     
   }

  

  

}
