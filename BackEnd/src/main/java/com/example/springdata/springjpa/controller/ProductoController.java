package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springdata.springjpa.dtos.ProductoDTO;
import com.example.springdata.springjpa.model.Producto;
import com.example.springdata.springjpa.service.ProductoService;

@RestController
@RequestMapping("productos")
public class ProductoController {
	
	@Autowired
	private ProductoService productoService;
	
	@Secured({"ROLE_ADMIN"})
	@GetMapping("getProductos/{page}/{size}")
	Page<ProductoDTO> getAllProductos(@PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(productoService.getAllProdcuts(PageRequest.of(page, size)), PageRequest.of(page, size));
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("getProductosU/{page}/{size}")
	Page<ProductoDTO> getAllProductosU(@PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(productoService.getAllProdcutsU(PageRequest.of(page, size)), PageRequest.of(page, size));
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("getProductosCategoria/{categoria}/{page}/{size}")
	Page<ProductoDTO> getProductosByCategoria(@PathVariable String categoria, @PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(productoService.getByCategoria(categoria, PageRequest.of(page, size)), PageRequest.of(page, size));
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("actualizar/{id}")
    public ProductoDTO actualizarProducto(@RequestBody Producto newProducto, @PathVariable Long id) {
		ModelMapper modelMapper = new ModelMapper();
		ProductoDTO  productoDTO = modelMapper.map(productoService.actualizarProducto(newProducto, id), ProductoDTO.class);
		return productoDTO;
    }
	
	@Secured("ROLE_ADMIN")
	@PostMapping
    public ProductoDTO post(@RequestBody Producto newProducto) {
		ModelMapper modelMapper = new ModelMapper();
		ProductoDTO  productoDTO = modelMapper.map(productoService.addProducto(newProducto), ProductoDTO.class);
		return productoDTO;
    }
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping
    public boolean deleteALL() {
		productoService.deleteAllProducts();
        return true;
    }
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/eliminar/{id}")
    public boolean deleteProduct(@PathVariable Long id) {
		productoService.deleteProduct(id);
        return true;
    }
	
	public Page<ProductoDTO> transformarDTO(Page<Producto> productos, Pageable pageable)
	{
		List<ProductoDTO> productosList = new ArrayList<>();
		for (Producto p : productos)
		{
			ProductoDTO pDTO =  new ProductoDTO();
			pDTO.setActivo(p.isActivo());
			pDTO.setCategoria(p.getCategoria());
			pDTO.setDescripcion(p.getDescripcion());
			pDTO.setEditar(p.isEditar());
			pDTO.setId(p.getId());
			pDTO.setImagen(p.getImagen());
			pDTO.setNombre(p.getNombre());
			pDTO.setPrecio(p.getPrecio());
			productosList.add(pDTO);
		}
		Page<ProductoDTO> productosDTO = new PageImpl<>(productosList,pageable,productos.getTotalElements());
		return productosDTO;
	}

}
