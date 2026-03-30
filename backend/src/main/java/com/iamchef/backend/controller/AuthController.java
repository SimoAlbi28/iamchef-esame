package com.iamchef.backend.controller;

import com.iamchef.backend.dto.AuthResponse;
import com.iamchef.backend.dto.LoginRequest;
import com.iamchef.backend.dto.RegisterRequest;
import com.iamchef.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Questo controller gestisce le richieste HTTP per l'autenticazione (login e registrazione)
// Tutte le rotte iniziano con /api/auth
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Questa parte gestisce la richiesta POST per la registrazione (/api/auth/register)
    // @Valid controlla che i dati inviati rispettino le regole di validazione del RegisterRequest
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    // Questa parte gestisce la richiesta POST per il login (/api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
