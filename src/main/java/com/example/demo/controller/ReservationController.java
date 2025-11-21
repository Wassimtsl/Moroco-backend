package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.dto.ReservationDto;
import com.example.demo.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService service;

    public ReservationController(ReservationService service) {
        this.service = service;
    }

    @GetMapping
    public List<ReservationDto> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ReservationDto one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ReservationDto create(@RequestBody ReservationDto dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public ReservationDto update(@PathVariable Long id, @RequestBody ReservationDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
    
}

    
