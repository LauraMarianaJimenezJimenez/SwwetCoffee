package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springdata.springjpa.dtos.RolDTO;
import com.example.springdata.springjpa.dtos.UsuarioDTO;
import com.example.springdata.springjpa.exceptions.UsuarioAlreadyExsistsException;
import com.example.springdata.springjpa.model.Rol;
import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.service.UsuarioService;


@RestController
@RequestMapping("usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Secured("ROLE_ADMIN")
	@GetMapping("getUsuarios/{page}/{size}")
	Page<UsuarioDTO> getAllUsuarios(@PathVariable int page, @PathVariable int size)
	{
		ModelMapper modelMapper = new ModelMapper();
		List<UsuarioDTO> usersDTO =  new ArrayList<UsuarioDTO>();
		for (Usuario u : usuarioService.getAllUsers(PageRequest.of(page, size))) 
		{
			UsuarioDTO  usuarioDTO = modelMapper.map( u, UsuarioDTO.class);
			usersDTO.add(usuarioDTO);
		}
		Page<UsuarioDTO> pageUsuariosDTO = new PageImpl<>(usersDTO);
		return pageUsuariosDTO;
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("getUsuario/{email}")
	UsuarioDTO getUsuarioByEmail(@PathVariable String email)
	{
		ModelMapper modelMapper = new ModelMapper();
		UsuarioDTO  usuarioDTO = modelMapper.map( usuarioService.findByEmail(email), UsuarioDTO.class);
		return usuarioDTO;
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PutMapping
    public boolean put() {
        return true;
    }
	
	@PostMapping("registrar")
    public Usuario post(@RequestBody Usuario newUsuario) {
		Usuario agregado = usuarioService.addUser(newUsuario);
        if(agregado != null)
        {
        	return agregado;
        }else
        {
        	throw new UsuarioAlreadyExsistsException(newUsuario.getEmail());
        }
    }
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping
    public boolean delete() {
		usuarioService.deleteAllUsers();
        return true;
    }
	
	@GetMapping("getRol/{email}")
	public RolDTO getRol(@PathVariable String email)
	{
		ModelMapper modelMapper = new ModelMapper();
		RolDTO  rolDTO = modelMapper.map( usuarioService.getRol(email), RolDTO.class);
		return rolDTO;
	}
	
}
