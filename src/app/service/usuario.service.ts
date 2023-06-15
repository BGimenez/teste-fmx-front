import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Usuario } from '../model/usuario';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = `${environment.urlApi}/usuarios`;

  constructor(private httpClient: HttpClient) { }

  private create(usuario: Usuario) {
    return this.httpClient.post(this.API, usuario).pipe(take(1));
  }

  private update(usuario: Usuario) {
    return this.httpClient.put(this.API, usuario).pipe(take(1));
  }

  save(usuario: Usuario): any {
    if (usuario.id) {
      return this.update(usuario);
    }

    return this.create(usuario);
  }

  getAll() {
    return this.httpClient.get<Usuario[]>(this.API)
    .pipe(
      tap(console.log)
    );
  }

  getId(id: number) {
    return this.httpClient.get<Usuario>(`${this.API}/${id}`).pipe(take(1));
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
