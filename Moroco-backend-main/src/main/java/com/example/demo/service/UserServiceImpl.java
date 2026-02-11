package com.example.demo.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import java.util.stream.Collectors;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.repository.AdresseRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;




@Service
@Transactional
public class UserServiceImpl implements UserService {

  @Autowired
	private UserRepository userRepo;
  @Autowired
	private RoleRepository roleRepository;
	@Autowired
	ModelMapper modelMapper;
  @Autowired
  private RoleRepository roleRepo;
  
  @Autowired
  private AdresseRepository adresseRepo;
  @Override
  public User convertDtoToEntity(UserDto utilisateurDto) {
	// TODO Auto-generated method stub
	return modelMapper.map(utilisateurDto, User.class);
  }
  @Override
  public UserDto convertEntityToDto(User utilisateur) {
	// TODO Auto-generated method stub
	return modelMapper.map(utilisateur, UserDto.class) ;
  }
  @Override
  public UserDto findById(Long id) {
	// TODO Auto-generated method stub
	return   this.convertEntityToDto(userRepo.getReferenceById(id));
  }
  @Override
  public List<UserDto> findAll() {
	// TODO Auto-generated method stub
	return userRepo.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList()) ;
  }
  @Override
  public UserDto save(UserDto utilisateur) {
	// TODO Auto-generated method stub
	return this.convertEntityToDto(userRepo.save( this.convertDtoToEntity(utilisateur)));
  }
  @Override
  public UserDto update(UserDto Utilisateur) {
	// TODO Auto-generated method stub
	return null;
  }
  @Override
  public void deleteById(Long id) {
	// TODO Auto-generated method stub
	  userRepo.deleteById(id);
	
  }
  @Override
  public UserDto findUserByAdresseEmail(String email) {
	// TODO Auto-generated method stub
	return this.convertEntityToDto( userRepo.findByEmail(email));
  }
  /*@Override
  public UserDto addRoleToUser(String email, String rolename) {
	// TODO Auto-generated method stub
	  User usr = userRepo.findByEmail(email);
		Role r = roleRepository.findByLibelleRole(rolename);
		usr.getRoles().add(r);
		return usr;
	}*/
  @Override
  public UserDto findByEmail(String email) {
	// TODO Auto-generated method stub
	return null;
  }
  @Override
  public List<UserDto> findByRole(String roleLibelle) {
	// TODO Auto-generated method stub
	return null;
  }
  @Override
  public List<UserDto> findGuidesDisponibles() {
	// TODO Auto-generated method stub
	return null;
  }
  @Override
  public UserDto update(Long id, UserDto dto) {
	// TODO Auto-generated method stub
	return null;
  }
  @Override
  public UserDto updateDisponibilite(Long id, Boolean disponibilite) {
	// TODO Auto-generated method stub
	return null;
  }
  @Override
  public UserDto updateTarifGuide(Long id, Double tarif) {
	// TODO Auto-generated method stub
	return null;
  }
  @Override
  public boolean existsByEmail(String email) {
	// TODO Auto-generated method stub
	return false;
  }
  }
  

