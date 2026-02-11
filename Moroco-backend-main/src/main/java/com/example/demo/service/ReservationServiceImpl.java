package com.example.demo.service;

import com.example.demo.dto.ReservationDto;
import com.example.demo.entities.Reservation;
import com.example.demo.repository.ReservationRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService  {

    private final ReservationRepository reservationRepository;
    private final ModelMapper modelMapper;

    public ReservationServiceImpl(ReservationRepository reservationRepository, ModelMapper modelMapper) {
        this.reservationRepository = reservationRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Reservation convertDtoToEntity(ReservationDto dto) {
        return modelMapper.map(dto, Reservation.class);
    }

    @Override
    public ReservationDto convertEntityToDto(Reservation entity) {
        return modelMapper.map(entity, ReservationDto.class);
    }

    @Override
    @Transactional(readOnly = true)
    public ReservationDto findById(Long id) {
        Reservation entity = reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reservation id " + id + " introuvable"));
        return convertEntityToDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationDto> findAll() {
        return reservationRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDto save(ReservationDto dto) {
        Reservation entity = convertDtoToEntity(dto);
        Reservation saved = reservationRepository.save(entity);
        return convertEntityToDto(saved);
    }

    @Override
    public ReservationDto update(Long id, ReservationDto dto) {
        Reservation existing = reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reservation id " + id + " introuvable"));

        Long keepId = existing.getId();
        modelMapper.map(dto, existing);
        existing.setId(keepId);

        Reservation updated = reservationRepository.save(existing);
        return convertEntityToDto(updated);
    }

    @Override
    public void deleteById(Long id) {
        if (!reservationRepository.existsById(id)) {
            throw new NoSuchElementException("Reservation id " + id + " introuvable");
        }
        reservationRepository.deleteById(id);
    }

	@Override
	public List<ReservationDto> findByUserId(Long id) {
		return reservationRepository.findByUserId(id).stream()
				.map(this::convertEntityToDto)
				.collect(Collectors.toList());
	}

	@Override
	public List<ReservationDto> findByEvenementId(Long id) {
		return reservationRepository.findByEvenementId(id).stream()
				.map(this::convertEntityToDto)
				.collect(Collectors.toList());
	}

	@Override
	public List<ReservationDto> findByStatut(String statut) {
		return reservationRepository.findByStatut(statut).stream()
				.map(this::convertEntityToDto)
				.collect(Collectors.toList());
	}

	@Override
	public ReservationDto confirmer(Long id) {
	    Reservation reservation = reservationRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

	    reservation.setStatut("Confirmé");
	    reservationRepository.save(reservation);
	    return convertEntityToDto(reservation);
	}


	@Override
	public ReservationDto annuler(Long id) {

	    Reservation reservation = reservationRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

	    reservation.setStatut("Annulé");
	    reservationRepository.save(reservation);

	    return convertEntityToDto(reservation);
	}


}
