package com.iamchef.backend.exception;

import org.springframework.http.HttpStatus;

// Questa classe rappresenta un'eccezione personalizzata per gli errori dell'API
// Viene usata in tutto il progetto per lanciare errori con un messaggio e un codice HTTP specifico
// Es: new ApiException("User not found", HttpStatus.NOT_FOUND) -> errore 404
public class ApiException extends RuntimeException {

    // Il codice di stato HTTP associato all'errore (es. 404, 401, 409, ecc.)
    private final HttpStatus status;

    // Costruttore: crea l'eccezione con un messaggio di errore e un codice HTTP
    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
