package com.example.springdata.springjpa.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Rol;
import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.repository.UserRepositoryWithQuery;

@Service
public class UsuarioServiceImpl implements UsuarioService {
	
	@Autowired
	private UserRepositoryWithQuery userRepository;
	
	@Override
	public Iterable<Usuario> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public Usuario findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public void deleteAllUsers() {
		userRepository.deleteAll();
		
	}

	@Override
	public Usuario AddUser(Usuario newUsuario) {
		return userRepository.save(newUsuario);
	}

	@Override
	public Rol getRol(String email) {
		return userRepository.findRolByUsuario(email);
	}

}
