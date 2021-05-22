package com.example.springdata.springjpa.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

 public class UsuarioAlreadyExsistsException extends RuntimeException {
	
	public UsuarioAlreadyExsistsException(String email)
	{
		super("El usuario:" + email +" ya existe");
	}
}
