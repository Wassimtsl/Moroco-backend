package com.morocco.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "evenement")
public class Evenement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_event")
    private Long id;

    private String description;

    @Column(name = "titre_event")
    private String titreEvent;

    @Column(name = "date_debut")
    private LocalDateTime dateDebut;

    @Column(name = "date_fin")
    private LocalDateTime dateFin;

    private String image;

    @ManyToOne @JoinColumn(name = "id_typeevenement")
    private TypeEvenement typeEvenement;

    @ManyToOne @JoinColumn(name = "id_tarif")
    private Tarif tarif;

    @ManyToOne @JoinColumn(name = "id_adresse")
    private Adresse adresse;

    @ManyToOne @JoinColumn(name = "id_user")
    private User user;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTitreEvent() { return titreEvent; }
    public void setTitreEvent(String titreEvent) { this.titreEvent = titreEvent; }

    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }

    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public TypeEvenement getTypeEvenement() { return typeEvenement; }
    public void setTypeEvenement(TypeEvenement typeEvenement) { this.typeEvenement = typeEvenement; }

    public Tarif getTarif() { return tarif; }
    public void setTarif(Tarif tarif) { this.tarif = tarif; }

    public Adresse getAdresse() { return adresse; }
    public void setAdresse(Adresse adresse) { this.adresse = adresse; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return "Evenement{" +
                "id=" + id +
                ", titreEvent='" + titreEvent + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", typeEvenement=" + (typeEvenement != null ? typeEvenement.getId() : null) +
                ", tarif=" + (tarif != null ? tarif.getId() : null) +
                ", adresse=" + (adresse != null ? adresse.getId() : null) +
                ", user=" + (user != null ? user.getId() : null) +
                '}';
    }
}

