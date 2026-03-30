package com.iamchef.backend.repository;

import com.iamchef.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Questa interfaccia gestisce tutte le operazioni sul database per la tabella "users"
// Estendendo JpaRepository otteniamo automaticamente metodi come save(), findAll(), deleteById(), ecc.
public interface UserRepository extends JpaRepository<User, Long> {

    // Cerca un utente per email e restituisce un Optional (puo' essere vuoto se non trovato)
    Optional<User> findByEmail(String email);

    // Controlla se esiste gia' un utente con questa email (usato durante la registrazione)
    boolean existsByEmail(String email);

    // Controlla se esiste gia' un utente con questo username (usato durante la registrazione)
    boolean existsByUsername(String username);
}
