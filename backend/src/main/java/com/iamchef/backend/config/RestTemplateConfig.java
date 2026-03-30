package com.iamchef.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

// Questa classe crea un bean RestTemplate che viene usato per fare chiamate HTTP verso API esterne
// In questo progetto viene usato dal SpoonacularService per comunicare con l'API Spoonacular
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
