package com.example.springdata.springjpa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Producto;
import com.example.springdata.springjpa.model.Categoria;
import com.example.springdata.springjpa.model.Item;
import com.example.springdata.springjpa.repository.ItemRepository;
import com.example.springdata.springjpa.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService{
	
	@Autowired
	ProductoRepository productoRepository;

	@Override
	public Page<Producto> getAllProdcuts(PageRequest pageRequest) {
		return productoRepository.findAll(pageRequest);
	}

	@Override
	public Page<Producto> getByCategoria(String categoria, PageRequest pageRequest) {
		return productoRepository.findByCategoria(Categoria.valueOf(categoria.toUpperCase()), pageRequest);
	}

	@Override
	public Producto addProducto(Producto newProducto) {
		return productoRepository.save(newProducto);
	}

	@Override
	public void deleteAllProducts() {
		productoRepository.deleteAll();
		
	}

	@Override
	public void deleteProduct(Long id) {
		Optional<Producto> p = productoRepository.findById(id);
		if(p.isPresent())
		{
			productoRepository.deleteById(id);
		}
		
	}

	@Override
	public Producto actualizarProducto(Producto newProducto, Long id) {
		return productoRepository.findById(id).map(provider ->{
			provider.setNombre(newProducto.getNombre());
			provider.setCategoria(newProducto.getCategoria());
			provider.setDescripcion(newProducto.getDescripcion());
			provider.setEditar(newProducto.isEditar());
			provider.setImagen(newProducto.getImagen());
			provider.setPrecio(newProducto.getPrecio());
			provider.setActivo(newProducto.isActivo());
			return productoRepository.save(provider);
			
		}).get();

	}
	

}
