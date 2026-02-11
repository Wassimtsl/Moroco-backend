package com.example.demo.dto;

public class GuideDto {
	private Long id;       
	private Double tarif;
	private Boolean disponibilite;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Double getTarif() {
		return tarif;
	}
	public void setTarif(Double tarif) {
		this.tarif = tarif;
	}
	public Boolean getDisponibilite() {
		return disponibilite;
	}
	public void setDisponibilite(Boolean disponibilite) {
		this.disponibilite = disponibilite;
	}
}
