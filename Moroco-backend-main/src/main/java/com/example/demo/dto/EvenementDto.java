package com.example.demo.dto;

import java.time.LocalDateTime;

public class EvenementDto {
	private String description;
	private String titreEvent;
	private LocalDateTime dateDebut;
	private LocalDateTime dateFin;
	private String image;
	private Long typeEvenementId;
	private Long tarifId;
	private Long adresseId;
	private Long userId;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getAdresseId() {
		return adresseId;
	}
	public void setAdresseId(Long adresseId) {
		this.adresseId = adresseId;
	}
	public Long getTarifId() {
		return tarifId;
	}
	public void setTarifId(Long tarifId) {
		this.tarifId = tarifId;
	}
	public Long getTypeEvenementId() {
		return typeEvenementId;
	}
	public void setTypeEvenementId(Long typeEvenementId) {
		this.typeEvenementId = typeEvenementId;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public LocalDateTime getDateFin() {
		return dateFin;
	}
	public void setDateFin(LocalDateTime dateFin) {
		this.dateFin = dateFin;
	}
	public LocalDateTime getDateDebut() {
		return dateDebut;
	}
	public void setDateDebut(LocalDateTime dateDebut) {
		this.dateDebut = dateDebut;
	}
	public String getTitreEvent() {
		return titreEvent;
	}
	public void setTitreEvent(String titreEvent) {
		this.titreEvent = titreEvent;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
