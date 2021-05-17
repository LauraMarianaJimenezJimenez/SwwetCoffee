import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../Modelos/item.model';
import { UsuarioService } from '../servicios/usuario.service';
import { VentaService } from '../servicios/venta.service';
import { Venta } from '../Modelos/venta.model';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public items:Item[] = []
  public precioTotal:number = 0;
  constructor(private ventaServicio:VentaService, private router:Router, private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    this.items = this.ventaServicio.ventaProceso.items;
    this.precioTotal = this.ventaServicio.ventaProceso.valor
  }

  public confirmarCompra()
  {
    for (let item of this.items) {
      item.venta = this.ventaServicio.ventaProceso
    }
      this.ventaServicio.agregarItemsVenta(this.items).subscribe(
        data=>{
            this.ventaServicio.ventaProceso = {} as Venta;
            alert("Compra realizada con éxito");
            this.router.navigateByUrl("/inicio");
        },error=>{
          console.log("Error al agregar item")
        }
      )
  }

}
