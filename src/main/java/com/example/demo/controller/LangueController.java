package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.dto.LangueDto;
import com.example.demo.service.LangueService;

@RestController
@RequestMapping("/api/langues")
public class LangueController {

    private final LangueService service;

    public LangueController(LangueService service){
        this.service = service;
    }

    @GetMapping
    public List<LangueDto> all(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public LangueDto one(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping
    public LangueDto create(@RequestBody LangueDto dto){
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public LangueDto update(@PathVariable Long id, @RequestBody LangueDto dto){
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.deleteById(id);
    }
}
