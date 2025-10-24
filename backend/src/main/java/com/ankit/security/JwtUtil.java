package com.ankit.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ankit.model.User;
import com.ankit.repo.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET = "mysecretkeymysecretkeymysecretkey123"; 
	private final long EXPIRATION_TIME = 86400000; // 1 day
	

	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(SECRET.getBytes());
	}

//	public String generateToken(String email) {
//		return Jwts.builder().setSubject(email).setIssuedAt(new Date())
//				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//				.signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
//	}
	
	
	// include user role in the token
	public String generateToken(User user) {
	    Map<String, Object> claims = new HashMap<>();
	    claims.put("role", user.getRole());
	    claims.put("id", user.getId());
	    return createToken(claims, user.getEmail());
	}

	private String createToken(Map<String, Object> claims, String subject) {
	    return Jwts.builder()
	            .setClaims(claims)
	            .setSubject(subject)
	            .setIssuedAt(new Date(System.currentTimeMillis()))
	            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
	            .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
	}
	public String extractUsername(String token) {
		return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token, String email) {
		return email.equals(extractUsername(token)) && !isTokenExpired(token);
	}

	private boolean isTokenExpired(String token) {
		Date expiration = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody()
				.getExpiration();
		return expiration.before(new Date());
	}
}
