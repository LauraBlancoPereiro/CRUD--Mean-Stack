export class Compra {

    constructor(_id ="", idUsuario = "",idProducto = "",cantidadUsuario = 0,nombre = "", direccion = ""){
        this._id = _id;
        this.idUsuario = idUsuario
        this.idProducto = idProducto;
        this.cantidadUsuario = cantidadUsuario;
        this.nombre = nombre;
        this.direccion = direccion;

    }

    _id: string;
    idUsuario: string;
    idProducto: string;
    cantidadUsuario:number;
    nombre: string;
    direccion: string;
}
