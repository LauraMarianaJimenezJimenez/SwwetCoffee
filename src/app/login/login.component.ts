import { Component, OnInit } from '@angular/core';
import{ProductoService} from "src/app/servicios/producto.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  productos = [{}];
  constructor(private ProductoService:ProductoService){ }

  ngOnInit(): void {
    this.productos = this.ProductoService.getProductos();
  }

}
