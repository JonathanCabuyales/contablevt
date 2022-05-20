import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LameService } from 'src/app/services/lame/lame.service';



@Component({
  selector: 'app-dialogvtcompras',
  templateUrl: './dialogvtcompras.component.html',
  styleUrls: ['./dialogvtcompras.component.css']
})
export class DialogvtcomprasComponent implements OnInit {

  @Input() empresa: string = '';

  subtotalBlur = document.getElementById('subtotal');


  tipo: string = '0';
  desc: string = '';
  subt: string = '';
  des: string = '';
  iva: string = '';
  total: string = '';

  // egreso
  facturaEgreso: string = '';
  fechaFacturaEgreso: string = '';
  autorizacionFacturaEgreso: string = '';
  subtotalEgreso: string = '';
  ivaEgreso: string = '#';
  ivavalorEgreso: string = '';
  totalEgreso: string = '';
  descripcionEgreso: string = ''
  descIva: string = '';
  fechaAutorizazionEgreso: string = '';

  constructor(
    private _lame: LameService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  cambioValor(){
    console.log(this.tipo);
    
  }


  registrarIngresos(){
    console.log(this.tipo);
    console.log(this.desc);
    console.log(this.subt);
    console.log(this.iva);
    console.log(this.total);
    console.log(this.des);
    let enviar = {
      tipo: 'Ingresos',
      descripcion: this.desc,
      descuento: this.des,
      iva: '12',
      valor_iva: this.iva,
      subtotal: this.subt,
      empresa: this.empresa,
      total: this.total

    }

    console.log(enviar);
    

    this.insertLame(enviar);
    
  }


  calcularIVA(evento: any){
    // console.log(evento);
    this.subt = evento;
    if(this.subt == null){
      this.total = '';
      this.iva = '';
      this.des = '';
      return;
    }
    this.iva = (parseFloat(this.subt)*0.12).toFixed(2);

    let descuento = (this.des.length == 0) ? parseFloat('0') : parseFloat(this.des);

    this.total = (parseFloat(this.subt) + parseFloat(this.iva) - descuento).toFixed(2);

  }

  calcularDes(evento: any){
    // console.log(evento);
    this.des = evento;
    
    if(this.des == null){
      let vacioDes = (this.des == null) ? parseFloat('0') : parseFloat(this.des);
      
      this.total = (parseFloat(this.subt) + parseFloat(this.iva) - vacioDes ).toFixed(2);
    }else{

      // let vacioDes = (this.des.length === 0) ? parseFloat('0') : parseFloat(this.des);
      console.log(this.total);
      
      let calcularTotal = (parseFloat(this.subt) + parseFloat(this.iva) - parseFloat(this.des)).toFixed(2);
      
      this.total = calcularTotal;
    }
  }

  

  insertLame(enviar: any){
    this._lame.insertCompraLame(enviar)
    .subscribe((resp) =>{
      console.log(resp);

      this.desc = '',
      this.subt = '';
      this.des = '';
      this.iva='';
      this.total = '';

      this._toastr.success('Se ha guardado el regisro', 'Ingresos',{
        easing: 'ease-in',
        closeButton: true,
        progressAnimation: 'decreasing',
        progressBar: true,
        timeOut: 2000,
        easeTime: 500 
      });
      
    });
  }


  /* ----------------------------------------------------------------------------------------------- */
  // Egresos funciones
  cambioFacturaEgreso(evento: any){
    this.facturaEgreso = evento;
  }

  cambioFechaFactura(evento: any){
    this.fechaFacturaEgreso = evento;
  }

  autorizacionFactura(evento: any){
    this.autorizacionFacturaEgreso = evento;
  }

  cambioSubtotalFactura(evento: any){
    this.subtotalEgreso = evento;
    console.log(this.ivaEgreso);
    
    if(this.ivaEgreso != '#'){
      if(parseInt(this.ivaEgreso) == 0 || parseInt(this.ivaEgreso) == 150){
        this.ivavalorEgreso = '0';
        this.descIva = (parseInt(this.ivaEgreso) ? '0' : 'No objeto de iva');
        this.totalEgreso = (parseFloat(this.subtotalEgreso) + parseFloat(this.ivavalorEgreso)).toFixed(2);
      }else{
        this.descIva = '12';
        this.ivavalorEgreso = (parseFloat(this.subtotalEgreso) *0.12).toFixed(2);
        this.totalEgreso = (parseFloat(this.subtotalEgreso) + parseFloat(this.ivavalorEgreso)).toFixed(2);
      }
    }else{
      this.ivavalorEgreso = '0';
      this.totalEgreso = parseFloat(this.subtotalEgreso).toFixed(2);
    }
  }

  cambioIvaEgreso(evento: any){
    this.ivavalorEgreso = evento;
  }

  cambioTotalEgreso(evento: any){
    this.totalEgreso = evento;
  }

  cambioIvaFactura(evento: any){
    this.ivaEgreso = evento;
    console.log(this.ivaEgreso);
    if(parseInt(this.ivaEgreso) == 0 || parseInt(this.ivaEgreso) == 150){
      this.ivavalorEgreso = '0';
      this.descIva = (parseInt(this.ivaEgreso) ? '0' : 'No objeto de iva');
      this.totalEgreso = (parseFloat(this.subtotalEgreso) + parseFloat(this.ivavalorEgreso)).toFixed(2);
    }else{
      this.descIva = '12';
      this.ivavalorEgreso = (parseFloat(this.subtotalEgreso) *0.12).toFixed(2);
      this.totalEgreso = (parseFloat(this.subtotalEgreso) + parseFloat(this.ivavalorEgreso)).toFixed(2);
    }
    
  }

  cambioDescripcionEgreso(evento: any){
    this.descripcionEgreso = evento;
  }

  enviarEgresos(){
    let enviar = {
      factura_num: this.facturaEgreso,
      fecha_emision: this.fechaFacturaEgreso,
      autorizacionSRI: this.autorizacionFacturaEgreso,
      descripcion: this.descripcionEgreso,
      subtotal: this.subtotalEgreso,
      iva: this.descIva,
      valor_iva: this.ivavalorEgreso,
      empresa: this.empresa,
      tipo: 'Egresos',
      total: this.totalEgreso,
      fecha_autorizacion: this.fechaAutorizazionEgreso
    }
    
    console.log(enviar);

    this.insertarEgresosLame(enviar);
    
  }

insertarEgresosLame(data: any){
  this._lame.insertComprasLameEgresos(data)
  .subscribe((resp) =>{
    console.log(resp);

    this._toastr.success('Se ha guardado el regisro', 'Ingresos',{
      easing: 'ease-in',
      closeButton: true,
      progressAnimation: 'decreasing',
      progressBar: true,
      timeOut: 2000,
      easeTime: 500 
    });

    this.facturaEgreso= '';
    this.fechaFacturaEgreso = '';
    this.autorizacionFacturaEgreso = '';
    this.descripcionEgreso = '';
    this.subtotalEgreso = '';
    this.ivaEgreso = '';
    this.ivavalorEgreso = '';
    this.totalEgreso = '';
    this.fechaAutorizazionEgreso = '';
    
  });
}

cambioFechaAutorizacion(evento){
  this.fechaAutorizazionEgreso = evento
}

}

