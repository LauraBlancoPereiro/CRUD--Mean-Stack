import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//import { ConsoleReporter } from 'jasmine';
import { Producto } from 'src/app/models/producto';
import {ProductoService} from '../../services/producto.service';



declare var M: any;




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers:[ProductoService]
})

export class ProductosComponent implements OnInit {

  constructor(public productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }


  addProducto(form: NgForm){
    
    if (form.value.tipo !="" && form.value.precio !="") {
      
      if(form.value._id){

        if(confirm('¿esta seguro de querer guardarlo?')){

          this.productoService.putProducto(form.value)
            .subscribe((res) => {
              //console.log(res);
              this.resetForm(form);
          
              M.toast({html:'Producto Actualizado'});
    
              this.getProductos();
    
          })
        }
      }else{

        if(confirm('¿esta seguro de querer guardarlo?')){
          this.productoService.postProducto(form.value).subscribe(res =>{
            
            this.resetForm(form);
            this.getProductos();
            M.toast({html:'Producto Guardado'});
            
          })
        }
      }

      
    }

    
  }


  validar(form: NgForm){

    this.productoService.getUsuario(form.value._id).subscribe(res =>{
      this.productoService.setCondicion(res as String);
    })
  }


  getProductos(){
    this.productoService.getProducto().subscribe(res=>{
      this.productoService.productos = res as Producto[];
      
    })
  }


  editProducto(producto: Producto){

    if(confirm('¿esta seguro de querer editarlo?')){
      this.productoService.selectedProducto = producto;
      //this.productoService.putProducto(producto)
    }
  }

  deleteProducto(_id:string,form:NgForm){
    if(confirm('¿esta seguro de querer eliminarlo?')){
      this.productoService.deleteProducto(_id)
      .subscribe(res =>{
        this.resetForm(form);
        this.getProductos();
        M.toast({html:'eliminado'});
      })
    }
  }

  resetForm(form?: NgForm){
    if (form) {
      form.resetForm();
      this.productoService.selectedProducto = new Producto();
    }

  }

  search(_id: string){
    // this.resetForm(form);
     this.productoService.getProductoId(_id).subscribe(res=>{
      this.productoService.productos = res as Producto[];
      //this.getProductos();
      //this.resetForm(form);
     })
  }
  
  searchTipo(tipo: string){
    // this.resetForm(form);
     this.productoService.getProductoTipo(tipo).subscribe(res=>{
      this.productoService.productos = res as Producto[];
      //this.getProductos();
      //this.resetForm(form);
     })
  }



}
