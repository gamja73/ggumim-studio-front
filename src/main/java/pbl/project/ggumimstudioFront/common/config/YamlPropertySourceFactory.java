package pbl.project.ggumimstudioFront.common.config;

import lombok.NonNull;
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.io.support.PropertySourceFactory;

import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.Resource;

public class YamlPropertySourceFactory implements PropertySourceFactory
{
    @Override
    @NonNull
    public PropertySource<?> createPropertySource(String name, EncodedResource resource) throws IOException
    {
        Resource res = resource.getResource();
        if (!res.exists())
        {
            throw new IOException("Resource does not exist: " + res.getFilename());
        }

        if (res.getFilename() == null)
        {
            throw new IOException("YAML file name is undefined for resource: " + res.getDescription());
        }

        YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
        factory.setResources(res);

        Properties properties = factory.getObject();

        if (properties == null)
        {
            throw new IOException("Failed to load properties from YAML file: " + res.getFilename());
        }

        return new PropertiesPropertySource(res.getFilename(), properties);
    }
}

