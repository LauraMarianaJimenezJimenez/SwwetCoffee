package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	@GetMapping("getVentas/{page}/{size}")
	Page<VentaDTO> getVentas(@PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(ventaService.getAllVentas(PageRequest.of(page, size)),PageRequest.of(page, size));
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("getVentasMes/{mes}/{page}/{size}")
	Page<VentaDTO> getVentasByMes(@PathVariable int mes, @PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(ventaService.getVentasByMes(mes, PageRequest.of(page, size)),PageRequest.of(page, size));
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("getVentasUsuario/{email}/{page}/{size}")
	Page<VentaDTO> getVentasByUsuario(@PathVariable String email, @PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(ventaService.getVentasByUsuario(email, PageRequest.of(page, size)), PageRequest.of(page, size));
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PutMapping
	public boolean put() {
		return true;
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PostMapping
	public Venta post(@RequestBody Venta newVenta) {
		return ventaService.addVenta(newVenta);
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping
	public boolean delete() {
		ventaService.deleteAllVentas();
		return true;
	}
	
	public Page<VentaDTO> transformarDTO(Page<Venta> ventas, Pageable pageable)
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
		Page<VentaDTO> pageVentasDTO = new PageImpl<>(ventasDTO, pageable, ventas.getTotalElements());
		return pageVentasDTO;
	}
}
