package com.iamchef.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

// Questa classe gestisce tutto cio' che riguarda i token JWT (JSON Web Token)
// I token JWT servono per autenticare gli utenti senza dover usare sessioni lato server
@Component
public class JwtUtil {

    // Chiave segreta usata per firmare i token (letta da application.properties)
    private final SecretKey key;
    // Durata di validita' del token in millisecondi (letta da application.properties)
    private final long expirationMs;

    // Costruttore: crea la chiave di firma a partire dalla stringa segreta
    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.expiration-ms}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    // Questa parte genera un nuovo token JWT per un utente dato la sua email
    // Il token contiene: l'email (subject), la data di creazione e la data di scadenza
    public String generateToken(String email) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(email)          // Chi e' l'utente
                .issuedAt(now)           // Quando e' stato creato il token
                .expiration(expiry)      // Quando scade il token
                .signWith(key)           // Firma il token con la chiave segreta
                .compact();              // Costruisce la stringa del token
    }

    // Questa parte estrae l'email dell'utente da un token JWT
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // Questa parte verifica se un token e' valido (non scaduto e firmato correttamente)
    // Restituisce true se valido, false se scaduto o manomesso
    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Metodo privato: decodifica il token e ne estrae i "claims" (i dati contenuti)
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)             // Verifica la firma con la chiave segreta
                .build()
                .parseSignedClaims(token)    // Decodifica il token
                .getPayload();               // Restituisce i dati contenuti
    }
}
