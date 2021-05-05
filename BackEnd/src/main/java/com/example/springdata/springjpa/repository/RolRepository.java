package com.example.springdata.springjpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springdata.springjpa.model.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {

}
