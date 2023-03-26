package ru.kata.spring.boot_security.demo.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.util.UserMapper;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> allUsers() {
        List<UserDTO> userDTOS = userService.findAll().stream().map(UserMapper::toDTO).toList();
        return ResponseEntity.ok(userDTOS);
    }

    @PostMapping
    public ResponseEntity<UserDTO> addUser(@RequestBody User newUser) {
        UserDTO userDTO = UserMapper.toDTO(userService.saveOrUpdate(newUser));
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> oneUser(@PathVariable Long id) {
        UserDTO userDTO = UserMapper.toDTO(userService.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found")));
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody User user) {
        UserDTO userDTO = UserMapper.toDTO(userService.saveOrUpdate(user));
        return ResponseEntity.ok(userDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
