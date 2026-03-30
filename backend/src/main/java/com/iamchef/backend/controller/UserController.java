package com.iamchef.backend.controller;

import com.iamchef.backend.dto.UserProfileDto;
import com.iamchef.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// Questo controller gestisce le richieste HTTP per il profilo utente
// Tutte le rotte iniziano con /api/users
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Questa parte gestisce la richiesta GET per vedere il proprio profilo (/api/users/me)
    // L'oggetto Authentication contiene i dati dell'utente loggato (estratti dal token JWT)
    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getProfile(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(userService.getProfile(email));
    }

    // Questa parte gestisce la richiesta PUT per aggiornare il proprio profilo (/api/users/me)
    @PutMapping("/me")
    public ResponseEntity<UserProfileDto> updateProfile(Authentication authentication,
                                                        @RequestBody UserProfileDto dto) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(userService.updateProfile(email, dto));
    }
}
