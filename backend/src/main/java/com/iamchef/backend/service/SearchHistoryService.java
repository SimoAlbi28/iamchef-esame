package com.iamchef.backend.service;

import com.iamchef.backend.entity.SearchHistory;
import com.iamchef.backend.entity.User;
import com.iamchef.backend.repository.SearchHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// Questa classe gestisce la logica della cronologia delle ricerche
@Service
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final UserService userService;

    public SearchHistoryService(SearchHistoryRepository searchHistoryRepository, UserService userService) {
        this.searchHistoryRepository = searchHistoryRepository;
        this.userService = userService;
    }

    // Questa parte salva una nuova ricerca nella cronologia dell'utente
    // Memorizza quali ingredienti ha cercato e quanti risultati ha ottenuto
    public void saveSearch(String email, String ingredients, int resultCount) {
        User user = userService.findByEmail(email);
        SearchHistory history = new SearchHistory(user, ingredients, resultCount);
        searchHistoryRepository.save(history);
    }

    // Questa parte recupera le ultime 20 ricerche dell'utente
    public List<SearchHistory> getHistory(String email) {
        User user = userService.findByEmail(email);
        return searchHistoryRepository.findTop20ByUserIdOrderBySearchedAtDesc(user.getId());
    }

    // Questa parte cancella tutta la cronologia di ricerca dell'utente
    // @Transactional e' necessario perche' l'operazione di delete puo' coinvolgere piu' righe
    @Transactional
    public void clearHistory(String email) {
        User user = userService.findByEmail(email);
        searchHistoryRepository.deleteAllByUserId(user.getId());
    }
}
