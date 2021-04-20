package com.example.springdata.springjpa.service;


import com.example.springdata.springjpa.model.Venta;

public interface VentaService {
	
	Iterable<Venta> getAllVentas();

	void deleteAllVentas();

	Iterable<Venta> getVentasByUsuario(String email);

	Venta AddVenta(Venta newVenta);
	
}
