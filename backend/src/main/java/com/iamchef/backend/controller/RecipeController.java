package com.iamchef.backend.controller;

import com.iamchef.backend.service.SearchHistoryService;
import com.iamchef.backend.service.SpoonacularService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

// Questo controller gestisce le richieste HTTP per le ricette
// Tutte le rotte iniziano con /api/recipes
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final SpoonacularService spoonacularService;
    private final SearchHistoryService searchHistoryService;

    public RecipeController(SpoonacularService spoonacularService, SearchHistoryService searchHistoryService) {
        this.spoonacularService = spoonacularService;
        this.searchHistoryService = searchHistoryService;
    }

    // Questa parte gestisce la ricerca di ricette per ingredienti (/api/recipes/findByIngredients)
    // Es: /api/recipes/findByIngredients?ingredients=pomodoro,mozzarella&number=10
    @GetMapping("/findByIngredients")
    public ResponseEntity<String> findByIngredients(@RequestParam String ingredients,
                                                    @RequestParam(defaultValue = "10") int number) {
        // Chiama l'API Spoonacular per cercare le ricette
        String result = spoonacularService.findRecipesByIngredients(ingredients, number);

        // Se l'utente e' autenticato, salva la ricerca nella cronologia
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof String email && !email.equals("anonymousUser")) {
            try {
                // Conta quanti risultati sono stati trovati (stima basata sul JSON)
                int resultCount = result.split("\"id\"").length - 1;
                searchHistoryService.saveSearch(email, ingredients, resultCount);
            } catch (Exception ignored) {
                // Se il salvataggio della cronologia fallisce, non blocchiamo la risposta
            }
        }

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(result);
    }

    // Questa parte recupera i dettagli di una singola ricetta dato il suo ID (/api/recipes/{id})
    // Es: /api/recipes/123 -> restituisce tutti i dettagli della ricetta con ID 123
    @GetMapping("/{id}")
    public ResponseEntity<String> getRecipeById(@PathVariable int id) {
        String result = spoonacularService.getRecipeById(id);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(result);
    }
}
