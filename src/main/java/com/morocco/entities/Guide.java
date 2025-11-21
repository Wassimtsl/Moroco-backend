package com.morocco.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "guide")
public class Guide {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id;

    @OneToOne
    @MapsId               
    @JoinColumn(name = "id_user")
    private User user;

    private Double tarif;
    private Boolean disponibilite;

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Double getTarif() { return tarif; }
    public void setTarif(Double tarif) { this.tarif = tarif; }

    public Boolean getDisponibilite() { return disponibilite; }
    public void setDisponibilite(Boolean disponibilite) { this.disponibilite = disponibilite; }

    // --- toString ---
    @Override
    public String toString() {
        return "Guide{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : null) +
                ", tarif=" + tarif +
                ", disponibilite=" + disponibilite +
                '}';
    }
}
