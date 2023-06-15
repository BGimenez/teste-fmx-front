import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from 'src/app/service/usuario.service';



@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
