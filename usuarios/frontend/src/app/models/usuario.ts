export class Usuario {

    constructor(_id = "", rol = "", nombre = ""){

        this._id = _id;
        this.rol = rol;
        this.nombre = nombre;

    }

    _id : string;
    rol : string;
    nombre: string;

}
