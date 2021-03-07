import { Component, OnInit } from '@angular/core';
import { ReporteComponent } from '../reporte/reporte.component';

@Component({
  selector: 'app-filtro-reporte',
  templateUrl: './filtro-reporte.component.html',
  styleUrls: ['./filtro-reporte.component.css']
})
export class FiltroReporteComponent implements OnInit {


  constructor(private reporteComponent: ReporteComponent) { }

  ngOnInit(): void {
  }

  mostrarVentas(mes:string)
  {
    this.reporteComponent.filtrarVentas(mes);
  }

}
