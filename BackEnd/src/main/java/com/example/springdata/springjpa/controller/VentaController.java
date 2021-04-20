package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springdata.springjpa.dtos.VentaDTO;
import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.model.Venta;
import com.example.springdata.springjpa.service.VentaService;

@RestController
@RequestMapping("ventas")
public class VentaController {

	@Autowired
	private VentaService ventaService;

	@GetMapping("getVentas")
	List<VentaDTO> getVentas()
	{
		return transformarDTO(ventaService.getAllVentas());
	}

	@GetMapping("getVentasUsuario/{email}")
	List<VentaDTO> getVentasByUsuario(@PathVariable String email)
	{
		return transformarDTO(ventaService.getVentasByUsuario(email));
	}

	@PutMapping
	public String put() {
		return "Respuesta desde el metodo PUT";
	}

	@PostMapping
	public Venta post(@RequestBody Venta newVenta) {
		return ventaService.AddVenta(newVenta);
	}

	@DeleteMapping
	public String delete() {
		ventaService.deleteAllVentas();
		return "Respuesta desde el metodo DELETE";
	}
	
	public List<VentaDTO> transformarDTO(Iterable<Venta> ventas)
	{
		List<VentaDTO> ventasDTO =  new ArrayList<VentaDTO>();

		for (Venta v : ventas)
		{
			VentaDTO vDTO =  new VentaDTO();
			vDTO.setFecha(v.getFecha());
			vDTO.setId(v.getId());
			vDTO.setNombreUsuario(v.getUsuario().getNombre());
			vDTO.setValor(v.getValor());
			ventasDTO.add(vDTO);
		}
		return ventasDTO;
	}
}
