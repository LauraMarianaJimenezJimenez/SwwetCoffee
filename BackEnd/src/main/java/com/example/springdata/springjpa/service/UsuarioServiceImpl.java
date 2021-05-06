package com.example.springdata.springjpa.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Rol;
import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.repository.UserRepositoryWithQuery;

@Service
public class UsuarioServiceImpl implements UsuarioService {
	
	@Autowired
	private UserRepositoryWithQuery userRepository;
	
	@Override
	public Page<Usuario> getAllUsers(PageRequest pageRequest) {
		return userRepository.findAll(pageRequest);
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
