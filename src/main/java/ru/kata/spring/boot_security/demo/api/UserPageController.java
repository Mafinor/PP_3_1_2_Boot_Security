package ru.kata.spring.boot_security.demo.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.util.UserMapper;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/iam")
public class UserPageController {
    @GetMapping
    public ResponseEntity<UserDTO> iAm(Authentication authentication) {
        if (authentication instanceof OAuth2AuthenticationToken) {
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            User user = new User();
            user.setId((long)((Integer)principal.getAttribute("id")).intValue());
            user.setFirstName(principal.getAttribute("first_name"));
            user.setLastName(principal.getAttribute("last_name"));
            user.setEmail(principal.getAttribute("email"));
            String stringDate = principal.getAttribute("bdate");
            LocalDate bdate = LocalDate.parse(stringDate, DateTimeFormatter.ofPattern("dd.M.yyyy"));
            user.setAge(Period.between(bdate, LocalDate.now()).getYears());
            user.setRoles(principal.getAuthorities().stream().map(grantedAuthority -> {
                        Role role = new Role();
                        role.setName(grantedAuthority.getAuthority());
                        return role;
                    })
                    .collect(Collectors.toSet()));
            return ResponseEntity.ok(UserMapper.toDTO(user));
        }
        User user = (User) authentication.getPrincipal();
        UserDTO userDTO = UserMapper.toDTO(user);
        return ResponseEntity.ok(userDTO);
    }
}
