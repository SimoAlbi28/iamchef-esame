package com.iamchef.backend.service;

import com.iamchef.backend.dto.UserProfileDto;
import com.iamchef.backend.entity.User;
import com.iamchef.backend.exception.ApiException;
import com.iamchef.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

// Questa classe gestisce la logica del profilo utente: visualizzazione e modifica
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Questa parte recupera il profilo dell'utente a partire dalla sua email
    // e lo restituisce come DTO (oggetto con solo i dati necessari al frontend)
    public UserProfileDto getProfile(String email) {
        User user = findByEmail(email);
        return new UserProfileDto(user.getId(), user.getUsername(), user.getEmail(), user.getDietaryPreferences());
    }

    // Questa parte aggiorna il profilo dell'utente (username e/o preferenze alimentari)
    public UserProfileDto updateProfile(String email, UserProfileDto dto) {
        User user = findByEmail(email);

        // Aggiorna lo username solo se e' stato fornito e non e' vuoto
        if (dto.getUsername() != null && !dto.getUsername().isBlank()) {
            user.setUsername(dto.getUsername());
        }
        // Aggiorna le preferenze alimentari se sono state fornite
        if (dto.getDietaryPreferences() != null) {
            user.setDietaryPreferences(dto.getDietaryPreferences());
        }

        // Salva le modifiche nel database e restituisce il profilo aggiornato
        userRepository.save(user);
        return new UserProfileDto(user.getId(), user.getUsername(), user.getEmail(), user.getDietaryPreferences());
    }

    // Metodo di utilita': cerca un utente per email, se non lo trova lancia un errore 404
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }
}
