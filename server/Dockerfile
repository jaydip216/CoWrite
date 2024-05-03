# Use JDK 17 as the base image
FROM eclipse-temurin:17-jdk-focal

# Set the working directory in the container
WORKDIR /app

RUN apt-get update && apt-get install -y maven

COPY src ./src
COPY pom.xml ./pom.xml

RUN mvn package

# Expose the port that your Spring Boot application listens on (if applicable)
EXPOSE 8080

# Set the command to run your Spring Boot application
CMD ["java", "-jar", "target/cowrite-0.0.1.jar"]