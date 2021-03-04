import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto, Categoria } from '../Modelos/producto.model';
import { UsuarioService } from '../servicios/usuario.service';
import { VentaService } from '../servicios/venta.service';
import { Venta } from '../Modelos/venta.model';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public productos :{producto: Producto, cantidad: number}[] = []
  public precioTotal:number = 0;
  constructor(private ventaServicio:VentaService, private router:Router, private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    this.productos = this.ventaServicio.ventaProceso.productos;
    this.precioTotal = this.ventaServicio.ventaProceso.calcularValorTotal()
  }

  public confirmarCompra()
  {
    this.ventaServicio.ventaProceso.usuario = this.usuarioServicio.usuarioActivo;
    this.usuarioServicio.usuarioActivo.compras.push(this.ventaServicio.ventaProceso);
    this.ventaServicio.ventas.push(this.ventaServicio.ventaProceso);
    this.ventaServicio.ventaProceso = {} as Venta;
    alert("Compra realizada con éxito");
    this.router.navigateByUrl("/inicio");
  }

}
