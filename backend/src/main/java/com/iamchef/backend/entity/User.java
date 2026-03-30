package com.iamchef.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

// Questa classe rappresenta la tabella "users" nel database
// Ogni oggetto User corrisponde a una riga nella tabella
@Entity
@Table(name = "users")
public class User {

    // Questo e' l'ID univoco dell'utente, viene generato automaticamente dal database
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Username dell'utente: deve essere unico e non puo' essere vuoto, massimo 50 caratteri
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    // Email dell'utente: deve essere unica e non puo' essere vuota
    @Column(unique = true, nullable = false)
    private String email;

    // Password criptata dell'utente (non viene salvata in chiaro)
    @Column(nullable = false)
    private String passwordHash;

    // Preferenze alimentari dell'utente (es. vegetariano, vegano, ecc.)
    private String dietaryPreferences;

    // Data e ora in cui l'utente e' stato creato
    private LocalDateTime createdAt;

    // Data e ora dell'ultimo aggiornamento del profilo
    private LocalDateTime updatedAt;

    // Questo metodo viene chiamato automaticamente quando si crea un nuovo utente nel database
    // Imposta la data di creazione e di aggiornamento al momento attuale
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    // Questo metodo viene chiamato automaticamente quando si modifica un utente gia' esistente
    // Aggiorna la data di ultimo aggiornamento
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Costruttore vuoto: necessario per JPA (il framework che gestisce il database)
    public User() {}

    // Costruttore con parametri: usato per creare un nuovo utente con username, email e password
    public User(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    // Getter e Setter: metodi per leggere e modificare i campi dell'utente
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getDietaryPreferences() { return dietaryPreferences; }
    public void setDietaryPreferences(String dietaryPreferences) { this.dietaryPreferences = dietaryPreferences; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
