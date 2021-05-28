package com.example.springdata.springjpa.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter{

	@Autowired
	UserDetailsService userDetailsService;
	
	@Override
	public void configure(HttpSecurity httpSecurity) throws Exception
	{
		/*

		 * 1. Se desactiva el uso de cookies

		 * 2. Se activa la configuración CORS con los valores por defecto

		 * 3. Se desactiva el filtro CSRF

		 * 4. Se indica que el login no requiere autenticación

		 * 5. Se indica que el resto de URLs esten securizadas

		 */
		httpSecurity
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
		.cors().and()
		.headers().frameOptions().disable().and()
		.csrf().disable()
		.authorizeRequests().antMatchers("/h2/**", "/login", "/usuarios/registrar").permitAll()
		.anyRequest().authenticated().and()
		.addFilter(new JWTAuthenticationFilter(authenticationManager()))
		.addFilter(new JWTAuthorizationFilter(authenticationManager()));
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {

		return new BCryptPasswordEncoder();

	}
}
