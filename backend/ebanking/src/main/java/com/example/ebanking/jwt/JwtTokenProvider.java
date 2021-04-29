package com.example.ebanking.jwt;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {

	@Value("${app.jwt.secret}")
	private String jwtSecret;

	@Value("${app.jwt.token.prefix}")
	private String jwtTokenPrefix;

	@Value("${app.jwt.header.string}")
	private String jwtHeaderString;

	@Value("${app.jwt.expiration-in-ms}")
	private Long jwtExpirationInMs;

	public String generateToken(Authentication authentication) {
		String auth = authentication.getAuthorities().stream().map(
				GrantedAuthority :: getAuthority).collect(Collectors.joining());
		return Jwts.builder().setSubject(authentication.getName())
				.claim("roles", auth)
				.setExpiration(new Date(System.currentTimeMillis()+jwtExpirationInMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public Authentication getAuthentication(HttpServletRequest request) {
		String token = resolverToken(request);
		if(token == null) {
			return null;
		}
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		String username = claims.getSubject();
		List<GrantedAuthority> authorities = Arrays.stream(claims.get("roles").toString().split(","))
				.map(role -> role.startsWith("ROLE_")? role:"ROLE_"+role)
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		return username != null ? new UsernamePasswordAuthenticationToken(username, null, authorities):null;
	}

	private String resolverToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(jwtHeaderString);
		if(bearerToken != null && bearerToken.startsWith(jwtTokenPrefix)) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

	public boolean validateToken(HttpServletRequest request) {
		String token = resolverToken(request);
		if(token == null) {
			return false;
		}
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		if(claims.getExpiration().before(new Date())) {
			return false;
		}
		return true;
	}

}
