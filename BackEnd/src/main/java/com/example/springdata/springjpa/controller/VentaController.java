package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
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

	@Secured("ROLE_ADMIN")
	@GetMapping("getVentas")
	List<VentaDTO> getVentas()
	{
		return transformarDTO(ventaService.getAllVentas());
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("getVentasUsuario/{email}")
	List<VentaDTO> getVentasByUsuario(@PathVariable String email)
	{
		return transformarDTO(ventaService.getVentasByUsuario(email));
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PutMapping
	public String put() {
		return "Respuesta desde el metodo PUT";
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PostMapping
	public Venta post(@RequestBody Venta newVenta) {
		return ventaService.AddVenta(newVenta);
	}

	@Secured("ROLE_ADMIN")
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
