package com.morocco.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.Adresse; 

public interface AdresseRepository extends JpaRepository<Adresse, Long> {
	
}
