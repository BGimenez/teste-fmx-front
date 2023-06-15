import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';

import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{

  usuarios$!: Observable<Usuario[]>;
  error$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private usuarioService: UsuarioService
    ) {}

  ngOnInit(): void {
    this.onAtualizar();
  }

  onAtualizar() {
    this.usuarios$ = this.usuarioService.getAll()
    .pipe(
      catchError(erro => {
        console.log(erro);
        return EMPTY;
      })
    );
  }

  onEditar(id: any) {
    this.router.navigate([id], {relativeTo: this.aRoute});
  }

  onDeletar(id: any) {
    console.log(id);
    this.usuarioService.remove(id)
    .subscribe({
      complete: () => this.onAtualizar(),
      error: console.error
    }
    );
  }

}
