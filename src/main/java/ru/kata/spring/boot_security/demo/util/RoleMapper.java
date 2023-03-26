package ru.kata.spring.boot_security.demo.util;


import ru.kata.spring.boot_security.demo.dto.RoleDTO;
import ru.kata.spring.boot_security.demo.models.Role;

import java.util.stream.Collectors;

public class RoleMapper {
    public static RoleDTO toDTO(Role role) {
        return RoleDTO.builder()
                .id(role.getId())
                .name(role.getName())
                .users(role.getUsers()
                        .stream().map(UserMapper::toDTO)
                        .collect(Collectors.toSet()))
                .build();
    }
}
