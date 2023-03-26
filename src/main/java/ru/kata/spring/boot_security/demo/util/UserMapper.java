package ru.kata.spring.boot_security.demo.util;

import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.stream.Collectors;

public class UserMapper {
    public static UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password("")
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .age(user.getAge())
                .roles(user.getRoles()
                        .stream()
                        .map(RoleMapper::toDTO)
                        .collect(Collectors.toSet()))
                .build();
    }
}
