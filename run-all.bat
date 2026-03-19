@echo off

echo Starting EcoRide Platform...

echo Starting Config Server...
start cmd /k "cd ecoride-config-server && mvn spring-boot:run"
timeout /t 5

echo Starting Eureka Server...
start cmd /k "cd ecoride-service-registry && mvn spring-boot:run"
timeout /t 5

echo Starting Microservices...
start cmd /k "cd ecoride-user-service && mvn spring-boot:run"
start cmd /k "cd ecoride-vehicle-service && mvn spring-boot:run"
start cmd /k "cd ecoride-maintenance-service && mvn spring-boot:run"

timeout /t 5

echo Starting API Gateway...
start cmd /k "cd ecoride-api-gateway && mvn spring-boot:run"

echo All services are starting...
pause