package com.example.springdata.springjpa.repository;


import java.util.List;

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
	
	@Query("SELECT SUM(v.valor) FROM Venta v")
	int findValorTotal();
	
	@Query("SELECT COUNT(v.id) FROM Venta v")
	int findNumeroTotal();

	@Query("SELECT COUNT(v.id) FROM Venta v WHERE MONTH(v.fecha) = :mes")
	int findNumeroTotal(int mes);

	@Query("SELECT SUM(v.valor)FROM Venta v WHERE MONTH(v.fecha) = :mes")
	int findValorTotal(int mes);
	

}
