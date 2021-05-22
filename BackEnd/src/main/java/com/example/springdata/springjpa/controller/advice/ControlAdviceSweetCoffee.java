package com.example.springdata.springjpa.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.example.springdata.springjpa.exceptions.UsuarioAlreadyExsistsException;

@ControllerAdvice
public class ControlAdviceSweetCoffee {
	
	@ResponseBody
	@ExceptionHandler(UsuarioAlreadyExsistsException.class)
	@ResponseStatus(value  = HttpStatus.CONFLICT)
	String usuarioAlreadyExistHandler(UsuarioAlreadyExsistsException ex)
	{
		return ex.getMessage();
	}

}
