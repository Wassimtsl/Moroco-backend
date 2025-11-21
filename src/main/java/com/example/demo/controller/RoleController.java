package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.dto.RoleDto;
import com.example.demo.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @GetMapping
    public List<RoleDto> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public RoleDto one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public RoleDto create(@RequestBody RoleDto dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public RoleDto update(@PathVariable Long id, @RequestBody RoleDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}

