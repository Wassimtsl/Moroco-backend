package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.TarifDto;

public interface TarifService {
    
    com.morocco.entities.Tarif convertDtoToEntity(TarifDto dto);
    TarifDto convertEntityToDto(com.morocco.entities.Tarif entity);

  
    TarifDto findById(Long id);
    List<TarifDto> findAll();
    TarifDto save(TarifDto dto);
    TarifDto update(Long id, TarifDto dto);
    void deleteById(Long id);
}
