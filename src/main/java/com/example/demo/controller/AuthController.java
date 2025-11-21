package com.example.demo.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.dto.JwtResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.security.SecParams;
import com.morocco.entities.Role;
import com.morocco.entities.User;
import com.morocco.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        // 1) Récupérer l'utilisateur par email
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Utilisateur introuvable");
        }

        // 2) Vérifier le mot de passe
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Mot de passe incorrect");
        }

        // 3) Récupérer le rôle en tableau de String (un seul rôle)
        Role role = user.getRole();
        String[] roles = { role != null ? role.getLibelleRole() : "USER" };

        // 4) Générer le JWT
        String jwt = JWT.create()
                .withSubject(user.getEmail())          // identifiant dans le token
                .withArrayClaim("roles", roles)        // claim "roles"
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis()
                        + SecParams.EXP_TIME * 1000))  // EXP_TIME en secondes
                .sign(Algorithm.HMAC256(SecParams.SECRET));

        // 5) Retourner le token
        return ResponseEntity.ok(new JwtResponse(jwt));
    }
}
