package com.iamchef.backend.repository;

import com.iamchef.backend.entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findTop20ByUserIdOrderBySearchedAtDesc(Long userId);
    void deleteAllByUserId(Long userId);
}
