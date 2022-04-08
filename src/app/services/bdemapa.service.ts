import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class BdemapaService {

  baseUrl = environment.baseUrl;
  res: any;


  constructor(private http: HttpClient) { }


  getMedidores(){
    this.res = this.http.get(`${this.baseUrl}/getcampo.php/get.php`);
    return this.res;
  }

  getClienteActualizar(cedula: any){
    this.res = this.http.get(`${this.baseUrl}/clientesEMAPA.php/get.php?idCedula=${cedula}`);
    return this.res;
  }

  getcausanolectura(){
    this.res = this.http.get(`${this.baseUrl}/novedadEMAPA.php`);
    return this.res;
  }

  async exportToExcel(data, filename) {
    {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, filename);
      XLSX.writeFile(wb, filename + '.xlsx');
    }
  }

}
