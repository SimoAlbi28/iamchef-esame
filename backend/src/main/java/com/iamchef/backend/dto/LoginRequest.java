package com.iamchef.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Questa classe rappresenta i dati che il frontend invia quando un utente fa il login
// Contiene email e password
public class LoginRequest {

    // Email dell'utente: non puo' essere vuota e deve essere un formato email valido
    @NotBlank
    @Email
    private String email;

    // Password dell'utente: non puo' essere vuota
    @NotBlank
    private String password;

    // Getter e Setter
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
