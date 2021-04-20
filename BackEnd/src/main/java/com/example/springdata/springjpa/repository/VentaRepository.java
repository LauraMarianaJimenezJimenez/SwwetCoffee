package com.example.springdata.springjpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {

	@Query("SELECT v FROM Venta v WHERE v.usuario.email = :email")
	Iterable<Venta> findByUsuario(String email);
	

}
