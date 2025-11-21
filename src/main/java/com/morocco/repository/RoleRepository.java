package com.morocco.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.morocco.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByLibelleRole(String rolename);
}
