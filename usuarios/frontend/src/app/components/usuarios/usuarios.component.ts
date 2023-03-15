import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WSAENOMORE } from 'constants';
import { json } from 'express';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/usuario.service';

declare var M: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})

export class UsuariosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  addUsuario(form: NgForm){
    if (form.value.rol !="") {
      if (form.value.rol == "administrador" || form.value.rol == "cliente") {
      
        if (confirm('¿esta seguro de querer guardarlo?')) {
        
          this.usuarioService.postUsuario(form.value).subscribe(res => {
            this.resetForm(form);
            this.getUsuarios();
            M.toast({html:'Usuario guardado'});
          })
  
        }

      }

    }
  }


  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarioService.usuarios = res as Usuario[];
    })
  }

  deleteUsuario(_id: string, form: NgForm){
    if (confirm('¿esta seguro de querer eliminarlo?')) {
      this.usuarioService.deleteUsuario(_id).subscribe(res=>{
        this.resetForm(form);
        this.getUsuarios();
        M.toast({html: 'eliminado'});
      })
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.resetForm();
      this.usuarioService.selectedUsuario = new Usuario();
    }
  }

  

}
