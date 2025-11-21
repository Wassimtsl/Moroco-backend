package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.ReservationDto;
import com.morocco.entities.Reservation;

public interface ReservationService {

    Reservation convertDtoToEntity(ReservationDto dto);
    ReservationDto convertEntityToDto(Reservation entity);

    ReservationDto findById(Long id);
    List<ReservationDto> findAll();
    ReservationDto save(ReservationDto dto);
    ReservationDto update(Long id, ReservationDto dto);
    void deleteById(Long id);
}
