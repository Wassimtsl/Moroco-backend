package com.morocco.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity 
public class Role {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String libelleRole;
	
	//constructor
public Role() {};

public Role(Long id, String libelleRole) {
	this.id = id;
	this.libelleRole = libelleRole;
}


	//Getter Setter
public Long getId() { return id; }


public void setId(Long id) { this.id = id; }


public String getLibelleRole() {
	return libelleRole;
}

public void setLibelleRole(String libelleRole) {
	this.libelleRole = libelleRole;
}
// Function
@Override
public String toString() {
	return "Role{ " + id + ",libelleRole='" +libelleRole+ "}";
}


}
