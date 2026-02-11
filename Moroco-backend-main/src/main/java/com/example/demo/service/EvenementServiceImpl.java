package com.example.demo.service;

import com.example.demo.dto.EvenementDto;
import com.example.demo.entities.Evenement;
import com.example.demo.repository.EvenementRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
public class EvenementServiceImpl implements EvenementService  {

    private final EvenementRepository evenementRepository;
    private final ModelMapper modelMapper;

    public EvenementServiceImpl(EvenementRepository evenementRepository, ModelMapper modelMapper) {
        this.evenementRepository = evenementRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Evenement convertDtoToEntity(EvenementDto dto) {
        return modelMapper.map(dto, Evenement.class);
    }

    @Override
    public EvenementDto convertEntityToDto(Evenement entity) {
        return modelMapper.map(entity, EvenementDto.class);
    }

    @Override
    @Transactional(readOnly = true)
    public EvenementDto findById(Long id) {
        Evenement entity = evenementRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Evenement id " + id + " introuvable"));
        return convertEntityToDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EvenementDto> findAll() {
        return evenementRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EvenementDto save(EvenementDto dto) {
        Evenement toSave = convertDtoToEntity(dto);
        Evenement saved = evenementRepository.save(toSave);
        return convertEntityToDto(saved);
    }

    @Override
    public EvenementDto update(Long id, EvenementDto dto) {
        Evenement existing = evenementRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Evenement id " + id + " introuvable"));

        Long keepId = existing.getId();
        modelMapper.map(dto, existing);
        existing.setId(keepId);

        Evenement updated = evenementRepository.save(existing);
        return convertEntityToDto(updated);
    }

    @Override
    public void deleteById(Long id) {
        if (!evenementRepository.existsById(id)) {
            throw new NoSuchElementException("Evenement id " + id + " introuvable");
        }
        evenementRepository.deleteById(id);
    }

    @Override
    public List<EvenementDto> findByTypeEvenementId(Long id) {
        return evenementRepository.findByTypeEvenementsId(id).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EvenementDto> findByUserId(Long id) {
        return evenementRepository.findByUsersId(id).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    // ✅ OPTION A : événements dont dateDebut est entre deux dates
    @Override
    @Transactional(readOnly = true)
    public List<EvenementDto> findByDateDebutBetween(LocalDateTime debut, LocalDateTime fin) {
        return evenementRepository.findByDateDebutBetween(debut, fin)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
}
