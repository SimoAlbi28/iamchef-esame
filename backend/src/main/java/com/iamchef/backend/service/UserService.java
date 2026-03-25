package com.iamchef.backend.service;

import com.iamchef.backend.dto.UserProfileDto;
import com.iamchef.backend.entity.User;
import com.iamchef.backend.exception.ApiException;
import com.iamchef.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileDto getProfile(String email) {
        User user = findByEmail(email);
        return new UserProfileDto(user.getId(), user.getUsername(), user.getEmail(), user.getDietaryPreferences());
    }

    public UserProfileDto updateProfile(String email, UserProfileDto dto) {
        User user = findByEmail(email);

        if (dto.getUsername() != null && !dto.getUsername().isBlank()) {
            user.setUsername(dto.getUsername());
        }
        if (dto.getDietaryPreferences() != null) {
            user.setDietaryPreferences(dto.getDietaryPreferences());
        }

        userRepository.save(user);
        return new UserProfileDto(user.getId(), user.getUsername(), user.getEmail(), user.getDietaryPreferences());
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }
}
