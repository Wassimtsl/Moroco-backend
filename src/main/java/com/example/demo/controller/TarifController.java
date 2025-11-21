package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.dto.TarifDto;
import com.example.demo.service.TarifService;

@RestController
@RequestMapping("/api/tarifs")
public class TarifController {

    private final TarifService service;

    public TarifController(TarifService service){
        this.service = service;
    }

    @GetMapping
    public List<TarifDto> all(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public TarifDto one(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping
    public TarifDto create(@RequestBody TarifDto dto){
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public TarifDto update(@PathVariable Long id, @RequestBody TarifDto dto){
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.deleteById(id);
    }
}
