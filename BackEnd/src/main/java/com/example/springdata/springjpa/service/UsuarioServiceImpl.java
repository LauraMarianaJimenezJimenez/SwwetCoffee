package com.example.springdata.springjpa.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Rol;
import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.repository.RolRepository;
import com.example.springdata.springjpa.repository.UserRepositoryWithQuery;

@Service
public class UsuarioServiceImpl implements UsuarioService {
	
	@Autowired
	private UserRepositoryWithQuery userRepository;
	
	@Autowired
	private RolRepository rolRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
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
	public Usuario addUser(Usuario newUsuario) {
		
		if(userRepository.findByEmail(newUsuario.getEmail()) == null)
		{
			newUsuario.setContrasena(bCryptPasswordEncoder.encode(newUsuario.getContrasena()));
			newUsuario.setRol(rolRepository.findByNombre("user"));
			return userRepository.save(newUsuario);
		}
		return null;	
	}

	@Override
	public Rol getRol(String email) {
		return userRepository.findRolByUsuario(email);
	}

}
