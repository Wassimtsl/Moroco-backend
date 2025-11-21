package com.example.demo.service;

import com.example.demo.dto.GuideDto;
import com.morocco.entities.Guide;
import com.morocco.entities.User;
import com.morocco.repository.GuideRepository;
import com.morocco.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
public class GuideServiceImpl implements GuideService  {

    private final GuideRepository guideRepository;
    private final UserRepository userRepository;

    public GuideServiceImpl(GuideRepository guideRepository, UserRepository userRepository) {
        this.guideRepository = guideRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Guide convertDtoToEntity(GuideDto dto) {
        Guide g = new Guide();
        g.setTarif(dto.getTarif());
        g.setDisponibilite(dto.getDisponibilite());

        
        if (dto.getUserId() != null) {
            User u = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new NoSuchElementException("User id " + dto.getUserId() + " introuvable"));
            g.setUser(u);
            
        } else if (dto.getId() != null) {
            
            User u = userRepository.findById(dto.getId())
                    .orElseThrow(() -> new NoSuchElementException("User id " + dto.getId() + " introuvable"));
            g.setUser(u);
        }
        return g;
    }

    @Override
    public GuideDto convertEntityToDto(Guide entity) {
        GuideDto dto = new GuideDto();
        dto.setId(entity.getId());
        dto.setUserId((entity.getUser() != null ? entity.getUser().getId() : null));
        dto.setTarif(entity.getTarif());
        dto.setDisponibilite(entity.getDisponibilite());
        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public GuideDto findById(Long id) {
        Guide entity = guideRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Guide id " + id + " introuvable"));
        return convertEntityToDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GuideDto> findAll() {
        return guideRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList()); 
    }

    @Override
    public GuideDto save(GuideDto dto) {
        Guide toSave = convertDtoToEntity(dto);
        Guide saved = guideRepository.save(toSave);
        return convertEntityToDto(saved);
    }

    @Override
    public GuideDto update(Long id, GuideDto dto) {
        Guide existing = guideRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Guide id " + id + " introuvable"));

        
        existing.setTarif(dto.getTarif());
        existing.setDisponibilite(dto.getDisponibilite());

        
        if (dto.getUserId() != null && (existing.getUser() == null || !dto.getUserId().equals(existing.getUser().getId()))) {
            User u = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new NoSuchElementException("User id " + dto.getUserId() + " introuvable"));
            existing.setUser(u); 
        }

        Guide updated = guideRepository.save(existing);
        return convertEntityToDto(updated);
    }

    @Override
    public void deleteById(Long id) {
        if (!guideRepository.existsById(id)) {
            throw new NoSuchElementException("Guide id " + id + " introuvable");
        }
        guideRepository.deleteById(id);
    }
}
