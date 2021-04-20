package com.example.springdata.springjpa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Item;
import com.example.springdata.springjpa.model.Producto;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
	
	Optional<Item> findById(Long id);

	Optional<Item> findByProducto(Producto producto);
	
	@Query("SELECT i FROM Item i WHERE i.venta.id = :id")
	Iterable<Item> findByVenta(long id);

	@Query("SELECT i FROM Item i WHERE i.producto.id = :id")
	Iterable<Item> findByProdcuto(long id);

}
