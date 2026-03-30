package com.iamchef.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Questa e' la classe principale che avvia tutta l'applicazione Spring Boot
@SpringBootApplication
public class IamChefBackendApplication {

    // Questo e' il metodo main: il punto di partenza dell'applicazione
    public static void main(String[] args) {
        SpringApplication.run(IamChefBackendApplication.class, args);
    }
}
