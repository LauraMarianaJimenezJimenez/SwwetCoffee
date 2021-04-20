package com.example.springdata.springjpa.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
public class Usuario {
	@Id
	public String email;
	public String nombre;
	public String apellido;
	public String contrasena;
	public long celular;
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "usuario")
	public List<Venta> compras;
	public boolean admin;


	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public String getContrasena() {
		return contrasena;
	}
	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}
	public long getCelular() {
		return celular;
	}
	public void setCelular(long celular) {
		this.celular = celular;
	}
	public List<Venta> getCompras() {
		return compras;
	}
	public void setCompras(List<Venta> compras) {
		this.compras = compras;
	}
	public boolean getAdmin() {
		return admin;
	}
	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	@Override
	public String toString() {
		return "Usuario [email=" + email + ", firstname=" + nombre + ", lastname=" + apellido + "]";
	}
}
