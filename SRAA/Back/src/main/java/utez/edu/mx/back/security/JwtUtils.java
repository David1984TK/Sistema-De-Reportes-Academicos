package utez.edu.mx.back.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Long expiration;
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    public String generateToken(String correo, String rol, Long id) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", rol);
        claims.put("id", id);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(correo)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractCorreo(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public String extractRol(String token) {
        return extractClaim(token, claims -> claims.get("rol", String.class));
    }
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    public Boolean validateToken(String token, String correo) {
        final String extractedCorreo = extractCorreo(token);
        return (extractedCorreo.equals(correo) && !isTokenExpired(token));
    }
}