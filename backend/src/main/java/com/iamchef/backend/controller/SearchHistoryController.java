package com.iamchef.backend.controller;

import com.iamchef.backend.entity.SearchHistory;
import com.iamchef.backend.service.SearchHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Questo controller gestisce le richieste HTTP per la cronologia delle ricerche
// Tutte le rotte iniziano con /api/history
@RestController
@RequestMapping("/api/history")
public class SearchHistoryController {

    private final SearchHistoryService searchHistoryService;

    public SearchHistoryController(SearchHistoryService searchHistoryService) {
        this.searchHistoryService = searchHistoryService;
    }

    // Questa parte restituisce la cronologia delle ricerche dell'utente (GET /api/history)
    // Converte ogni ricerca in una mappa con id, ingredienti, numero risultati e data
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getHistory(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        List<SearchHistory> history = searchHistoryService.getHistory(email);

        // Trasforma ogni oggetto SearchHistory in una mappa leggibile dal frontend
        List<Map<String, Object>> result = history.stream()
                .map(h -> Map.<String, Object>of(
                        "id", h.getId(),
                        "ingredients", h.getIngredients(),
                        "resultCount", h.getResultCount(),
                        "searchedAt", h.getSearchedAt().toString()
                ))
                .toList();

        return ResponseEntity.ok(result);
    }

    // Questa parte cancella tutta la cronologia delle ricerche dell'utente (DELETE /api/history)
    @DeleteMapping
    public ResponseEntity<Void> clearHistory(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        searchHistoryService.clearHistory(email);
        return ResponseEntity.noContent().build();
    }
}
