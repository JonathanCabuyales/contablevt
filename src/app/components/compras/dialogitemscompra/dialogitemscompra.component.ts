import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoteI } from 'src/app/models/inventario/lote.interface';
import { ItemsI } from 'src/app/models/items.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogitemscompra',
  templateUrl: './dialogitemscompra.component.html',
  styleUrls: ['./dialogitemscompra.component.css']
})
export class DialogitemscompraComponent implements OnInit {

  item: ItemsI;
  ivaSelccion: string = '0';
  lote: LoteI;


  constructor(public dialogRef: MatDialogRef<DialogitemscompraComponent>, @Inject(MAT_DIALOG_DATA)
  public it: ItemsI) { }

  ngOnInit(): void {
    this.item = {
      categoria: '0',
      descripcion: '',
      cantidad: '',
      codigobarras: '',
      precio: '',
      subtotal12: '',
      subtotal0: '',
      notaVenta: '',
      iva12: '',
      iva0: '',
      total: '',
      lote: '',
      numerolote: '',
      nombre_proser: '',
      fechaelaboracion: '',
      fechavencimiento: '',
      descuento: '0'
    }

    this.lote = {
      numero_lote: '',
      fechaelabo_lote: '',
      fechavenci_lote: '',
      cantidad_lote: '',
      precio: '',
      descripcion: '',
    }
  }

  grabarItem() {

    if (this.item.categoria == '0' || this.item.nombre_proser == '' || this.item.cantidad == '' ||
      this.item.precio == '' || this.ivaSelccion == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar todos los campos obligatorios *'
      });
    } else if (this.item.descuento < '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El descuento no puede ser negativo ingresa un número positivo'
      });
    }

    else {

      this.lote.descripcion = this.item.descripcion;
      this.lote.cantidad_lote = this.item.cantidad;
      this.lote.fechaelabo_lote = this.item.fechaelaboracion;
      this.lote.fechavenci_lote = this.item.fechavencimiento;
      this.lote.numero_lote = this.item.numerolote;
      this.lote.precio = this.item.precio;

      if (this.ivaSelccion == '12') {

        this.item.iva = '12';
        this.item.iva0 = '0';
        this.item.lote = JSON.stringify(this.lote);
        this.item.subtotal0 = '0';


        if (this.item.descuento == '0' || this.item.descuento == null) {


          this.item.iva12 = ((parseFloat(this.item.cantidad) * parseFloat(this.item.precio)) * 0.12).toFixed(2);
          this.item.subtotal12 = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
          this.item.total = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);

          this.dialogRef.close(this.item);

        } else {

          // si existe descuento el descuento se aplica antes del iva
          // es decir item 2$ * cantidad 3 = 6, descuento 1
          // subtotal 5
          // y esa valor se multiplica por el iva 12%

          let subtotal = '0';
          subtotal = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
          subtotal = (parseFloat(subtotal) - parseFloat(this.item.descuento)).toFixed(2);

          this.item.iva12 = ((parseFloat(subtotal)) * 0.12).toFixed(2);
          this.item.subtotal12 = (subtotal);
          this.item.total = (subtotal);
          this.dialogRef.close(this.item);

        }

        console.log(this.item);

      } else if (this.ivaSelccion == '1') {
        this.item.iva = '0';
        this.item.iva12 = '0';
        this.item.subtotal12 = '0';
        this.item.lote = JSON.stringify(this.lote);

        if (this.item.descuento == '0' || this.item.descuento == null) {
          this.item.iva0 = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
          this.item.subtotal0 = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
          this.item.total = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);

          this.dialogRef.close(this.item);

        } else {
          let subtotal = '0';
          subtotal = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
          subtotal = (parseFloat(subtotal) - parseFloat(this.item.descuento)).toFixed(2);

          this.item.iva0 = (subtotal);
          this.item.subtotal0 = (subtotal);
          this.item.total = (subtotal);

        }

      }
    }
  }


}
