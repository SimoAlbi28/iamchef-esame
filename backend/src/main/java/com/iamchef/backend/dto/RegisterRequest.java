package com.iamchef.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Questa classe rappresenta i dati che il frontend invia quando un utente si registra
// Contiene username, email e password con le relative validazioni
public class RegisterRequest {

    // Username: non puo' essere vuoto, minimo 2 caratteri, massimo 50
    @NotBlank
    @Size(min = 2, max = 50)
    private String username;

    // Email: non puo' essere vuota e deve essere un formato email valido
    @NotBlank
    @Email
    private String email;

    // Password: non puo' essere vuota, minimo 6 caratteri
    @NotBlank
    @Size(min = 6)
    private String password;

    // Getter e Setter
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
