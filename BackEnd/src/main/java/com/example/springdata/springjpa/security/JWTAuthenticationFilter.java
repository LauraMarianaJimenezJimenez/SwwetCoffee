package com.example.springdata.springjpa.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

import java.util.ArrayList;

import java.util.Date;


import javax.servlet.FilterChain;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;


import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;

import org.springframework.security.core.AuthenticationException;

import org.springframework.security.core.userdetails.User;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.springdata.springjpa.model.Usuario;
import com.fasterxml.jackson.databind.ObjectMapper;


import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			Usuario credenciales = new ObjectMapper().readValue(request.getInputStream(), Usuario.class);

			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					credenciales.getEmail(), credenciales.getContrasena(), new ArrayList<>()));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, 
			HttpServletResponse response, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

		String token = Jwts.builder()
				.setIssuedAt(new Date())
				.setIssuer("miAplicacion")
				.setSubject(((User)auth.getPrincipal()).getUsername())
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS512, "12345")
				.compact();

		response.addHeader("Authorization", "Bearer "+ token);

	}

}