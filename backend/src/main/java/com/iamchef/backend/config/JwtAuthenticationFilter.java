package com.iamchef.backend.config;

import com.iamchef.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

// Questo filtro viene eseguito ad ogni richiesta HTTP
// Controlla se la richiesta contiene un token JWT valido nell'header "Authorization"
// Se il token e' valido, autentica l'utente per quella richiesta
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Legge l'header "Authorization" dalla richiesta HTTP
        String authHeader = request.getHeader("Authorization");

        // Controlla se l'header esiste e inizia con "Bearer " (formato standard per JWT)
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Estrae il token rimuovendo il prefisso "Bearer "
            String token = authHeader.substring(7);

            // Verifica che il token sia valido (non scaduto e firmato correttamente)
            if (jwtUtil.isTokenValid(token)) {
                // Estrae l'email dell'utente dal token
                String email = jwtUtil.extractEmail(token);
                // Crea un oggetto di autenticazione e lo imposta nel contesto di sicurezza
                // Cosi' Spring Security sa che l'utente e' autenticato per questa richiesta
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // Passa la richiesta al filtro successivo nella catena
        filterChain.doFilter(request, response);
    }
}
