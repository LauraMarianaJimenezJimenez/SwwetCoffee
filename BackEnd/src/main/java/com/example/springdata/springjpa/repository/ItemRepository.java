package com.example.springdata.springjpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Item;
import com.example.springdata.springjpa.model.Producto;

@Repository
public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
	
	Optional<Item> findById(Long id);

	Optional<Item> findByProducto(Producto producto);
	
	@Query("SELECT i FROM Item i WHERE i.venta.id = :id")
	Page<Item> findByVenta(long id, Pageable pageable);

	@Query("SELECT i FROM Item i WHERE i.producto.id = :id")
	List<Item> findByProdcuto(long id);

}
