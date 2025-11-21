package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.modelmapper.ModelMapper;
	


@SpringBootApplication
@ComponentScan(basePackages = { "com.example.demo", "com.morocco" })
@EntityScan(basePackages = "com.morocco.entities")
@EnableJpaRepositories(basePackages = "com.morocco.repository")
public class MoroccoBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoroccoBackendApplication.class, args);
    }

    @Bean
	public ModelMapper modelMapper()
	{
		return new ModelMapper();
	}

  
}










