package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.dto.EvenementDto;
import com.example.demo.service.EvenementService;

@RestController
@RequestMapping("/api/evenements")
public class EvenementController {

    private final EvenementService service;

    public EvenementController(EvenementService service) {
        this.service = service;
    }

    @GetMapping
    public List<EvenementDto> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public EvenementDto one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public EvenementDto create(@RequestBody EvenementDto dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public EvenementDto update(@PathVariable Long id, @RequestBody EvenementDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}
