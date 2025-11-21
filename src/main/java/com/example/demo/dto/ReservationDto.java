package com.example.demo.dto;

public class ReservationDto {
	private Long eventId;
	private Long userId;
	private Integer nombrePersonne;
	public Long getEventId() {
		return eventId;
	}
	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}
	public Integer getNombrePersonne() {
		return nombrePersonne;
	}
	public void setNombrePersonne(Integer nombrePersonne) {
		this.nombrePersonne = nombrePersonne;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
}

