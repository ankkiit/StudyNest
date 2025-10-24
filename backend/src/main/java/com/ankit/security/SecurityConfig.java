package com.ankit.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> {
		}).csrf(

				csrf -> csrf.disable()) // disable CSRF (useful for Postman/testing)

				.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll() // public endpoints
						.requestMatchers("/courses/create", "/lessons/add/**", "/quiz/create/**", "/questions/add/**")
						.hasRole("TEACHER") // only TEACHER can create courses
						.requestMatchers("/quiz/submission/**").hasRole("STUDENT")

						.requestMatchers("/enroll/**", "/questions/quiz/**", "/quiz/course/**").hasRole("STUDENT") // only
																													// STUDENT
																													// can
																													// enroll
						.anyRequest().authenticated() // all other endpoints require authentication
				).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // stateless
																												// session
				);
		// .httpBasic(httpBasic -> httpBasic.disable()); // disable default Basic Auth

		// Add JWT filter before the UsernamePasswordAuthenticationFilter
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:5173","https://study-nest-six.vercel.app")); // frontend origin
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
