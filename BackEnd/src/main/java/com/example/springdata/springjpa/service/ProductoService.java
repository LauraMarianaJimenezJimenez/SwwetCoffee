package com.example.springdata.springjpa.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.example.springdata.springjpa.model.Producto;

public interface ProductoService {
	
	Page<Producto> getAllProdcuts(PageRequest pageRequest);
	
	Page<Producto> getByCategoria(String categoria, PageRequest pageRequest);

	Producto AddProducto(Producto newProducto);

	void deleteAllProducts();

	void deleteProduct(Long id);

	Producto actualizarProducto(Producto newProducto, Long id);

}
