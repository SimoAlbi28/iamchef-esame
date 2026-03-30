package com.iamchef.backend.controller;

import com.iamchef.backend.dto.FavoriteRecipeDto;
import com.iamchef.backend.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Questo controller gestisce le richieste HTTP per le ricette preferite
// Tutte le rotte iniziano con /api/favorites
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // Questa parte restituisce la lista di tutte le ricette preferite dell'utente (GET /api/favorites)
    @GetMapping
    public ResponseEntity<List<FavoriteRecipeDto>> getFavorites(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(favoriteService.getFavorites(email));
    }

    // Questa parte aggiunge una ricetta ai preferiti (POST /api/favorites)
    @PostMapping
    public ResponseEntity<FavoriteRecipeDto> addFavorite(Authentication authentication,
                                                         @RequestBody FavoriteRecipeDto dto) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(favoriteService.addFavorite(email, dto));
    }

    // Questa parte rimuove una ricetta dai preferiti (DELETE /api/favorites/{spoonacularId})
    @DeleteMapping("/{spoonacularId}")
    public ResponseEntity<Void> removeFavorite(Authentication authentication,
                                                @PathVariable Integer spoonacularId) {
        String email = (String) authentication.getPrincipal();
        favoriteService.removeFavorite(email, spoonacularId);
        return ResponseEntity.noContent().build();
    }

    // Questa parte controlla se una ricetta e' nei preferiti (GET /api/favorites/check/{spoonacularId})
    // Restituisce {"isFavorite": true} oppure {"isFavorite": false}
    @GetMapping("/check/{spoonacularId}")
    public ResponseEntity<Map<String, Boolean>> checkFavorite(Authentication authentication,
                                                               @PathVariable Integer spoonacularId) {
        String email = (String) authentication.getPrincipal();
        boolean isFavorite = favoriteService.isFavorite(email, spoonacularId);
        return ResponseEntity.ok(Map.of("isFavorite", isFavorite));
    }
}
