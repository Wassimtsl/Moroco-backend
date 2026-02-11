package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
public class Adresse {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String adresse;
	private String ville;
	private String pays;
	private String codePostal; 

	//constructor
public Adresse() {};

public Adresse (String adresse, String ville, String pays, String code_postal) {
	this.adresse = adresse;
	this.ville = ville;
	this.pays = pays;
	this.codePostal = code_postal;
}
public String getAdresse() {
	return adresse;
}
public void setAdresse(String adresse) {
	this.adresse = adresse;
}

public String getVille( ) {
	return ville;
}

public void setVille(String ville) {
	this.ville = ville;
}

public String getPays() {
	return pays;
}

public void setPays(String pays) {
	this.pays = pays;
}
public Long getId() {
	return id;
}

public void setId(Long Id) {
	this.id = Id;
}

public String getcode_postal() {
	return codePostal;
	
	
}
public void setcode_postal(String code_postal) {
	this.codePostal = code_postal;
}





}
