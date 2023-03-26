package ru.kata.spring.boot_security.demo.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Integer age;
    private Set<RoleDTO> roles;
}
