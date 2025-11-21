package com.morocco.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.Guide; 

public interface GuideRepository extends JpaRepository<Guide, Long> {
	
}
