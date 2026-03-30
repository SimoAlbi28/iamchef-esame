package com.iamchef.backend.dto;

import java.time.LocalDateTime;

// Questa classe rappresenta i dati di una ricetta preferita che vengono inviati al frontend
// Contiene solo le info necessarie (senza dati sensibili come l'ID dell'utente)
public class FavoriteRecipeDto {

    // ID della ricetta su Spoonacular
    private Integer spoonacularId;
    // Titolo della ricetta
    private String title;
    // URL dell'immagine
    private String image;
    // Data in cui e' stata salvata come preferita
    private LocalDateTime savedAt;

    // Costruttore vuoto
    public FavoriteRecipeDto() {}

    // Costruttore con tutti i campi
    public FavoriteRecipeDto(Integer spoonacularId, String title, String image, LocalDateTime savedAt) {
        this.spoonacularId = spoonacularId;
        this.title = title;
        this.image = image;
        this.savedAt = savedAt;
    }

    // Getter e Setter
    public Integer getSpoonacularId() { return spoonacularId; }
    public void setSpoonacularId(Integer spoonacularId) { this.spoonacularId = spoonacularId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
}
