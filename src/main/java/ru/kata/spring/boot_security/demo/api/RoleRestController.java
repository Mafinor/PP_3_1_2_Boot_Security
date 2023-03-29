package ru.kata.spring.boot_security.demo.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.dto.RoleDTO;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.util.RoleMapper;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleRestController {
    private final RoleService roleService;
    public RoleRestController(RoleService roleService) {
        this.roleService = roleService;
    }
    @GetMapping
    public ResponseEntity<List<RoleDTO>> allRoles() {
        List<RoleDTO> roleDTOS = roleService.findAll().stream().map(RoleMapper::toDTO).toList();
        return ResponseEntity.ok(roleDTOS);
    }
}
