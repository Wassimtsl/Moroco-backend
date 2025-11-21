package com.morocco.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.Tarif;

public interface TarifRepository extends JpaRepository<Tarif, Long> {}
