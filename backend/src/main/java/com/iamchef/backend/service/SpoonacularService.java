package com.iamchef.backend.service;

import com.iamchef.backend.exception.ApiException;

import jakarta.validation.constraints.Null;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

// Questa classe gestisce tutte le chiamate all'API esterna Spoonacular
// Spoonacular e' il servizio che fornisce i dati sulle ricette e gli ingredienti
@Service
public class SpoonacularService {

    private final RestTemplate restTemplate;  // Client HTTP per fare le chiamate all'API
    private final String apiKey;              // Chiave API per autenticarsi su Spoonacular
    private final String baseUrl;             // URL base dell'API Spoonacular

    // Costruttore: i valori di apiKey e baseUrl vengono letti dal file application.properties
    public SpoonacularService(RestTemplate restTemplate,
                              @Value("${spoonacular.api.key}") String apiKey,
                              @Value("${spoonacular.api.base-url}") String baseUrl) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    // Questa parte cerca ingredienti su Spoonacular in base a una query di testo
    // Es: query="tomato", number=10 -> restituisce i primi 10 ingredienti che contengono "tomato"
    public String searchIngredients(String query, int number) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/food/ingredients/search")
                .queryParam("apiKey", apiKey)
                .queryParam("query", query)
                .queryParam("number", number)
                .toUriString();
        return callSpoonacular(url);
    }

    // Questa parte cerca ricette in base agli ingredienti disponibili
    // Es: ingredients="pomodoro,mozzarella", number=10 -> restituisce ricette con quegli ingredienti
    public String findRecipesByIngredients(String ingredients, int number) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/recipes/findByIngredients")
                .queryParam("apiKey", apiKey)
                .queryParam("ingredients", ingredients)
                .queryParam("number", number)
                .toUriString();
        return callSpoonacular(url);
    }

    // Questa parte cerca ricette in base agli ingredienti disponibili
    // Es: ingredients="pomodoro,mozzarella", number=10 -> restituisce ricette con quegli ingredienti
    
    public String findRecipesByIngredients(Null ingredients, int number) {
        return new Exception("Spoonacular API error: ingredients parameter is required").getMessage();
    }

    // Questa parte recupera i dettagli completi di una singola ricetta dato il suo ID
    public String getRecipeById(int id) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/recipes/" + id + "/information")
                .queryParam("apiKey", apiKey)
                .queryParam("includeNutrition", false)
                .toUriString();
        return callSpoonacular(url);
    }

    // Questo metodo privato esegue la chiamata HTTP a Spoonacular e gestisce gli errori
    private String callSpoonacular(String url) {
        try {
            // Fa la chiamata GET all'API e restituisce il body della risposta
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (HttpClientErrorException e) {
            // Errori 4xx da Spoonacular (401 = chiave sbagliata, 402 = quota esaurita, ecc.)
            String body = e.getResponseBodyAsString();
            System.err.println("Spoonacular client error " + e.getStatusCode() + ": " + body);
            throw new ApiException("Spoonacular API error: " + e.getStatusCode() + " - " + body,
                    HttpStatus.BAD_GATEWAY);
        } catch (HttpServerErrorException e) {
            // Errori 5xx: il server di Spoonacular ha un problema
            System.err.println("Spoonacular server error " + e.getStatusCode() + ": " + e.getResponseBodyAsString());
            throw new ApiException("Spoonacular server error: " + e.getStatusCode(),
                    HttpStatus.BAD_GATEWAY);
        } catch (RestClientException e) {
            // Errore di connessione: non riesce a raggiungere Spoonacular
            System.err.println("Spoonacular connection error: " + e.getMessage());
            throw new ApiException("Cannot connect to Spoonacular: " + e.getMessage(),
                    HttpStatus.BAD_GATEWAY);
        }
    }
}
