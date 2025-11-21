package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.dto.AdresseDto;
import com.example.demo.service.AdresseService;

@RestController
@RequestMapping("/api/adresses")
public class AdresseController {

    private final AdresseService service;

    public AdresseController(AdresseService service) {
        this.service = service;
    }

    @GetMapping
    public List<AdresseDto> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public AdresseDto one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public AdresseDto create(@RequestBody AdresseDto dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public AdresseDto update(@PathVariable Long id, @RequestBody AdresseDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}
