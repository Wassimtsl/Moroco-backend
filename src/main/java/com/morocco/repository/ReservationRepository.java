package com.morocco.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.Reservation; 

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	
}
