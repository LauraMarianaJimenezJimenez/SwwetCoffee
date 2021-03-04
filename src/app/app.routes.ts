import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CarouselComponent } from "./carousel/carousel.component";
import { HistorialComponent } from "./historial/historial.component";
import { InicioComponent } from "./inicio/inicio.component";
import{LoginComponent} from "./login/login.component"
import { NavebarComponent } from "./navebar/navebar.component";
import { RegistroComponent } from "./registro/registro.component";
import { ResumenComponent } from "./resumen/resumen.component";
import { TiendaComponent } from "./tienda/tienda.component";

const routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path:'registrarse',component: RegistroComponent},
    {path:'inicio',component: InicioComponent},
    {path:'tienda', component: TiendaComponent},
    {path: 'resumen-compra', component: ResumenComponent},
    {path : 'historial', component: HistorialComponent}
];
@NgModule({
    imports:
    [
        RouterModule.forRoot(routes)
    ],
    exports:
    [
        RouterModule
    ]
})
export class AppRoutingModule
{

}