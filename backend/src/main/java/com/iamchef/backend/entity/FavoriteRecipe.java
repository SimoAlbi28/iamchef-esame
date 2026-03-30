package com.iamchef.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

// Questa classe rappresenta la tabella "favorite_recipes" nel database
// Ogni riga collega un utente a una ricetta che ha salvato come preferita
// Il vincolo UniqueConstraint impedisce che un utente salvi la stessa ricetta due volte
@Entity
@Table(name = "favorite_recipes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "spoonacular_id"})
})
public class FavoriteRecipe {

    // ID univoco del record preferito, generato automaticamente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relazione con l'utente: ogni preferito appartiene a un utente
    // FetchType.LAZY significa che i dati dell'utente vengono caricati solo quando servono
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ID della ricetta su Spoonacular (l'API esterna delle ricette)
    @Column(name = "spoonacular_id", nullable = false)
    private Integer spoonacularId;

    // Titolo della ricetta
    @Column(nullable = false)
    private String title;

    // URL dell'immagine della ricetta
    private String image;

    // Data e ora in cui la ricetta e' stata salvata come preferita
    private LocalDateTime savedAt;

    // Questo metodo viene chiamato automaticamente quando si salva un nuovo preferito
    // Imposta la data di salvataggio al momento attuale
    @PrePersist
    protected void onCreate() {
        savedAt = LocalDateTime.now();
    }

    // Costruttore vuoto: necessario per JPA
    public FavoriteRecipe() {}

    // Costruttore con parametri: usato per creare un nuovo preferito
    public FavoriteRecipe(User user, Integer spoonacularId, String title, String image) {
        this.user = user;
        this.spoonacularId = spoonacularId;
        this.title = title;
        this.image = image;
    }

    // Getter e Setter
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
