package com.example.demo;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.entities.*;
import com.example.demo.repository.*;

@SpringBootApplication
@ComponentScan(basePackages = { "com.example.demo", "com.morocco" })
@EntityScan(basePackages = { "com.example.demo.entities", "com.morocco.entities" })
@EnableJpaRepositories(basePackages = { "com.example.demo.repository", "com.morocco.repository" })
public class MoroccoBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoroccoBackendApplication.class, args);
    }

    @Bean
    public org.modelmapper.ModelMapper modelMapper() {
        return new org.modelmapper.ModelMapper();
    }


    /**
     * Seed de données de test
     */
    @Bean
    public org.springframework.boot.CommandLineRunner initData(
            AdresseRepository adresseRepository,
            RoleRepository roleRepository,
            LangueRepository langueRepository,
            UserRepository userRepository,
            TarifRepository tarifRepository,
            GuideRepository guideRepository,
            TypeEvenementRepository typeEvenementRepository,
            EvenementRepository evenementRepository,
            ReservationRepository reservationRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            // Pour éviter de reseeder à chaque démarrage
            if (userRepository.count() > 0 || evenementRepository.count() > 0) {
                return;
            }

            Random random = new Random();

            // --------- ROLES ----------
            Role adminRole = new Role();
            adminRole.setNom("ADMIN");

            Role guideRole = new Role();
            guideRole.setNom("GUIDE");

            Role touristeRole = new Role();
            touristeRole.setNom("TOURISTE");


            roleRepository.saveAll(Arrays.asList(adminRole, guideRole, touristeRole));

            // --------- LANGUES ----------
            Langue fr = new Langue();
            fr.setNomLangue("Français");
            Langue en = new Langue();
            en.setNomLangue("Anglais");
            Langue es = new Langue();
            es.setNomLangue("Espagnol");
            Langue ar = new Langue();
            ar.setNomLangue("Arabe");
            Langue de = new Langue();
            de.setNomLangue("Allemand");

            List<Langue> langues = langueRepository.saveAll(Arrays.asList(fr, en, es, ar, de));

            // --------- ADRESSES ----------
            List<Adresse> adresses = IntStream.range(0, 15)
                    .mapToObj(i -> {
                        Adresse a = new Adresse();
                        a.setAdresse("Rue " + (10 + i));
                        a.setcode_postal("100" + i);
                        a.setPays("Maroc");
                        a.setVille(i % 2 == 0 ? "Marrakech" : "Casablanca");
                        return a;
                    })
                    .map(adresseRepository::save)
                    .collect(Collectors.toList());

            // --------- TARI FS ----------
            List<Tarif> tarifs = IntStream.range(0, 20)
                    .mapToObj(i -> {
                        Tarif t = new Tarif();
                        t.setPrix(50 + i * 10.0);
                        t.setPromotion((i % 3 == 0) ? 10.0 : 0.0);
                        return t;
                    })
                    .map(tarifRepository::save)
                    .collect(Collectors.toList());

            // --------- GUIDES ----------
            List<Guide> guides = IntStream.range(0, 10)
                    .mapToObj(i -> {
                        Guide g = new Guide();
                        g.setTarif(200.0 + i * 15);
                        // si tu as un champ disponibilite dans Guide :
                        // g.setDisponibilite(i % 2 == 0);
                        return g;
                    })
                    .map(guideRepository::save)
                    .collect(Collectors.toList());

            // --------- USERS ----------
            List<User> users = IntStream.range(0, 40)
                    .mapToObj(i -> {
                        User u = new User();
                        u.setNom("Nom" + i);
                        u.setPrenom("Prenom" + i);
                        u.setEmail("user" + i + "@test.com");
                        u.setNumTel("0600000" + String.format("%02d", i));
                        u.setPassword(passwordEncoder.encode("password" + i));
                        u.setVerifMail(i % 2 == 0);

                        // adresse aléatoire
                        u.setAdresse(adresses.get(random.nextInt(adresses.size())));

                        // rôle : quelques admins, quelques guides, beaucoup de touristes
                        if (i < 3) {
                            u.setRole(adminRole);
                        } else if (i < 10) {
                            u.setRole(guideRole);
                        } else {
                            u.setRole(touristeRole);
                        }

                        // langues (1 à 3 langues)
                        Set<Langue> languesUser = new HashSet<>();
                        int nbLangues = 1 + random.nextInt(3);
                        for (int j = 0; j < nbLangues; j++) {
                            languesUser.add(langues.get(random.nextInt(langues.size())));
                        }
                        u.setLangues(languesUser);

                        return u;
                    })
                    .map(userRepository::save)
                    .collect(Collectors.toList());

            // --------- TYPES D'ÉVÉNEMENT ----------
            TypeEvenement randonnee = new TypeEvenement();
            randonnee.setLibelleType("Randonnée");

            TypeEvenement visite = new TypeEvenement();
            visite.setLibelleType("Visite guidée");

            TypeEvenement desert = new TypeEvenement();
            desert.setLibelleType("Excursion désert");

            TypeEvenement gastronomie = new TypeEvenement();
            gastronomie.setLibelleType("Tour gastronomique");

            List<TypeEvenement> typeEvenements = typeEvenementRepository.saveAll(
                    Arrays.asList(randonnee, visite, desert, gastronomie)
            );

            // --------- ÉVÉNEMENTS ----------
            List<Evenement> evenements = IntStream.range(0, 25)
                    .mapToObj(i -> {
                        Evenement e = new Evenement();
                        e.setTitreEvent("Événement " + i);
                        e.setDescription("Description de l'événement " + i);
                        e.setImage("image" + i + ".jpg");

                        LocalDateTime start = LocalDateTime.now().plusDays(i);
                        e.setDateDebut(start);
                        e.setDateFin(start.plusHours(4));

                        e.setAdresse(adresses.get(random.nextInt(adresses.size())));
                        e.setTarif(tarifs.get(random.nextInt(tarifs.size())));
                        e.setGuide(guides.get(random.nextInt(guides.size())));

                        // types (1 à 2 types)
                        int nbTypes = 1 + random.nextInt(2);
                        Set<TypeEvenement> typesEvt = new HashSet<>();
                        for (int j = 0; j < nbTypes; j++) {
                            typesEvt.add(typeEvenements.get(random.nextInt(typeEvenements.size())));
                        }
                        e.setTypeEvenement(new ArrayList<>(typesEvt));

                        // participants (3 à 10 users)
                        int nbParticipants = 3 + random.nextInt(8);
                        Set<User> participants = new HashSet<>();
                        for (int j = 0; j < nbParticipants; j++) {
                            participants.add(users.get(random.nextInt(users.size())));
                        }
                        e.setUsers(new ArrayList<>(participants));

                        return e;
                    })
                    .map(evenementRepository::save)
                    .collect(Collectors.toList());

            // --------- RÉSERVATIONS ----------
            List<String> statuts = Arrays.asList("En attente", "Confirmé", "Annulé");

            IntStream.range(0, 60).forEach(i -> {
                Reservation r = new Reservation();
                r.setNombrePersonne(1 + random.nextInt(5));

                LocalDateTime dateRes = LocalDateTime.now().minusDays(random.nextInt(10));
                r.setDateReservation(dateRes);

                String statut = statuts.get(random.nextInt(statuts.size()));
                r.setStatut(statut);

              
                if ("Annulé".equals(statut)) {
                    r.setDateAnnulation(dateRes.plusHours(1 + random.nextInt(48)));
                }

                r.setEvenement(evenements.get(random.nextInt(evenements.size())));
                r.setUser(users.get(random.nextInt(users.size())));

                reservationRepository.save(r);
            });

            System.out.println("********* Données de test insérées *********");
        };
    }
}
