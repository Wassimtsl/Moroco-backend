package com.morocco.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.Langue; 

public interface LangueRepository extends JpaRepository<Langue, Long> {
	
}
