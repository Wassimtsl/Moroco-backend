package com.morocco.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reservation")
    private Long id;

    @Column(name = "nombre_personne")
    private Integer nombrePersonne;

    @Column(name = "date_reservation")
    private LocalDateTime dateReservation;

    private String statut;

    @Column(name = "date_annulation")
    private LocalDateTime dateAnnulation;

    @ManyToOne
    @JoinColumn(name = "id_event")
    private Evenement evenement;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    // --- getters / setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getNombrePersonne() { return nombrePersonne; }
    public void setNombrePersonne(Integer nombrePersonne) { this.nombrePersonne = nombrePersonne; }

    public LocalDateTime getDateReservation() { return dateReservation; }
    public void setDateReservation(LocalDateTime dateReservation) { this.dateReservation = dateReservation; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public LocalDateTime getDateAnnulation() { return dateAnnulation; }
    public void setDateAnnulation(LocalDateTime dateAnnulation) { this.dateAnnulation = dateAnnulation; }

    public Evenement getEvenement() { return evenement; }
    public void setEvenement(Evenement evenement) { this.evenement = evenement; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", nombrePersonne=" + nombrePersonne +
                ", dateReservation=" + dateReservation +
                ", statut='" + statut + '\'' +
                ", dateAnnulation=" + dateAnnulation +
                ", evenement=" + (evenement != null ? evenement.getId() : null) +
                ", user=" + (user != null ? user.getId() : null) +
                '}';
    }
}

