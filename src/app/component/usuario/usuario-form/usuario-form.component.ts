import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';

import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, OnDestroy{

  subscribe!: Subscription

  formulario!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute,
    private _location: Location
    ) {}

  ngOnInit(): void {
    this.preencherFormulario(of({email: null, senha: null}));

    this.subscribe = this.aRoute.params.subscribe((params: any) => {
      let id = params['id'];
      
      if (id) {
        this.usuarioService.getId(id)
        .subscribe({
          next: (usuario) => {
            console.log(usuario);
            this.preencherFormulario(usuario);
          }
        });
      }
    });

  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  save() {
    if ( this.formulario.valid) {
      let usuario: Usuario = this.formulario.value

      console.log(usuario);
  
      this.usuarioService.save(usuario)
      .subscribe({
        complete: () => this._location.back(),
        error: (e: any) => {
          console.log(e);
          alert(e.error.message);
        }
      });
    }
  }

  preencherFormulario(usuario: any){
    this.formulario = this.formBuilder.group({
      id: [usuario.id],
      email: [usuario.email, Validators.email],
      senha: [usuario.senha]
    });
  }
}
