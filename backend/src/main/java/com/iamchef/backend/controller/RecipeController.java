package com.iamchef.backend.controller;

import com.iamchef.backend.service.SearchHistoryService;
import com.iamchef.backend.service.SpoonacularService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final SpoonacularService spoonacularService;
    private final SearchHistoryService searchHistoryService;

    public RecipeController(SpoonacularService spoonacularService, SearchHistoryService searchHistoryService) {
        this.spoonacularService = spoonacularService;
        this.searchHistoryService = searchHistoryService;
    }

    @GetMapping("/findByIngredients")
    public ResponseEntity<String> findByIngredients(@RequestParam String ingredients,
                                                    @RequestParam(defaultValue = "10") int number) {
        String result = spoonacularService.findRecipesByIngredients(ingredients, number);

        // Save search history if user is authenticated
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof String email && !email.equals("anonymousUser")) {
            try {
                // Count results (basic JSON array length estimation)
                int resultCount = result.split("\"id\"").length - 1;
                searchHistoryService.saveSearch(email, ingredients, resultCount);
            } catch (Exception ignored) {
                // Don't fail the request if history save fails
            }
        }

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getRecipeById(@PathVariable int id) {
        String result = spoonacularService.getRecipeById(id);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(result);
    }
}
