package com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.EvenementDto;
import com.example.demo.dto.GuideDto;
import com.example.demo.dto.TypeEvenementDto;
import com.example.demo.entities.Evenement;
import com.example.demo.entities.Guide;
import com.example.demo.repository.GuideRepository;

import jakarta.validation.Valid;

@Service
@Transactional
public class GuideServiceImpl implements GuideService{

	private GuideRepository guideRepository;
	private final ModelMapper modelMapper;
	
	public GuideServiceImpl(GuideRepository guideRepository, ModelMapper modelMapper) {
		this.guideRepository = guideRepository;
		this.modelMapper = modelMapper;
	}
	
	@Override
    public Guide convertDtoToEntity(GuideDto dto) {
        return modelMapper.map(dto, Guide.class);
    }

    @Override
    public GuideDto convertEntityToDto(Guide entity) {
        return modelMapper.map(entity, GuideDto.class);
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
	public GuideDto findById(Long id) {
		Guide entity = guideRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Guide id " + id + " introuvable"));
        return convertEntityToDto(entity);
	}

	@Override
	public GuideDto save(GuideDto GuideDto) {
		// TODO Auto-generated method stub
		return this.convertEntityToDto(guideRepository.save( this.convertDtoToEntity(GuideDto)));	
	}

	@Override
	public GuideDto update(GuideDto GuideDto) {
		// TODO Auto-generated method stub
		return this.convertEntityToDto(guideRepository.save( this.convertDtoToEntity(GuideDto)));	
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
	 guideRepository.deleteById(id);
		
	}

	
}
