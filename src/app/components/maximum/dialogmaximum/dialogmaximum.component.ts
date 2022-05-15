import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MaximumI } from 'src/app/models/maximum/maximum';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { MaximumService } from 'src/app/services/maximum/maximum.service';
import { DialogcreditmaximumComponent } from '../dialogcreditmaximum/dialogcreditmaximum.component';

@Component({
  selector: 'app-dialogmaximum',
  templateUrl: './dialogmaximum.component.html',
  styleUrls: ['./dialogmaximum.component.css']
})
export class DialogmaximumComponent implements OnInit, AfterContentInit {
  token: any = ''; //variable para el token
  cuentasContables: any[] =[]; //arreglo para almacenar las cuentas
  valorEncontradoCuenta: any[]= []; //utilziar para mostrar
  valorNivel1: string = '';
  valorNivel2: string = '';
  valorNivel3: string = '';

  fechaRegistrar: string = '';

  guardarValoresArreglo: any[] = [];

  valoresDeCuentas: any = {};
  id_anexo: any;

  displayColumn: string[] = ['codigo', 'descripcion', 'nombre', 'acciones'];

  displayColumnBusqueda: string[] = ['codigo', 'nombre', 'cuentas', 'acciones'];
  dataSourceBusqueda: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any>;

  buscar: any = '';

  cuentasContablesArre: any[] = [];

  mostrarArreglo: any[] = [];
  cuentasValorD: string = '';
  valorCuentasC: string = '';

  forma: FormGroup;
  nuevaCuenta: FormControl;

  constructor(
    private _dialog: MatDialog,
    private _maximum: MaximumService,
    private _cookie: CookieService,
    private _toastr: ToastrService,
    private _fb: FormBuilder
  ) { 
    
    this.token = this._cookie.get('token');


  }

  

  ngOnInit(): void {
    /* this.listaItems = [];
    this.listaempresas = []; */
    this.crearFormulario();

  }

  ngAfterContentInit(): void {
    // this.getFactura();
    this.traerCuentas();
    
  }

  get cuentasArregloForm(){
    return this.forma.get('cuentas') as FormArray;
  }

  // funcion para crear el formulario
  crearFormulario(){
    this.forma = this._fb.group({
      cuentas: this._fb.array([])
    });

    this.nuevaCuenta = this._fb.control('', Validators.required);
  }


  traerCuentas(){
    this._maximum.getCuentasContables(this.token)
    .subscribe((resp)=>{
      console.log(resp);
      this.cuentasContables = resp.data;
      console.log(this.cuentasContables);
      
    });
  }

  // funcion para mostrar los datos filtrando en el arreglo
  filtroNiveles(evento: any, nivel: string){
    console.log(evento.target.value, nivel);
    // let nivel1: string = evento.target.value;
    
    if(nivel === 'nivel1'){
      console.log('entra en nivel 1');
      this.valorNivel1 = evento.target.value;
      if(this.valorNivel2.length != 0){
        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2);
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);
      }else if(this.valorNivel3.length !=0){
        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2 && data.nivel_3 == this.valorNivel3);
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);
      }
      else{
        if(this.valorNivel1.length == 0){
          this.valorEncontradoCuenta = [];
        }else{
          this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1);
          this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);
        }

      }
      // this.cuentasContables = this.cuentasContables.filter( data => parseInt(data.nivel_1) == parseInt(nivel) );
      // console.log(this.valorEncontradoCuenta);
    }else if(nivel === 'nivel2'){

      console.log('borrado ', this.valorNivel1);
      
      this.valorNivel2 = evento.target.value;
      if(this.valorNivel2.length == 0){

        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 );
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);
      }else if(this.valorNivel3.length != 0){
        
        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2 && data.nivel_3 == this.valorNivel3);
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);
      }else{
        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1  && data.nivel_2 == this.valorNivel2);
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);

      }
    }else if(nivel === 'nivel3'){

      this.valorNivel3 = evento.target.value;
      if(this.valorNivel1.length != 0 && this.valorNivel2.length !=0 && this.valorNivel3.length !=0){
        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2 && data.nivel_3 == this.valorNivel3);
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);

      }
      else if(this.valorNivel3.length == 0){
        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2);
        
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);

      }else{

        // this.valorNivel3 = evento.target.value;
        this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2 );
        this.dataSource = new MatTableDataSource(this.valorEncontradoCuenta);
      }

      
    }

    console.log(this.valorEncontradoCuenta);
    console.log(this.valorNivel1, this.valorNivel2, this.valorNivel3);
    

    
  }

  cambioValor(){
    console.log('presiona enter', this.buscar);
    
    // let arregloTmp: any[] = [];
    this.mostrarArreglo = [];
    this.guardarValoresArreglo = [];
    this._maximum.getCuentasByText(this.buscar.toUpperCase())
    .subscribe((resp) =>{
      console.log(resp);
      if(resp.data.length > 0){
        for(let f of resp.data){

          this._maximum.getCuentasByAnexos(f.id_grupo_anexos)
          .subscribe((respFor) =>{
            console.log(respFor);
            f.anexos = respFor.data;
            for(let j = 0; j < respFor.data.length; j++){
              this._maximum.getCuentasByCuentas(f.anexos[j].id_anexos)
              .subscribe((respCuentas) =>{
                console.log(respCuentas);
                f.anexos[j].cuentas = respCuentas.data
                
              })
            }
            // console.log(f);
            
          });
          console.log(f);
          this.mostrarArreglo.push(f);
          console.log(this.mostrarArreglo);
          this.dataSourceBusqueda = new MatTableDataSource(this.mostrarArreglo);
          
        }

      }


      console.log(this.mostrarArreglo);
      
      
      
    });
    
  }

  guardarValor(cuenta: any, item: any, valor: any){
    console.log('D',cuenta, item, valor.value);
    console.log(cuenta);
    

    // cuenta.valor = valor.value;
    /* let recargarArreglo = {
      ...item,
      cuentas: [cuenta]
    } */
    

    
    this._maximum.updateValor(valor.value, cuenta.id_cuentas)
    .subscribe((resp) =>{
      console.log(resp);
      if(resp.data){
        this._maximum.insertFechaCuenta(item.grupos.id_anexos, this.fechaRegistrar)
        .subscribe((resp) =>{
          console.log(resp);
          
        })
      }
      
    });
    
  }

  guardarValorC(cuenta:any, item: any, valor: any){
    console.log('C',cuenta,item, valor.value);

    this._maximum.updateValor(valor.value, cuenta.id_cuentas)
    .subscribe((resp) =>{
      console.log(resp);
      
    })
    
  }

  seleccionarCuenta(cod: any, tipo: any, grupos: any){
    // console.log(item);
    console.log(grupos);

    // let encontrado = item.find(v)
    this.guardarValoresArreglo = [];
    this.cuentasArregloForm.clear();
    
    this.guardarValoresArreglo.push({cod, tipo, grupos});
    
    for(let i = 0; i < grupos.cuentas.length; i++){
      this.cuentasArregloForm.push(this._fb.control(this.nuevaCuenta.value, Validators.required));
    }
    this.valoresDeCuentas = grupos;
    
    console.log(this.guardarValoresArreglo);
    console.log(this.cuentasArregloForm);
    console.log(this.valoresDeCuentas);
    
    
  }

  guardarAsiento(){
    // console.log(this.valorCuentasC, this.cuentasValorD);
    console.log(this.forma.get('cuentas').value);
    console.log(this.valoresDeCuentas);
    
    if(this.fechaRegistrar.length > 0){
      this._maximum.insertFechaCuenta(this.id_anexo, this.fechaRegistrar)
      .subscribe((resp)=>{
        console.log(resp);
        for(let i = 0; i < this.forma.get('cuentas').value.length; i++){
          let id_cuenta = this.valoresDeCuentas.cuentas[i]?.id_cuentas;
          this._maximum.updateValor(this.forma.get('cuentas').value[i], id_cuenta)
          .subscribe((resp) =>{
            console.log(resp);
            
          });
          
        }
        this.cuentasArregloForm.clear();
        this.valoresDeCuentas = {};
        this.mostrarArreglo = [];
        this.fechaRegistrar = '';
        this.guardarValoresArreglo = [];

      });
      
      // console.log(valores);
      
      
        
      

    }
    
    
    


    
    
  }


  cambioDeFecha(item: any, item2: any){
    this.fechaRegistrar = '';
    this.fechaRegistrar = item.target.value;
    this.id_anexo = item2.grupos.id_anexos;
    console.log(this.fechaRegistrar, item2.grupos.id_anexos);
    

    
    
  }
  

}