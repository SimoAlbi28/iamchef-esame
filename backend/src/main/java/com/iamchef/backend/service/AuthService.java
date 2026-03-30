package com.iamchef.backend.service;

import com.iamchef.backend.dto.AuthResponse;
import com.iamchef.backend.dto.LoginRequest;
import com.iamchef.backend.dto.RegisterRequest;
import com.iamchef.backend.entity.User;
import com.iamchef.backend.exception.ApiException;
import com.iamchef.backend.repository.UserRepository;
import com.iamchef.backend.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// Questa classe gestisce la logica di autenticazione: registrazione e login
@Service
public class AuthService {

    private final UserRepository userRepository;       // Per accedere ai dati degli utenti nel database
    private final PasswordEncoder passwordEncoder;     // Per criptare e verificare le password
    private final JwtUtil jwtUtil;                     // Per generare i token JWT

    // Costruttore: Spring inietta automaticamente le dipendenze
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Questa parte gestisce la registrazione di un nuovo utente
    public AuthResponse register(RegisterRequest request) {
        // Controlla se l'email e' gia' registrata
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Email already registered", HttpStatus.CONFLICT);
        }
        // Controlla se lo username e' gia' in uso
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ApiException("Username already taken", HttpStatus.CONFLICT);
        }

        // Crea un nuovo utente con la password criptata e lo salva nel database
        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );
        userRepository.save(user);

        // Genera un token JWT e restituisce la risposta con token, username e email
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail());
    }

    // Questa parte gestisce il login di un utente esistente
    public AuthResponse login(LoginRequest request) {
        // Cerca l'utente per email, se non esiste lancia un errore
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException("Invalid credentials", HttpStatus.UNAUTHORIZED));

        // Confronta la password inserita con quella salvata (criptata) nel database
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ApiException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        // Se tutto e' corretto, genera un token JWT e restituisce la risposta
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail());
    }
}
