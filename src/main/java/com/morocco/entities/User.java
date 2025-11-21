package com.morocco.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")   
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String numTel;
    private String password;

    // Relations

    // ManyToOne avec Role
    @ManyToOne
    @JoinColumn(name = "id_role")
    private Role role;

    // ManyToOne avec Adresse
    @ManyToOne
    @JoinColumn(name = "id_adresse")
    private Adresse adresse;

    // ManyToMany avec Langue (table Asso_3)
    @ManyToMany
    @JoinTable(
        name = "LangueParlee",
        joinColumns = @JoinColumn(name = "id_user"),
        inverseJoinColumns = @JoinColumn(name = "id_langue")
    )
    private Set<Langue> langues = new HashSet<>();

    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Guide guide;


    public User() {
		// TODO Auto-generated constructor stub
	}

	// ---- Getters & Setters ----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNumTel() { return numTel; }
    public void setNumTel(String numTel) { this.numTel = numTel; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Adresse getAdresse() { return adresse; }
    public void setAdresse(Adresse adresse) { this.adresse = adresse; }

    public Set<Langue> getLangues() { return langues; }
    public void setLangues(Set<Langue> langues) { this.langues = langues; }

    public Guide getGuide() { return guide; }
    public void setGuide(Guide guide) { this.guide = guide; }
    

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", numTel='" + numTel + '\'' +
                '}';
    }
}

