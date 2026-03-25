package com.iamchef.backend.controller;

import com.iamchef.backend.dto.FavoriteRecipeDto;
import com.iamchef.backend.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<List<FavoriteRecipeDto>> getFavorites(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(favoriteService.getFavorites(email));
    }

    @PostMapping
    public ResponseEntity<FavoriteRecipeDto> addFavorite(Authentication authentication,
                                                         @RequestBody FavoriteRecipeDto dto) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(favoriteService.addFavorite(email, dto));
    }

    @DeleteMapping("/{spoonacularId}")
    public ResponseEntity<Void> removeFavorite(Authentication authentication,
                                                @PathVariable Integer spoonacularId) {
        String email = (String) authentication.getPrincipal();
        favoriteService.removeFavorite(email, spoonacularId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check/{spoonacularId}")
    public ResponseEntity<Map<String, Boolean>> checkFavorite(Authentication authentication,
                                                               @PathVariable Integer spoonacularId) {
        String email = (String) authentication.getPrincipal();
        boolean isFavorite = favoriteService.isFavorite(email, spoonacularId);
        return ResponseEntity.ok(Map.of("isFavorite", isFavorite));
    }
}
