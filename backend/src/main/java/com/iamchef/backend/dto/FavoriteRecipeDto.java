package com.iamchef.backend.dto;

import java.time.LocalDateTime;

public class FavoriteRecipeDto {

    private Integer spoonacularId;
    private String title;
    private String image;
    private LocalDateTime savedAt;

    public FavoriteRecipeDto() {}

    public FavoriteRecipeDto(Integer spoonacularId, String title, String image, LocalDateTime savedAt) {
        this.spoonacularId = spoonacularId;
        this.title = title;
        this.image = image;
        this.savedAt = savedAt;
    }

    public Integer getSpoonacularId() { return spoonacularId; }
    public void setSpoonacularId(Integer spoonacularId) { this.spoonacularId = spoonacularId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
}
