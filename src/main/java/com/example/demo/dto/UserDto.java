package com.example.demo.dto;
import com.example.demo.dto.UserDto;


public class UserDto {
	private String nom;
	private String prenom;
	private String email;
	private String numTel;
	private String password;
	private RoleDto role;     
	private AdresseDto adresse;
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getNumTel() {
		return numTel;
	}
	public void setNumTel(String numTel) {
		this.numTel = numTel;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public RoleDto getRole() {
		return role;
	}
	public void setRole(RoleDto role) {
		this.role = role;
	}
	public AdresseDto getAdresse() {
		return adresse;
	}
	public void setAdresse(AdresseDto adresse) {
		this.adresse = adresse;
	}
}
