package ru.kata.spring.boot_security.demo.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class RoleDTO {
    private Long id;
    private String name;
    private Set<UserDTO> users;
}
