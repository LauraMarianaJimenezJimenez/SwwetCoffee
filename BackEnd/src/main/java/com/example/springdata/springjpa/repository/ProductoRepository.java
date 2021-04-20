package com.example.springdata.springjpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Categoria;
import com.example.springdata.springjpa.model.Producto;
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
	
	@Query("SELECT p FROM Producto p WHERE p.categoria = :categoria")
	Page<Producto> findByCategoria(Categoria categoria,Pageable pageable);

}
