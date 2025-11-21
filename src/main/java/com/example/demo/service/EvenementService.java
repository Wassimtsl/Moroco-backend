package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.EvenementDto;
import com.morocco.entities.Evenement;

public interface EvenementService {

    // conversions
    Evenement convertDtoToEntity(EvenementDto dto);
    EvenementDto convertEntityToDto(Evenement entity);

    // CRUD (retourne des DTO)
    EvenementDto findById(Long id);
    List<EvenementDto> findAll();
    EvenementDto save(EvenementDto dto);
    EvenementDto update(Long id, EvenementDto dto);
    void deleteById(Long id);
}
