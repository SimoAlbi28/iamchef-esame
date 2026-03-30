package com.iamchef.backend.repository;

import com.iamchef.backend.entity.FavoriteRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Questa interfaccia gestisce tutte le operazioni sul database per la tabella "favorite_recipes"
public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Long> {

    // Recupera tutti i preferiti di un utente dato il suo ID
    List<FavoriteRecipe> findAllByUserId(Long userId);

    // Cerca un preferito specifico di un utente per una determinata ricetta
    Optional<FavoriteRecipe> findByUserIdAndSpoonacularId(Long userId, Integer spoonacularId);

    // Elimina un preferito specifico di un utente per una determinata ricetta
    void deleteByUserIdAndSpoonacularId(Long userId, Integer spoonacularId);

    // Controlla se un utente ha gia' questa ricetta nei preferiti
    boolean existsByUserIdAndSpoonacularId(Long userId, Integer spoonacularId);
}
