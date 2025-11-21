package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.RoleDto;

public interface RoleService {
    
    com.morocco.entities.Role convertDtoToEntity(RoleDto dto);
    RoleDto convertEntityToDto(com.morocco.entities.Role entity);
    RoleDto findById(Long id);
    List<RoleDto> findAll();
    RoleDto save(RoleDto dto);
    RoleDto update(Long id, RoleDto dto);
    void deleteById(Long id);
}
