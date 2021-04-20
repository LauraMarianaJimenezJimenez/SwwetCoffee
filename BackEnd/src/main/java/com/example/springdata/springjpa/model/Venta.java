package com.example.springdata.springjpa.model;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Venta {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long id;
	
	@Temporal(TemporalType.DATE)
	public Date fecha;
	
	public int valor;
	
	@ManyToOne
	public Usuario usuario;
	
	@OneToMany(mappedBy = "venta", fetch = FetchType.EAGER)
	public List<Item> items;



public long getId() {
		return id;
	}
public void setId(long id) {
	this.id = id;
}
public Date getFecha() {
	return fecha;
}
public void setFecha(Date fecha) {
	this.fecha = fecha;
}
public Usuario getUsuario() {
	return usuario;
}
public void setUsuario(Usuario usuario) {
	this.usuario = usuario;
}

public List<Item> getItems() {
	return items;
}
public void setItems(List<Item> items) {
	this.items = items;
}

public int getValor() {
	return valor;
}
public void setValor(int valor) {
	this.valor = valor;
}
@Override
public String toString() {
	return "ID: " + id + "Date: " + fecha.toString();
}

	
	
}
