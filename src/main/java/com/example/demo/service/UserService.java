package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.UserDto;
import com.morocco.entities.*;

public interface UserService {
	User convertDtoToEntity(UserDto UtilisateurDto);

	UserDto convertEntityToDto(User Utilisateur);

	UserDto findById(Long id);

	List<UserDto> findAll();

	UserDto save(UserDto Utilisateur);

	UserDto update(UserDto Utilisateur);

	void deleteById(Long id);
	
	
	UserDto findUserByAdresseEmail (String email);
	//RoleDto addRole(RoleDto role);
	//UserDto addRoleToUser(String username, String rolename);

}
