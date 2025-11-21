package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.dto.TypeEvenementDto;
import com.example.demo.service.TypeEvenementService;

@RestController
@RequestMapping("/api/types-evenements")
public class TypeEvenementController {

    private final TypeEvenementService service;

    public TypeEvenementController(TypeEvenementService service){
        this.service = service;
    }

    @GetMapping
    public List<TypeEvenementDto> all(){
        return service.findAll();
    }
 
    @GetMapping("/{id}")
    public TypeEvenementDto one(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping
    public TypeEvenementDto create(@RequestBody TypeEvenementDto dto){
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public TypeEvenementDto update(@PathVariable Long id, @RequestBody TypeEvenementDto dto){
        return service.update(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.deleteById(id);
    }
}
