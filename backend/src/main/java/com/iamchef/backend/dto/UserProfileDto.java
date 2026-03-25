package com.iamchef.backend.dto;

public class UserProfileDto {

    private Long id;
    private String username;
    private String email;
    private String dietaryPreferences;

    public UserProfileDto() {}

    public UserProfileDto(Long id, String username, String email, String dietaryPreferences) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.dietaryPreferences = dietaryPreferences;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDietaryPreferences() { return dietaryPreferences; }
    public void setDietaryPreferences(String dietaryPreferences) { this.dietaryPreferences = dietaryPreferences; }
}
