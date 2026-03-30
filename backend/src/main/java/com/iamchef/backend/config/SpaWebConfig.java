package com.iamchef.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

// Questa classe configura il backend per servire il frontend React come Single Page Application (SPA)
// In pratica, quando un utente accede a un URL come /search o /recipe/123,
// il backend restituisce sempre index.html e lascia che React gestisca il routing
@Configuration
public class SpaWebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        // Non intercetta le chiamate API e la console H2 (quelle vanno ai controller)
                        if (resourcePath.startsWith("api/") || resourcePath.startsWith("h2-console")) {
                            return null;
                        }

                        // Se il file richiesto esiste (es. un CSS o JS), lo restituisce
                        // Altrimenti restituisce index.html (per far funzionare il routing di React)
                        Resource requested = location.createRelative(resourcePath);
                        return requested.exists() && requested.isReadable()
                                ? requested
                                : new ClassPathResource("/static/index.html");
                    }
                });
    }
}
