package com.example.springdata.springjpa.repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Rol;
import com.example.springdata.springjpa.model.Usuario;

/**
 * UserRepository demonstrates the method name query generation.
 * 
 * @author Ramesh Fadatare
 *
 */
@Repository
public interface UserRepositoryWithQuery extends PagingAndSortingRepository<Usuario, String> {
	
	Usuario findByEmail(String email);
	
	@Query("SELECT u.rol FROM Usuario u WHERE u.email = :email")
	Rol findRolByUsuario(String email);

}
