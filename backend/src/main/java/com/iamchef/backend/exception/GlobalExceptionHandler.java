package com.iamchef.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

// Questa classe cattura tutte le eccezioni lanciate dai controller e le trasforma in risposte JSON
// Senza questa classe, Spring restituirebbe pagine di errore HTML poco utili per il frontend
@ControllerAdvice
public class GlobalExceptionHandler {

    // Questa parte gestisce le eccezioni personalizzate ApiException
    // Restituisce il messaggio di errore e il codice HTTP definito nell'eccezione
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handleApiException(ApiException ex) {
        return ResponseEntity.status(ex.getStatus()).body(Map.of(
                "error", ex.getMessage(),
                "status", ex.getStatus().value()
        ));
    }

    // Questa parte gestisce gli errori di validazione (es. email non valida, campo vuoto)
    // Raccoglie tutti gli errori di validazione e li restituisce come un unico messaggio
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .reduce((a, b) -> a + "; " + b)
                .orElse("Validation failed");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                "error", message,
                "status", 400
        ));
    }

    // Questa parte gestisce tutte le altre eccezioni non previste (errori generici)
    // Restituisce un errore 500 (Internal Server Error)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", ex.getMessage() != null ? ex.getMessage() : "Internal server error",
                "status", 500
        ));
    }
}
