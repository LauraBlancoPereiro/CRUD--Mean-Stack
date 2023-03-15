import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { ProductosComponent } from '../components/productos/productos.component';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  selectedProducto: Producto;
  productos: Producto[] = [];
  condicion: String="";
  readonly URL_API = 'http://localhost:3000/api/joyeria';

  constructor(private http:HttpClient) { 
    this.selectedProducto = new Producto();
  }

  getUsuario(_id: string){
    return this.http.get(this.URL_API + `/verificar/${_id}`);
  }
 
  setCondicion(condicion: String){
    this.condicion = condicion;
  }

  getCondicion(){
    return this.condicion;
  }

  getProducto() { 
    
    return this.http.get(this.URL_API);

  }

  getProductoId(_id: string){
  
    return this.http.get(this.URL_API + `/${_id}`);
     
  }

  getProductoTipo(tipo: string){
    
    if (`${tipo}` == "") {
      return this.getProducto();
    }else{
      
      return this.http.get(this.URL_API + `/tipo/${tipo}`);
    }

  }

  postProducto(producto: Producto){
    return this.http.post(this.URL_API,producto);
  }

  putProducto(producto: Producto){
    return this.http.put(this.URL_API +  `/${producto._id}`,producto );

  }

  deleteProducto(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
