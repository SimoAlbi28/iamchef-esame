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
        // Qui puoi tradurre i messaggi noti in italiano
        String msg;
        String original = ex.getMessage();
        if ("User not found".equals(original)) {
            msg = "Utente non trovato";
        } else if ("Invalid credentials".equals(original)) {
            msg = "Credenziali non valide";
        } else if ("Email already registered".equals(original)) {
            msg = "Email già registrata";
        } else if ("Username already taken".equals(original)) {
            msg = "Username già in uso";
        } else if ("Recipe already in favorites".equals(original)) {
            msg = "Ricetta già nei preferiti";
        } else if (original != null && original.startsWith("Spoonacular API error")) {
            msg = "Errore nell'API Spoonacular: " + original.replace("Spoonacular API error: ", "");
        } else if (original != null && original.startsWith("Spoonacular server error")) {
            msg = "Errore del server Spoonacular: " + original.replace("Spoonacular server error: ", "");
        } else if (original != null && original.startsWith("Cannot connect to Spoonacular")) {
            msg = "Impossibile connettersi a Spoonacular: " + original.replace("Cannot connect to Spoonacular: ", "");
        } else {
            msg = original;
        }
        return ResponseEntity.status(ex.getStatus()).body(Map.of(
                "errore", msg,
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
            .orElse("Validazione fallita");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
            "errore", message,
            "status", 400
        ));
        }

    // Questa parte gestisce tutte le altre eccezioni non previste (errori generici)
    // Restituisce un errore 500 (Internal Server Error)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "errore", ex.getMessage() != null ? ("Errore interno del server: " + ex.getMessage()) : "Errore interno del server",
                "status", 500
        ));
    }
}
