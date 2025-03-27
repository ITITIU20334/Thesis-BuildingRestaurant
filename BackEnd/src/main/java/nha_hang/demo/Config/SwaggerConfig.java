package nha_hang.demo.Config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi danhmucAPI() {
        return GroupedOpenApi.builder()
                .group("restaurant")
                    .pathsToMatch("/api/v1/restaurant/**")
                .build();
    }

    @Bean
    public io.swagger.v3.oas.models.OpenAPI customOpenAPI() {
        return new io.swagger.v3.oas.models.OpenAPI().info(new Info()
        .title("Danhmuc API")
                .version("1.0")
                .description("Danhmuc API"));
    }
}
