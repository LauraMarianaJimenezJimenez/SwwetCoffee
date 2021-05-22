package com.example.springdata.springjpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Categoria;
import com.example.springdata.springjpa.model.Producto;
@Repository
public interface ProductoRepository extends PagingAndSortingRepository<Producto, Long> {
	
	@Query("SELECT p FROM Producto p WHERE p.categoria = :categoria")
	Page<Producto> findByCategoria(Categoria categoria,Pageable pageable);

	@Query("SELECT p FROM Producto p WHERE p.activo = true")
	Page<Producto> findActivos(Pageable pageable);

}
