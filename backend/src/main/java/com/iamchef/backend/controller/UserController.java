package com.iamchef.backend.controller;

import com.iamchef.backend.dto.UserProfileDto;
import com.iamchef.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getProfile(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(userService.getProfile(email));
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileDto> updateProfile(Authentication authentication,
                                                        @RequestBody UserProfileDto dto) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(userService.updateProfile(email, dto));
    }
}
