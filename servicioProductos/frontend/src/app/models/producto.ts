export class Producto {

    constructor(_id ="",tipo = "", material = "",marca = "",talla = "",cantidad = 0,precio = 0){
        this._id = _id;
        this.tipo = tipo;
        this.material = material;
        this.marca = marca;
        this.talla = talla;
        this.cantidad = cantidad;
        this.precio = precio;

    }

    _id: string;
    tipo: string;
    material: string;
    marca: string;
    talla: string;
    cantidad: number;
    precio: number;
}
