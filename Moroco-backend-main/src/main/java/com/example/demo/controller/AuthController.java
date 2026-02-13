package com.example.demo.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.dto.JwtResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserDto;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.SecParams;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final SecParams secParams;
    private final PasswordEncoder passwordEncoder;

    // ✅ Injection par constructeur
    public AuthController(UserRepository userRepository,
                          RoleRepository roleRepository,
                          SecParams secParams,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.secParams = secParams;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

        // 1) Récupérer l'utilisateur par email
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Utilisateur introuvable");
        }

        // 2) ✅ Vérifier le mot de passe avec BCrypt
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Mot de passe incorrect");
        }

        // 3) Récupérer le rôle
        Role role = user.getRole();
        String[] roles = { role != null ? role.getNom() : "USER" };

        // 4) ✅ Générer le JWT avec secParams injecté
        String jwt = JWT.create()
                .withSubject(user.getEmail())
                .withArrayClaim("roles", roles)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis()
                        + secParams.getExpTime() * 1000))
                .sign(Algorithm.HMAC256(secParams.getSecret()));

        // 5) Retourner le token
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto userDto) {
        
        if (userRepository.findByEmail(userDto.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email déjà utilisé");
        }

      
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());

        // Rôle TOURISTE par défaut (id=3)
        Role touristeRole = roleRepository.findById(3L)
                .orElseThrow(() -> new RuntimeException("Rôle TOURISTE introuvable"));
        user.setRole(touristeRole);

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Utilisateur créé");
    }

}