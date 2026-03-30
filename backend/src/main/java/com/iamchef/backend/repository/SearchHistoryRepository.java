package com.iamchef.backend.repository;

import com.iamchef.backend.entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Questa interfaccia gestisce tutte le operazioni sul database per la tabella "search_history"
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {

    // Recupera le ultime 20 ricerche di un utente, ordinate dalla piu' recente alla piu' vecchia
    List<SearchHistory> findTop20ByUserIdOrderBySearchedAtDesc(Long userId);

    // Cancella tutta la cronologia di ricerca di un utente
    void deleteAllByUserId(Long userId);
}
