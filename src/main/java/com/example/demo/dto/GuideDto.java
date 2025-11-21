package com.example.demo.dto;

public class GuideDto {
	private Long id;       
	private Long userId;
	private Double tarif;
	private Boolean disponibilite;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
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
