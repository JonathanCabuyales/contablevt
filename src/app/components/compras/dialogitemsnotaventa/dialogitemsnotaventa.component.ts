import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsI } from 'src/app/models/items.interface';
import { DialogitemscompraComponent } from '../dialogitemscompra/dialogitemscompra.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogitemsnotaventa',
  templateUrl: './dialogitemsnotaventa.component.html',
  styleUrls: ['./dialogitemsnotaventa.component.css']
})
export class DialogitemsnotaventaComponent implements OnInit {

  item: ItemsI;
  ivaSelccion: string = '0';

  constructor(public dialogRef: MatDialogRef<DialogitemscompraComponent>, @Inject(MAT_DIALOG_DATA)
  public it: ItemsI) { }

  ngOnInit(): void {
    this.item = {
      categoria: '0',
      descripcion: '',
      cantidad: '',
      precio: '',
      subtotal12: '0',
      subtotal0: '0',
      notaVenta: '0',
      iva12: '0',
      iva0: '0',
      total: '0',
      lote: ''
    }
  }

  grabarItem(){
    if (this.item.categoria == '0' || this.item.descripcion == '' || this.item.cantidad == '' ||
      this.item.precio == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar todos los datos del concepto'
      });
    }else{
      this.item.total = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
      this.item.iva12 = '0';
      this.item.iva0 = '0';
      this.item.notaVenta = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);

      this.dialogRef.close(this.item);
    }
  }

}