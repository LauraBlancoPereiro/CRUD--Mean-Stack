import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../models/compra';
import { ComprasComponent } from '../components/compras/compras.component ';
import { Producto } from '../../../../../servicioProductos/frontend/src/app/models/producto';




@Injectable({
  providedIn: 'root'
})
export class CompraService {


 


  selectedCompra: Compra;
  
  compras: Compra[] = [];
  productos: Producto[] =[];

  condicion: String="";
  
  IDProducto: String="";
 // selectedProducto: Producto;
  
  readonly URL_API = 'http://localhost:3002/microservicio/compras';
  //readonly URL_PRODUCTOS = 'http://localhost:3000/api/joyeria';


  constructor(private http:HttpClient) { 
    this.selectedCompra = new Compra();
    //this.selectedProducto = new Producto();
  }

  getUsuario(idUsuario: string){
    return this.http.get(this.URL_API + `/verificar/${idUsuario}`);
  }
 
  setCondicion(condicion: String){
    this.condicion = condicion;
  }
  
  getCondicion(){
    return this.condicion;
  }

  /*getCompra() { 
    return this.http.get(this.URL_API);
  

  }*/

  getCompraID(idUsuario: String) { 
    return this.http.get(this.URL_API + `/compras`+`/${idUsuario}`);

  }
  getCompraByID(id: String) { 
    return this.http.get(this.URL_API +`/unico/${id}`);

  }

  /*getCompraNombre(nombre: string){
    
    if (`${nombre}` == "") {
      return this.getCompra();
    }else{
      
      return this.http.get(this.URL_API + `/usuario/${nombre}`);
    }

  }*/
   //getProductoIDCantidad(_id: string){
    //return (this.http.get(this.URL_PRODUCTOS +`/${_id}`));
     
   //}

  

  postCompra(compra: Compra){
    console.log(compra);
    return this.http.post(this.URL_API,compra);
  }

  putCompra(compra: Compra){
    return this.http.put(this.URL_API +  `/${compra._id}`,compra );

  }

  putProducto(producto: Producto){
    return this.http.put(this.URL_API + `/productos`+ `/${producto._id}`,producto );

  }

  deleteCompra(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  getProductos() { 
    
    return this.http.get(this.URL_API+`/productos`);

  }
  getIDProductos(id: String) { 
    
    return this.http.get(this.URL_API+`/productos/${id}`);

  }

  getComprasIDnombre(id: String, nombre: String){
    if(nombre == ''){
      return this.getCompraID(id);
    }else{
      return this.http.get(this.URL_API + `/compras/${id}/${nombre}`);
    }
  }

  getProductoTipo(tipo: String){
    if(tipo == ''){
      return this.getProductos();
    }else{
      return this.http.get(this.URL_API + `/tipo/${tipo}`);
    }
  }

  
}
