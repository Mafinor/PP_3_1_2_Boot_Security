package ru.kata.spring.boot_security.demo.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.util.UserMapper;

@RestController
@RequestMapping("/api/v1/iam")
public class UserPageController {
    @GetMapping
    public ResponseEntity<UserDTO> iAm(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        UserDTO userDTO = UserMapper.toDTO(user);
        return ResponseEntity.ok(userDTO);
    }
}
