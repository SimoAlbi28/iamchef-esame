package com.iamchef.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

// Questa classe configura la sicurezza dell'applicazione (chi puo' accedere a cosa)
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Filtro JWT: controlla il token in ogni richiesta
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Questa parte definisce le regole di sicurezza per tutte le rotte dell'applicazione
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Abilita il CORS (permette al frontend su porta 5173 di comunicare col backend su porta 8080)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Disabilita CSRF perche' usiamo token JWT (non servono cookie di sessione)
            .csrf(csrf -> csrf.disable())
            // STATELESS: il server non mantiene sessioni, ogni richiesta deve avere il token JWT
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Questa parte definisce quali rotte sono pubbliche e quali richiedono autenticazione
            .authorizeHttpRequests(auth -> auth
                // Le rotte di autenticazione (login/register) sono accessibili a tutti
                .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                // La ricerca ingredienti e' pubblica (non serve essere loggati)
                .requestMatchers(HttpMethod.GET, "/api/ingredients/**").permitAll()
                // La ricerca ricette e' pubblica
                .requestMatchers(HttpMethod.GET, "/api/recipes/**").permitAll()
                // La console H2 (database di sviluppo) e' accessibile
                .requestMatchers("/h2-console/**").permitAll()
                // I file statici del frontend (HTML, CSS, JS, immagini) sono pubblici
                .requestMatchers(HttpMethod.GET, "/", "/index.html", "/assets/**", "/icons/**").permitAll()
                // Le rotte SPA del frontend sono pubbliche
                .requestMatchers(HttpMethod.GET, "/search", "/discover", "/recipe/**").permitAll()
                // Tutto il resto richiede autenticazione (es. preferiti, profilo, cronologia)
                .anyRequest().authenticated()
            )
            // Permette l'uso di iframe dalla stessa origine (necessario per la console H2)
            .headers(headers -> headers.frameOptions(fo -> fo.sameOrigin()))
            // Aggiunge il filtro JWT prima del filtro standard di Spring Security
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Questa parte configura il CORS: definisce quali origini, metodi e headers sono permessi
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Origini permesse: il frontend Vite (5173) e il backend stesso (8080)
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:8080"));
        // Metodi HTTP permessi
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Headers permessi nelle richieste
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        // Permette l'invio di credenziali (cookie, token)
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // Questa parte crea il bean per criptare le password con l'algoritmo BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
