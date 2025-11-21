package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.GuideDto;
import com.morocco.entities.Guide;

public interface GuideService {
    Guide convertDtoToEntity(GuideDto dto);
    GuideDto convertEntityToDto(Guide entity);

    GuideDto findById(Long id);
    List<GuideDto> findAll();
    GuideDto save(GuideDto dto);
    GuideDto update(Long id, GuideDto dto);
    void deleteById(Long id);
}