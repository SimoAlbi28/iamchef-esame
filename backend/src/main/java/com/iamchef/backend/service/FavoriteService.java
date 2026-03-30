package com.iamchef.backend.service;

import com.iamchef.backend.dto.FavoriteRecipeDto;
import com.iamchef.backend.entity.FavoriteRecipe;
import com.iamchef.backend.entity.User;
import com.iamchef.backend.exception.ApiException;
import com.iamchef.backend.repository.FavoriteRecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// Questa classe gestisce la logica delle ricette preferite (aggiungere, rimuovere, visualizzare)
@Service
public class FavoriteService {

    private final FavoriteRecipeRepository favoriteRepository;
    private final UserService userService;

    public FavoriteService(FavoriteRecipeRepository favoriteRepository, UserService userService) {
        this.favoriteRepository = favoriteRepository;
        this.userService = userService;
    }

    // Questa parte recupera tutti i preferiti dell'utente e li converte in DTO per il frontend
    public List<FavoriteRecipeDto> getFavorites(String email) {
        User user = userService.findByEmail(email);
        return favoriteRepository.findAllByUserId(user.getId()).stream()
                .map(f -> new FavoriteRecipeDto(f.getSpoonacularId(), f.getTitle(), f.getImage(), f.getSavedAt()))
                .toList();
    }

    // Questa parte aggiunge una ricetta ai preferiti dell'utente
    // Se la ricetta e' gia' nei preferiti, lancia un errore di conflitto (409)
    public FavoriteRecipeDto addFavorite(String email, FavoriteRecipeDto dto) {
        User user = userService.findByEmail(email);

        if (favoriteRepository.existsByUserIdAndSpoonacularId(user.getId(), dto.getSpoonacularId())) {
            throw new ApiException("Recipe already in favorites", HttpStatus.CONFLICT);
        }

        FavoriteRecipe favorite = new FavoriteRecipe(user, dto.getSpoonacularId(), dto.getTitle(), dto.getImage());
        favoriteRepository.save(favorite);
        return new FavoriteRecipeDto(favorite.getSpoonacularId(), favorite.getTitle(), favorite.getImage(), favorite.getSavedAt());
    }

    // Questa parte rimuove una ricetta dai preferiti dell'utente
    @Transactional
    public void removeFavorite(String email, Integer spoonacularId) {
        User user = userService.findByEmail(email);
        favoriteRepository.deleteByUserIdAndSpoonacularId(user.getId(), spoonacularId);
    }

    // Questa parte controlla se una ricetta e' gia' nei preferiti dell'utente (restituisce true/false)
    public boolean isFavorite(String email, Integer spoonacularId) {
        User user = userService.findByEmail(email);
        return favoriteRepository.existsByUserIdAndSpoonacularId(user.getId(), spoonacularId);
    }
}
