package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;    
import java.util.List;                              

import com.example.demo.dto.GuideDto;
import com.example.demo.service.GuideService;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    private final GuideService service;

    public GuideController(GuideService service) {
        this.service = service;
    }

    @GetMapping
    public List<GuideDto> all() {
        return service.findAll();
    }

    
    @GetMapping("/{idUser}")
    public GuideDto one(@PathVariable Long idUser) {
        return service.findById(idUser);
    }

    @PostMapping
    public GuideDto create(@RequestBody GuideDto dto) {
        return service.save(dto);
    }

    @PutMapping("/{idUser}")
    public GuideDto update(@PathVariable Long idUser, @RequestBody GuideDto dto) {
        return service.update(idUser, dto);
    }

    @DeleteMapping("/{idUser}")
    public void delete(@PathVariable Long idUser) {
        service.deleteById(idUser);
    }
}
