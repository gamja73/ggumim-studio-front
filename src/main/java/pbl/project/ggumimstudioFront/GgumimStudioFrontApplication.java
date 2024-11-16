package pbl.project.ggumimstudioFront;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import pbl.project.ggumimstudioFront.common.config.YamlPropertySourceFactory;

@SpringBootApplication
@PropertySource(value = "classpath:env.yml", factory = YamlPropertySourceFactory.class)
public class GgumimStudioFrontApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(GgumimStudioFrontApplication.class, args);
    }
}
