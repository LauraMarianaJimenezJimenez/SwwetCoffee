package com.example.springdata.springjpa.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Venta;
import com.example.springdata.springjpa.repository.VentaRepository;

@Service
public class VentaServiceImpl implements VentaService{
	
	@Autowired
	VentaRepository ventaRepository;

	@Override
	public Page<Venta> getAllVentas(PageRequest pageRequest) {
		ventaRepository.deleteVentasSinItems();
		return ventaRepository.findAll(pageRequest);
	}

	@Override
	public void deleteAllVentas() {
		ventaRepository.deleteAll();
		
	}

	@Override
	public Page<Venta> getVentasByUsuario(String email, PageRequest pageRequest) {
		ventaRepository.deleteVentasSinItems();
		return ventaRepository.findByUsuario(email, pageRequest);
	}

	@Override
	public Venta addVenta(Venta newVenta) {
		return ventaRepository.save(newVenta);
	}

	@Override
	public Page<Venta> getVentasByMes(int mes, PageRequest pageRequest) {
		return ventaRepository.findByMes(mes, pageRequest);
	}

	@Override
	public int getTotalVentas(int mes) {
		if( mes == 0)
		{
			return ventaRepository.findNumeroTotal();
		}else
		{
			return ventaRepository.findNumeroTotal(mes);
		}
	}

	@Override
	public int getValorTotalVentas(int mes) {
		if(mes==0)
		{
			return ventaRepository.findValorTotal();
		}else
		{
			return ventaRepository.findValorTotal(mes);
		}
		
	}
		
}
