import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { HistorialComponent } from "./historial/historial.component";
import { InicioComponent } from "./inicio/inicio.component";
import{LoginComponent} from "./login/login.component"
import { NavebarComponent } from "./navebar/navebar.component";
import { RegistroComponent } from "./registro/registro.component";
import { ReporteComponent } from "./reporte/reporte.component";
import { ResumenComponent } from "./resumen/resumen.component";
import { TiendaComponent } from "./tienda/tienda.component";
import { AuthGuardGuard } from "./auth-guard.guard";
import { AdminAuthGuardGuard } from "./admin-auth-guard.guard";

const routes = [
    {path: '', component: LoginComponent},
    {path: 'login',component: LoginComponent},
    {path:'registrarse',component: RegistroComponent},
    {path:'inicio',  canActivate:[AuthGuardGuard],component: InicioComponent},
    {path:'tienda',  canActivate:[AuthGuardGuard],component: TiendaComponent},
    {path: 'resumen-compra',  canActivate:[AuthGuardGuard],component: ResumenComponent},
    {path : 'historial',  canActivate:[AuthGuardGuard],component: HistorialComponent},
    {path : 'admin', canActivate:[AdminAuthGuardGuard], component: AdminComponent},
    {path : 'admin/reporte',  canActivate:[AdminAuthGuardGuard], component: ReporteComponent}
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