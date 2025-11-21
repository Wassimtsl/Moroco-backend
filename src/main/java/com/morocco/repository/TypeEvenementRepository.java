package com.morocco.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.TypeEvenement;
import com.morocco.entities.User; 
public interface TypeEvenementRepository extends JpaRepository<TypeEvenement, Long> {
	
}
