package com.example.springdata.springjpa.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.example.springdata.springjpa.model.Venta;

public interface VentaService {
	
	Page<Venta> getAllVentas(PageRequest pageRequest);

	void deleteAllVentas();

	Page<Venta> getVentasByUsuario(String email, PageRequest pageRequest);

	Venta addVenta(Venta newVenta);

	Page<Venta> getVentasByMes(int mes, PageRequest pageRequest);

	int getTotalVentas(int mes);

	int getValorTotalVentas(int mes);
	
}
