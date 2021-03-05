import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavebarComponent } from './navebar/navebar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TiendaComponent } from './tienda/tienda.component';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { FiltroComponent } from './filtro/filtro.component';
import { ResumenComponent } from './resumen/resumen.component';
import { HistorialComponent } from './historial/historial.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    CarouselComponent,
    NavebarComponent,
    InicioComponent,
    TiendaComponent,
    FiltroComponent,
    ResumenComponent,
    HistorialComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
