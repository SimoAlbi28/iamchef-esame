package com.iamchef.backend.service;

import com.iamchef.backend.entity.SearchHistory;
import com.iamchef.backend.entity.User;
import com.iamchef.backend.repository.SearchHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final UserService userService;

    public SearchHistoryService(SearchHistoryRepository searchHistoryRepository, UserService userService) {
        this.searchHistoryRepository = searchHistoryRepository;
        this.userService = userService;
    }

    public void saveSearch(String email, String ingredients, int resultCount) {
        User user = userService.findByEmail(email);
        SearchHistory history = new SearchHistory(user, ingredients, resultCount);
        searchHistoryRepository.save(history);
    }

    public List<SearchHistory> getHistory(String email) {
        User user = userService.findByEmail(email);
        return searchHistoryRepository.findTop20ByUserIdOrderBySearchedAtDesc(user.getId());
    }

    @Transactional
    public void clearHistory(String email) {
        User user = userService.findByEmail(email);
        searchHistoryRepository.deleteAllByUserId(user.getId());
    }
}
