package com.iamchef.backend.service;

import com.iamchef.backend.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SpoonacularService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl;

    public SpoonacularService(RestTemplate restTemplate,
                              @Value("${spoonacular.api.key}") String apiKey,
                              @Value("${spoonacular.api.base-url}") String baseUrl) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public String searchIngredients(String query, int number) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/food/ingredients/search")
                .queryParam("apiKey", apiKey)
                .queryParam("query", query)
                .queryParam("number", number)
                .toUriString();
        return callSpoonacular(url);
    }

    public String findRecipesByIngredients(String ingredients, int number) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/recipes/findByIngredients")
                .queryParam("apiKey", apiKey)
                .queryParam("ingredients", ingredients)
                .queryParam("number", number)
                .toUriString();
        return callSpoonacular(url);
    }

    public String getRecipeById(int id) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/recipes/" + id + "/information")
                .queryParam("apiKey", apiKey)
                .queryParam("includeNutrition", false)
                .toUriString();
        return callSpoonacular(url);
    }

    private String callSpoonacular(String url) {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (HttpClientErrorException e) {
            // 4xx errors from Spoonacular (401 = bad key, 402 = quota exceeded, etc.)
            String body = e.getResponseBodyAsString();
            System.err.println("Spoonacular client error " + e.getStatusCode() + ": " + body);
            throw new ApiException("Spoonacular API error: " + e.getStatusCode() + " - " + body,
                    HttpStatus.BAD_GATEWAY);
        } catch (HttpServerErrorException e) {
            System.err.println("Spoonacular server error " + e.getStatusCode() + ": " + e.getResponseBodyAsString());
            throw new ApiException("Spoonacular server error: " + e.getStatusCode(),
                    HttpStatus.BAD_GATEWAY);
        } catch (RestClientException e) {
            System.err.println("Spoonacular connection error: " + e.getMessage());
            throw new ApiException("Cannot connect to Spoonacular: " + e.getMessage(),
                    HttpStatus.BAD_GATEWAY);
        }
    }
}
