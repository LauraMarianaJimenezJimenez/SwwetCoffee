import { Component, HostListener, OnInit } from '@angular/core';
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
   this.productoServicio.consultarProductos().subscribe(
     data=>{
      this.productos = data;
     },
     error=>console.log("error recibido")
    ) 
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
    prod.editar = false;
    this.productoServicio.actualizarProducto(prod).subscribe(
      data=>{
        console.log(data)
      },
      error=>console.log("No se pudo actualizar")
    )
  }

  public eliminarProducto(prod:Producto)
  {
    var eliminable:boolean
    this.productoServicio.consultarItemsProducto(prod).subscribe(
      data=>{
        eliminable = data
        if(eliminable)
        {
          this.productoServicio.eliminarProducto(prod).subscribe(
            data=>{
              console.log(data)
            },
            error=>console.log("error al eliminar")
          )
          var index:number = this.productos.indexOf(prod);
          this.productos.splice(index,1)
        }else
        {
          alert("No se puede eliminar el producto porque hay ventas asociadas, si desea puede desactivarlo")
        }
      },
      error=>console.log("No se pudo consultar los items por producto")
    )
  }

  public agregarProducto()
  {
  
    var productoNuevo: Producto = new Producto(this.nombreNuevo,this.precioNuevo,this.imagenNuevo,this.descripcionNuevo,this.categoriaNuevo,false);
    this.productos.push(productoNuevo);
    this.productoServicio.agregarProducto(productoNuevo).subscribe(
      data=>{
        console.log(data)
      },
      error=>console.log("error al agregar producto")
    )
    this.agregar = false;
    this.imagenNuevo = "";
    this.nombreNuevo = "";
    this.descripcionNuevo = "";
    this.precioNuevo = 0;
    this.categoriaNuevo = -1;
    alert("Producto agregado exitosamente")
  }

  public cambiarEstadoProducto(prod:Producto)
  {
    if(prod.activo)
    {
      prod.activo= false
    }else
    {
      prod.activo = true
    }
    this.actualizarProducto(prod)
  }

  
}
