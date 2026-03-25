package com.iamchef.backend.repository;

import com.iamchef.backend.entity.FavoriteRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Long> {
    List<FavoriteRecipe> findAllByUserId(Long userId);
    Optional<FavoriteRecipe> findByUserIdAndSpoonacularId(Long userId, Integer spoonacularId);
    void deleteByUserIdAndSpoonacularId(Long userId, Integer spoonacularId);
    boolean existsByUserIdAndSpoonacularId(Long userId, Integer spoonacularId);
}
