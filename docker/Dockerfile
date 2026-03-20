FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY app/pom.xml .
RUN mvn dependency:go-offline -B
COPY app/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
ENV ENV=production
EXPOSE 8080
COPY --from=builder /app/target/shopeasy-app-1.0.0.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
