import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria, Producto } from '../Modelos/producto.model';
import { Usuario } from '../Modelos/usuario.model';
import { ProductoService } from '../servicios/producto.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public productos: Producto[] = [];
  //Producto nuevo
  public agregar = false;
  public imagenNuevo:string = ""
  public nombreNuevo:string = ""
  public descripcionNuevo:string = ""
  public precioNuevo :number = 0;
  public categoriaNuevo: Categoria = -1;

  constructor(private productoServicio : ProductoService, private router: Router, private usuarioServicio : UsuarioService) { }

  ngOnInit(): void {
   this.productos= this.productoServicio.getProductos()
  }

  public logout()
  {
    this.usuarioServicio.usuarioActivo = {} as Usuario;
    localStorage.setItem('admin','');
    localStorage.setItem('user','');
    this.router.navigateByUrl("/login")
  }

  public actualizarProducto(prod:Producto)
  {
    this.productoServicio.productos =this.productos;
    prod.editar = false;
  }

  public eliminarProducto(prod:Producto)
  {
    var index:number = this.productos.indexOf(prod);
    this.productos.splice(index,1)
    this.productoServicio.productos = this.productos;
  }

  public agregarProducto()
  {
  
    var productoNuevo: Producto = new Producto(this.nombreNuevo,this.precioNuevo,this.imagenNuevo,this.descripcionNuevo,this.categoriaNuevo,false);
    this.productos.push(productoNuevo);
    this.productoServicio.productos = this.productos;
    this.agregar = false;
    this.imagenNuevo = "";
    this.nombreNuevo = "";
    this.descripcionNuevo = "";
    this.precioNuevo = 0;
    this.categoriaNuevo = -1;
    alert("Producto agregado exitosamente")
  }

}
