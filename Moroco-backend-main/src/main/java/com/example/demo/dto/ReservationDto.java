package com.example.demo.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class ReservationDto {
    
    private Long id;
    
    @NotNull(message = "L'ID de l'événement est obligatoire")
    private Long eventId;
    
    @NotNull(message = "L'ID de l'utilisateur est obligatoire")
    private Long userId;
    
    @NotNull(message = "L'ID du statut est obligatoire")
    private Long statutId;
    
    @NotNull(message = "Le nombre de personnes est obligatoire")
    @Min(value = 1, message = "Au moins 1 personne requise")
    @Max(value = 100, message = "Maximum 100 personnes")
    private Integer nombrePersonne;
    
    private LocalDateTime dateReservation;
    private LocalDateTime dateAnnulation;
    
    // Champs enrichis (lecture seule, pour affichage)
    private String evenementTitre;
    private String statutLibelle;
    private String statutCode;
    private String nomTouriste;

	public Long getEventId() {
		return eventId;
	}
	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getStatutId() {
		return statutId;
	}
	public void setStatutId(Long statutId) {
		this.statutId = statutId;
	}
	public Integer getNombrePersonne() {
		return nombrePersonne;
	}
	public void setNombrePersonne(Integer nombrePersonne) {
		this.nombrePersonne = nombrePersonne;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDateTime getDateReservation() {
		return dateReservation;
	}
	public void setDateReservation(LocalDateTime dateReservation) {
		this.dateReservation = dateReservation;
	}
	public LocalDateTime getDateAnnulation() {
		return dateAnnulation;
	}
	public void setDateAnnulation(LocalDateTime dateAnnulation) {
		this.dateAnnulation = dateAnnulation;
	}
	public String getEvenementTitre() {
		return evenementTitre;
	}
	public void setEvenementTitre(String evenementTitre) {
		this.evenementTitre = evenementTitre;
	}
	public String getStatutLibelle() {
		return statutLibelle;
	}
	public void setStatutLibelle(String statutLibelle) {
		this.statutLibelle = statutLibelle;
	}
	public String getStatutCode() {
		return statutCode;
	}
	public void setStatutCode(String statutCode) {
		this.statutCode = statutCode;
	}
	public String getNomTouriste() {
		return nomTouriste;
	}
	public void setNomTouriste(String nomTouriste) {
		this.nomTouriste = nomTouriste;
	}
}