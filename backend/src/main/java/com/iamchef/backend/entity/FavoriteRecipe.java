package com.iamchef.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorite_recipes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "spoonacular_id"})
})
public class FavoriteRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "spoonacular_id", nullable = false)
    private Integer spoonacularId;

    @Column(nullable = false)
    private String title;

    private String image;

    private LocalDateTime savedAt;

    @PrePersist
    protected void onCreate() {
        savedAt = LocalDateTime.now();
    }

    public FavoriteRecipe() {}

    public FavoriteRecipe(User user, Integer spoonacularId, String title, String image) {
        this.user = user;
        this.spoonacularId = spoonacularId;
        this.title = title;
        this.image = image;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Integer getSpoonacularId() { return spoonacularId; }
    public void setSpoonacularId(Integer spoonacularId) { this.spoonacularId = spoonacularId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public LocalDateTime getSavedAt() { return savedAt; }
}
