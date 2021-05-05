package com.example.springdata.springjpa.security.services;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.repository.UserRepositoryWithQuery;
import static java.util.Collections.emptyList;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

	private UserRepositoryWithQuery usuarioRepository;

	public UsuarioDetailsServiceImpl(UserRepositoryWithQuery usuarioRepository) {

		this.usuarioRepository = usuarioRepository;

	}

	@Transactional
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Usuario usuario = usuarioRepository.findByEmail(email);

		if (usuario == null) {

			throw new UsernameNotFoundException(email);

		}

		return new User(usuario.getEmail(), usuario.getContrasena(), getAuthorities(usuario));

	}
	
	private List<SimpleGrantedAuthority> getAuthorities(Usuario usuario)
	{
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_"+usuario.getRol().getNombre().toUpperCase()));
		
		return authorities;
	}
}