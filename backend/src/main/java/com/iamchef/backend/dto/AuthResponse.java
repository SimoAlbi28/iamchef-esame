package com.iamchef.backend.dto;

// Questa classe rappresenta la risposta che il server invia dopo login o registrazione
// Contiene il token JWT (per autenticarsi nelle richieste future), username e email
public class AuthResponse {

    // Token JWT: serve al frontend per dimostrare che l'utente e' autenticato
    private String token;
    // Username dell'utente
    private String username;
    // Email dell'utente
    private String email;

    // Costruttore: crea la risposta con token, username e email
    public AuthResponse(String token, String username, String email) {
        this.token = token;
        this.username = username;
        this.email = email;
    }

    // Getter: metodi per leggere i campi
    public String getToken() { return token; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}
