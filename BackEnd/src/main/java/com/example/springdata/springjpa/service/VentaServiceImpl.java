package com.example.springdata.springjpa.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Venta;
import com.example.springdata.springjpa.repository.VentaRepository;

@Service
public class VentaServiceImpl implements VentaService{
	
	@Autowired
	VentaRepository ventaRepository;

	@Override
	public Iterable<Venta> getAllVentas() {
		return ventaRepository.findAll();
	}

	@Override
	public void deleteAllVentas() {
		ventaRepository.deleteAll();
		
	}

	@Override
	public Iterable<Venta> getVentasByUsuario(String email) {
		return ventaRepository.findByUsuario(email);
	}

	@Override
	public Venta AddVenta(Venta newVenta) {
		return ventaRepository.save(newVenta);
	}
		
}
