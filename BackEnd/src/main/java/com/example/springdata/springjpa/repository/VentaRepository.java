package com.example.springdata.springjpa.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Venta;

@Repository
public interface VentaRepository extends PagingAndSortingRepository<Venta, Long> {

	@Query("SELECT v FROM Venta v WHERE v.usuario.email = :email")
	Page<Venta> findByUsuario(String email, Pageable pageable);
	
	@Query("SELECT v FROM Venta v WHERE MONTH(v.fecha)  = :mes")
	Page<Venta> findByMes(int mes, Pageable pageable);
	

}
