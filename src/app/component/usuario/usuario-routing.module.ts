import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioComponent } from "./usuario.component";
import { UsuarioFormComponent } from "./usuario-form/usuario-form.component";

const usuarioRoutes: Routes = [
    {path: '', component: UsuarioComponent},
    {path: 'new', component: UsuarioFormComponent},
    {path: ':id', component: UsuarioFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(usuarioRoutes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {

}