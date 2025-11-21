package com.morocco.repository; 

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.Evenement; 

public interface EvenementRepository extends JpaRepository<Evenement, Long> {
	Optional<Evenement> findById(Long id);
		
}
