import { Component, ComponentFactory, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


//import { ConsoleReporter } from 'jasmine';
import { Compra } from 'src/app/models/compra';
import { Producto } from '../../../../../../servicioProductos/frontend/src/app/models/producto';
import {CompraService} from '../../services/compra.service ';

//import { Producto } from '/../../../../src/app/models/producto';
//import {ProductoService} from '../../../../../services/producto.service';
//import { stringify } from 'querystring';

declare var M: any;



//producto: Producto;

@Component({
  selector: 'app-productos',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  //providers:[CompraService,ProductoService]

})
export class ComprasComponent implements OnInit {

  static idCliente: String;
  static cantidad: number;
  static cantidadAntigua:number;


  constructor(public compraService: CompraService) {}
  


  static producto: Producto;
  static compraPrueba: Compra;

  ngOnInit(): void {
    this.getProductos();
    this.compraService.getCompraID(ComprasComponent.idCliente).subscribe(res =>{
      this.compraService.compras = res as Compra[];
    });
    
  }

  getCompraID(_id: String){
    this.compraService.getCompraID(_id).subscribe(res=>{
      this.compraService.compras = res as Compra[];
      
    })
  }

  getProducto(id: string ){
    this.compraService.getIDProductos(id).subscribe(res=>{
      this.compraService.productos = res as Producto[];
      
    })
  }

  addCompra(form: NgForm){ 
    if(form.value.direccion!="" && form.value.cantidadUsuario!="" && form.value.nombre!=""){

      let cantidadAux = form.value.cantidadUsuario;
      if(form.value._id){
        console.log(ComprasComponent.cantidadAntigua)
        if(ComprasComponent.cantidadAntigua == cantidadAux){
      
          this.compraService.putCompra(form.value)
            .subscribe((res) => {
              //console.log(res);
              this.resetForm(form);
        
              M.toast({html:'Compra Actualizada'});

              this.compraService.getCompraID(ComprasComponent.idCliente).subscribe(res =>{
                this.compraService.compras = res as Compra[];
              });

          })
        }else{
          M.toast({html: "No se puede editar la cantidad"});
          this.compraService.getCompraID(ComprasComponent.idCliente).subscribe(res =>{
            this.compraService.compras = res as Compra[];
          });
        }
        
    
      }else{
        if(cantidadAux <= ComprasComponent.cantidad){
          if(confirm('¿esta seguro de querer guardarlo?')){
            this.compraService.postCompra(form.value).subscribe(res =>{
            
              
            
              M.toast({html:'Compra Realizada ' + ComprasComponent.idCliente});
              console.log(ComprasComponent.idCliente);
            
              this.compraService.getCompraID(ComprasComponent.idCliente).subscribe(res =>{
                this.compraService.compras = res as Compra[];
              });
            })
          }
          this.compraService.getIDProductos(form.value.idProducto).subscribe(res =>{
            ComprasComponent.producto = res as Producto;
            ComprasComponent.producto.cantidad = ComprasComponent.producto.cantidad - cantidadAux;
            this.compraService.putProducto(ComprasComponent.producto).subscribe(res=>{
              M.toast({html:'Cantidad actualizada'});
          
            });
            this.getProductos();
          })
        }else{
          M.toast({html:"Producto agotado o cantidad superior al disponible"});
        }
      }

    }
    

  }
  


  /*getCompra(){
    this.compraService.getCompra().subscribe(res=>{
      this.compraService.compras = res as Compra[];
      
    })
  }*/

  getProductos(){
    this.compraService.getProductos().subscribe(res=>{
      this.compraService.productos = res as Producto[];
      
    })
  }
  
 

  editCompra(compra: Compra){
    if(confirm('¿esta seguro de querer editarlo?')){
    this.compraService.selectedCompra = compra;
    }

    this.compraService.getIDProductos(compra.idProducto).subscribe(res=>{
    })
    ComprasComponent.cantidadAntigua = compra.cantidadUsuario;
    console.log(ComprasComponent.producto);
    ComprasComponent.cantidad = ComprasComponent.producto.cantidad;

  }
/*this.compraService.getIDProductos(this.compraService.compras[0].idProducto).subscribe(res =>{
          this.compraService.productos = res as Producto[];
          console.log(this.compraService.productos[0].cantidad);
          this.compraService.productos[0].cantidad += this.compraService.compras[0].cantidadUsuario;
          this.compraService.putProducto(this.compraService.productos[0]).subscribe(res=>{
            M.toast({html:'Cantidad actualizada'});
        
          });
          this.getProductos();
        })*/
  deleteCompra(compra: Compra,form:NgForm){
    if(confirm('¿esta seguro de querer eliminarlo?')){
      
      
    
      this.compraService.getIDProductos(compra.idProducto).subscribe(res =>{
        ComprasComponent.producto = res as Producto;
        ComprasComponent.producto.cantidad = +ComprasComponent.producto.cantidad + +compra.cantidadUsuario;
        this.compraService.putProducto(ComprasComponent.producto).subscribe(res =>{
          
        })
        this.getProductos();
      })
      
      

      this.compraService.deleteCompra(compra._id)
      .subscribe(res =>{
        this.compraService.getCompraID(ComprasComponent.idCliente).subscribe(res =>{
          this.compraService.compras = res as Compra[];
        })
        this.resetForm(form);
        M.toast({html:'eliminado'});
      })
      
    }
  }

  resetForm(form?: NgForm){
    if (form) {
      form.reset();
      this.compraService.selectedCompra = new Compra();
    }

  }



 /* searchNombre(nombre:string){
    // this.resetForm(form);
     this.compraService.getCompraNombre(nombre).subscribe(res=>{
      this.compraService.compras = res as Compra[];
     })
   }*/


   validar(form: NgForm){
     
    ComprasComponent.idCliente = form.value.idUsuario;

    this.compraService.getUsuario(form.value.idUsuario).subscribe(res =>{
      this.compraService.setCondicion(res as String);
      
    })
    this.compraService.getCompraID(ComprasComponent.idCliente).subscribe(res =>{
      this.compraService.compras = res as Compra[];
    })
  }



  anadirCarro(_id:string,cantidad:number){
    
    this.compraService.selectedCompra.idProducto = _id;
    ComprasComponent.cantidad = cantidad;
   // this.compraService.selectedCompra.cantidad = cantidad;
    
    
  }



  searchNombre(nombre: String){
    this.compraService.getComprasIDnombre(ComprasComponent.idCliente, nombre).subscribe(res =>{
      this.compraService.compras = res as Compra[];

    })
  }

  searchTipo(tipo: String){
    this.compraService.getProductoTipo(tipo).subscribe(res =>{
      this.compraService.productos = res as Producto[];
      
    })
  }
  
}
