// import { IfStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { parse } from 'path';
import { DepreciacionI } from 'src/app/models/depreciacion/depreciacion';
import { DepreciacionService } from 'src/app/services/depreciaciones/depreciacion.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

import * as moment from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogdepreciacionComponent } from '../dialogdepreciacion/dialogdepreciacion.component';

@Component({
  selector: 'app-dialogcreditdepreciacion',
  templateUrl: './dialogcreditdepreciacion.component.html',
  styleUrls: ['./dialogcreditdepreciacion.component.css']
})
export class DialogcreditdepreciacionComponent implements OnInit {

  refrescarTable: DialogdepreciacionComponent;

  depreciacion: DepreciacionI;
  token: string = '';
  valor_residual: any;
  valor_depreciacion: any;
  depr: any;
  cuentas: any[] = [];
  depreciacionArr: any[] = [];
  desc_depreciacion: string = '';
  constructor(
    private _cookie: CookieService,
    private _login: LoginService,
    private _toast: ToastrService,
    private _depr: DepreciacionService,
    private _dialog: MatDialogRef<DialogcreditdepreciacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');

    this.depreciacion = {
      id_usuario: '',
      descripcion: '',
      fecha_compra: '',
      valor_inicial:'',
      id_cuentas:'',
      depreciacion: '',
    }
    this.mostrarContables();

    console.log(this.data);
    if(this.data.actualizar){
      this.depreciacion.fecha_compra = this.data.elemento.fecha_compra;
      this.depreciacion.valor_inicial = this.data.elemento.valor_inicial;
      this.depreciacion.id_cuentas = this.data.elemento.id_cuentas;
    }else{
      return;
    }
    
    
  }


  
  guardar(){
    // console.log(this.depreciacion.id_cuentas);
    // console.log(anios_dep);
    // console.log(mes, anio);
    // console.log(new Date(anio, mes, 0).getDate());
    // console.log(resta);
    // this.depreciacion.valor_anual = multiplicar_valor.toString();
    // this.depreciacion.valor_inicio_depreciacion = mes_siguiente.getTime().toString();
    // this.depreciacion.anio_depreciacion = moment().toDate().getFullYear().toString();
    // this.depreciacion.resta_valor_anual = (parseInt(this.depreciacion.valor_inicial) - multiplicar_valor).toString();
    // let mesTime = new Date(parseInt(this.depreciacion.valor_inicio_depreciacion));
    
      if(this.depreciacion.valor_inicial.length == 0){
      this._toast.warning('El valor inicial es obligatorio', 'Error');
    }else if(this.depreciacion.fecha_compra.length == 0){
      this._toast.warning('Fecha de compra es obligatorio', 'Error');
    }else if(this.depreciacion.id_cuentas.length == 0){
      
      this._toast.warning('La categoria es obligatoria', 'Error');
    }else{

      
      //variable para encontrar en el arreglo los valores
      let anios_dep = this.cuentas.find(p => p.id_cuentas === this.depreciacion.id_cuentas);

      //varibles para obtener el mes y el anio dependiendo de la fecha seleccionada
      let mes = moment(this.depreciacion.fecha_compra).toDate().getMonth() + 1  ;
      let anio = moment(this.depreciacion.fecha_compra).toDate().getFullYear();
      
      // obtener el ultima dia del mes para sumarle y acceder al mes siguiente.
      let ultimo_dia_mes = new Date(anio, mes, 0).getDate();
      let agregar_mes = moment(this.depreciacion.fecha_compra).add(1, 'month').toDate();
      let mes_siguiente = new Date(agregar_mes.getFullYear(), agregar_mes.getMonth(), 1);
      let resta = ultimo_dia_mes - moment().toDate().getDate();
  
      console.log('mes siguiente', mes_siguiente.getMonth());
      
      
      
      let restar_meses = 11 - mes_siguiente.getMonth();
      console.log('restar meses cuantos: ', restar_meses);
      

      //metodo para obtener al usuario que digito la depreciacion
      this._login.getuserdata(this.token)
      .subscribe(resp =>{
        this.valor_residual = (parseFloat(this.depreciacion.valor_inicial) * 0.10);
        console.table(this.valor_residual, anios_dep.anios);
        //aplicacion de la formula de la depreciacion.
        this.valor_depreciacion = (parseFloat(this.depreciacion.valor_inicial) - parseFloat(this.valor_residual))/parseInt(anios_dep.anios);
        let valor_anual = this.valor_depreciacion/12;
        //se multiplica el valor del bien depreciado por lo meses faltantes en una anio
        let multiplicar_valor = valor_anual*(restar_meses+1);
        //asignar los valores de la variables del modelo
        this.depreciacion.id_usuario = resp.data.id;
        this.depreciacion.descripcion = anios_dep.descripcion;
        
        //obligacion enviar el token
        this.depreciacion.token = this.token;
        
        
        let valor_restante = parseInt(this.depreciacion.valor_inicial) - multiplicar_valor;

        // let anios_siguientes = moment().add(parseInt(anios_dep.anios), 'years').toDate().getFullYear();
        let depreciacionObj = {};
        console.log(anios_dep.anios);
        //recorro los anios que tiene un activo para depreciarse y los voy agregando al objeto y luego al array
        for (let i = 0; i < parseInt(anios_dep.anios); i++) {
          let valor_residual_cambia: any;
          if(i + 1 < 2){
            depreciacionObj = {
                anio: i + 1,
                valor_restante,
                anio_dep: moment().toDate().getFullYear(),
                valor_anual: multiplicar_valor.toFixed(2)
            }
            this.depreciacionArr[i] = depreciacionObj;

          }else{
            valor_residual_cambia = valor_restante * (0.10);
            valor_restante = valor_restante - valor_residual_cambia;

            console.log(valor_restante);
            depreciacionObj = {
              anio: i + 1,
              valor_restante,
              anio_dep: moment().toDate().getFullYear() + i,
              valor_anual: this.valor_depreciacion.toFixed(2)
            }
            this.depreciacionArr[i] = depreciacionObj;
            

          }
          
        }
        this.depreciacion.depreciacion = JSON.stringify(this.depreciacionArr); 
        
        console.log(this.depreciacion);
        
        this._depr.insertDepreciacion(this.depreciacion)
        .subscribe((resp) => {
          console.log(resp);

          this._toast.success('Registro guardado correctamente', 'Depreciacion');
          this._dialog.close();
          
        });
        
        
        
        
      });
    }

    
    
  }


  //funcion para actualizar la depreciacion
  actualizar(){
    if(this.depreciacion.valor_inicial.length == 0){
      this._toast.warning('El valor inicial es obligatorio', 'Error');
    }else if(this.depreciacion.fecha_compra.length == 0){
      this._toast.warning('Fecha de compra es obligatorio', 'Error');
    }else if(this.depreciacion.id_cuentas.length == 0){
      
      this._toast.warning('La categoria es obligatoria', 'Error');
    }else{

      
      //variable para encontrar en el arreglo los valores
      let anios_dep = this.cuentas.find(p => p.id_cuentas === this.depreciacion.id_cuentas);

      //varibles para obtener el mes y el anio dependiendo de la fecha seleccionada
      let mes = moment(this.depreciacion.fecha_compra).toDate().getMonth() + 1  ;
      let anio = moment(this.depreciacion.fecha_compra).toDate().getFullYear();
      
      // obtener el ultima dia del mes para sumarle y acceder al mes siguiente.
      let ultimo_dia_mes = new Date(anio, mes, 0).getDate();
      let agregar_mes = moment(this.depreciacion.fecha_compra).add(1, 'month').toDate();
      let mes_siguiente = new Date(agregar_mes.getFullYear(), agregar_mes.getMonth(), 1);
      let resta = ultimo_dia_mes - moment().toDate().getDate();
  
      console.log('mes siguiente', mes_siguiente.getMonth());
      
      
      
      let restar_meses = 11 - mes_siguiente.getMonth();
      console.log('restar meses cuantos: ', restar_meses);
      

      //metodo para obtener al usuario que digito la depreciacion
      this._login.getuserdata(this.token)
      .subscribe(resp =>{
        this.valor_residual = (parseFloat(this.depreciacion.valor_inicial) * 0.10);
        console.table(this.valor_residual, anios_dep.anios);
        //aplicacion de la formula de la depreciacion.
        this.valor_depreciacion = (parseFloat(this.depreciacion.valor_inicial) - parseFloat(this.valor_residual))/parseInt(anios_dep.anios);
        let valor_anual = this.valor_depreciacion/12;
        //se multiplica el valor del bien depreciado por lo meses faltantes en una anio
        let multiplicar_valor = valor_anual*(restar_meses+1);
        //asignar los valores de la variables del modelo
        this.depreciacion.id_usuario = resp.data.id;
        this.depreciacion.descripcion = anios_dep.descripcion;
        
        //obligacion enviar el token
        this.depreciacion.token = this.token;
        
        
        let valor_restante = parseInt(this.depreciacion.valor_inicial) - multiplicar_valor;

        // let anios_siguientes = moment().add(parseInt(anios_dep.anios), 'years').toDate().getFullYear();
        let depreciacionObj = {};
        console.log(anios_dep.anios);
        //recorro los anios que tiene un activo para depreciarse y los voy agregando al objeto y luego al array
        for (let i = 0; i < parseInt(anios_dep.anios); i++) {
          let valor_residual_cambia: any;
          if(i + 1 < 2){
            depreciacionObj = {
                anio: i + 1,
                valor_restante,
                anio_dep: moment().toDate().getFullYear(),
                valor_anual: multiplicar_valor.toFixed(2)
            }
            this.depreciacionArr[i] = depreciacionObj;

          }else{
            valor_residual_cambia = valor_restante * (0.10);
            valor_restante = valor_restante - valor_residual_cambia;

            console.log(valor_restante);
            depreciacionObj = {
              anio: i + 1,
              valor_restante,
              anio_dep: moment().toDate().getFullYear() + i,
              valor_anual: this.valor_depreciacion.toFixed(2)
            }
            this.depreciacionArr[i] = depreciacionObj;
            

          }
          
        }
        this.depreciacion.depreciacion = JSON.stringify(this.depreciacionArr); 
        this.depreciacion.id_dep = this.data.elemento.id_dep;
        console.log(this.depreciacion);
        
        this._depr.updateDepreciacion(this.depreciacion)
        .subscribe((resp) => {
          console.log(resp);

          this._toast.success('Registro guardado correctamente', 'Depreciacion');
          this._dialog.close();
          
        });
        
        
        
        
      });
    }
  }


  mostrarContables(){

    console.log(this.token);
    
    this._depr.getCuentasContables(this.token)
    .subscribe(resp => {
      // console.log(resp);
      
      // console.log(resp);

      this.cuentas.push(...resp.data);
      
      // this.cuentas = (resp.data);

      // console.log(this.cuentas);
      
      
    });
  }

  

}
