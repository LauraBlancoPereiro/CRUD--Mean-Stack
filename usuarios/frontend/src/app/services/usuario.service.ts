import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUsuario: Usuario;
  usuarios: Usuario[] = [];
  readonly URL_API = 'http://localhost:3001/usuarios';

  constructor(private http:HttpClient) {

    this.selectedUsuario = new Usuario();

  }

  getUsuarios() {
    return this.http.get(this.URL_API);
  }

  getUsuarioID(_id: string){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  postUsuario(usuario: Usuario){
    return this.http.post(this.URL_API,usuario);
  }

  deleteUsuario(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
