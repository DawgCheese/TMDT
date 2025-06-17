package com.bakery.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Mới thêm
                .csrf(csrf -> csrf.disable())  // tắt CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register", "/api/orders").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**","/api/categories/**","/api/brands/**","/api/payment/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/products/**","/api/categories/**","/api/brands/**","/api/payment/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/products/**","/api/categories/**","/api/brands/**","/api/payment/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/products/**","/api/categories/**","/api/brands/**","/api/payment/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());  // kích hoạt http basic

        return http.build();
    }

    // Thêm bean PasswordEncoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // 👇 Bean CORS cấu hình cho phép frontend truy cập
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // 👈 host React
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // nếu bạn dùng session

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // áp dụng cho tất cả endpoint
        return source;
    }
}
