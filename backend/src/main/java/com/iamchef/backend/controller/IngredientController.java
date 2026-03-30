package com.iamchef.backend.controller;

import com.iamchef.backend.service.SpoonacularService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Questo controller gestisce le richieste HTTP per la ricerca degli ingredienti
// Tutte le rotte iniziano con /api/ingredients
@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final SpoonacularService spoonacularService;

    public IngredientController(SpoonacularService spoonacularService) {
        this.spoonacularService = spoonacularService;
    }

    // Questa parte gestisce la ricerca di ingredienti (/api/ingredients/search)
    // Es: /api/ingredients/search?query=tomato&number=10 -> cerca ingredienti con "tomato"
    @GetMapping("/search")
    public ResponseEntity<String> search(@RequestParam String query,
                                         @RequestParam(defaultValue = "10") int number) {
        String result = spoonacularService.searchIngredients(query, number);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(result);
    }
}
