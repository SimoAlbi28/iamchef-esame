package com.iamchef.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

// Questa classe rappresenta la tabella "search_history" nel database
// Ogni riga memorizza una ricerca fatta da un utente (quali ingredienti ha cercato)
@Entity
@Table(name = "search_history")
public class SearchHistory {

    // ID univoco della ricerca, generato automaticamente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relazione con l'utente: ogni ricerca appartiene a un utente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Gli ingredienti cercati dall'utente (es. "pomodoro, mozzarella, basilico")
    @Column(nullable = false)
    private String ingredients;

    // Quante ricette sono state trovate con quella ricerca
    private Integer resultCount;

    // Data e ora in cui e' stata fatta la ricerca
    private LocalDateTime searchedAt;

    // Questo metodo viene chiamato automaticamente quando si salva una nuova ricerca
    @PrePersist
    protected void onCreate() {
        searchedAt = LocalDateTime.now();
    }

    // Costruttore vuoto: necessario per JPA
    public SearchHistory() {}

    // Costruttore con parametri: usato per creare una nuova voce nella cronologia
    public SearchHistory(User user, String ingredients, Integer resultCount) {
        this.user = user;
        this.ingredients = ingredients;
        this.resultCount = resultCount;
    }

    // Getter e Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public Integer getResultCount() { return resultCount; }
    public void setResultCount(Integer resultCount) { this.resultCount = resultCount; }

    public LocalDateTime getSearchedAt() { return searchedAt; }
}
