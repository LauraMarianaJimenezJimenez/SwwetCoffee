package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
	
	@GetMapping("getProductos/{page}/{size}")
	Page<ProductoDTO> getAllProductos(@PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(productoService.getAllProdcuts(PageRequest.of(page, size)));
	}
	
	@GetMapping("getProductosCategoria/{categoria}/{page}/{size}")
	Page<ProductoDTO> getProductosByCategoria(@PathVariable String categoria, @PathVariable int page, @PathVariable int size)
	{
		return transformarDTO(productoService.getByCategoria(categoria, PageRequest.of(page, size)));
	}
	
	@PutMapping("actualizar/{id}")
    public ProductoDTO actualizarProducto(@RequestBody Producto newProducto, @PathVariable Long id) {
		ModelMapper modelMapper = new ModelMapper();
		ProductoDTO  productoDTO = modelMapper.map(productoService.actualizarProducto(newProducto, id), ProductoDTO.class);
		return productoDTO;
    }
	
	@PostMapping
    public ProductoDTO post(@RequestBody Producto newProducto) {
		ModelMapper modelMapper = new ModelMapper();
		ProductoDTO  productoDTO = modelMapper.map(productoService.AddProducto(newProducto), ProductoDTO.class);
		return productoDTO;
    }
	
	@DeleteMapping
    public String deleteALL() {
		productoService.deleteAllProducts();
        return "Respuesta desde el metodo DELETE";
    }
	
	@DeleteMapping("/eliminar/{id}")
    public String deleteProduct	(@PathVariable Long id) {
		productoService.deleteProduct(id);
        return "Producto eliminado correctamente";
    }
	
	public Page<ProductoDTO> transformarDTO(Page<Producto> productos)
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
		Page<ProductoDTO> productosDTO = new PageImpl<>(productosList);
		return productosDTO;
	}

}
