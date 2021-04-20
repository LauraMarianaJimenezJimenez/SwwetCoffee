package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springdata.springjpa.dtos.UsuarioDTO;
import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.service.UsuarioService;


@RestController
@RequestMapping("usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("getUsuarios")
	List<UsuarioDTO> getAllUsuarios()
	{
		ModelMapper modelMapper = new ModelMapper();
		List<UsuarioDTO> usersDTO =  new ArrayList<UsuarioDTO>();
		for (Usuario u : usuarioService.getAllUsers()) 
		{
			UsuarioDTO  usuarioDTO = modelMapper.map( u, UsuarioDTO.class);
			usersDTO.add(usuarioDTO);
		}
		return usersDTO;
	}
	
	@GetMapping("getUsuario/{email}")
	UsuarioDTO getUsuarioByEmail(@PathVariable String email)
	{
		ModelMapper modelMapper = new ModelMapper();
		UsuarioDTO  usuarioDTO = modelMapper.map( usuarioService.findByEmail(email), UsuarioDTO.class);
		return usuarioDTO;
	}
	
	@PutMapping
    public String put() {
        return "Respuesta desde el metodo PUT";
    }
	
	@PostMapping
    public Usuario post(@RequestBody Usuario newUsuario) {
        return usuarioService.AddUser(newUsuario);
    }
	
	@DeleteMapping
    public String delete() {
		usuarioService.deleteAllUsers();
        return "Respuesta desde el metodo DELETE";
    }
	
}
