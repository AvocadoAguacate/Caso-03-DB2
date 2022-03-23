Fecha:: 2022-04-21T23:55
Estado:: #Pendiente
Enunciado::[Caso 03](https://estudianteccr-my.sharepoint.com/:b:/g/personal/estebanguzra_estudiantec_cr/EWxxx0KgvIBCmGLXLbKijmsBms_SsSZJAOFWxzmWlRZfIA?e=Q3TKWq)
Revisión:: 2022-04-26

---
# Caso03
## Preguntas
- 
## Tecnologías sugeridas
- bases de datos distribuidas: Cassandra, MongoDB, Redis
- cache: redis, cloud caches
- messaging Systems: SQS, Google queues, rabbitMQ, JMS, Kafka, Messaging Services de MS
- migration: Logstash, Kafka
- microservices: micronaut, .net microservices, spring*, Seneca, Devis, Ness, Serverless, Moleculer
- test: postman, jmeter

## Todo
| Estado     | Descripción                                            | Cita                                                                                                                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #Pendiente |                                                        | debe existir un mecanismo de data writting que proteja el acceso síncrono a la escritura, o bien que realice escrituras por batches o en modos lazy con garantía de escritura y cero pérdida de las actualizaciones que hacen                                                                                     |
| #Pendiente |                                                        | Todas las empresas de logística inscritas a ubertainer en un país acceden al mismo servidor del país, es ahí donde registran todos los espacios disponibles                                                                                                                                                       |
| #Pendiente | Creo que se refiere a un failover                      | Si el servidor de espacios disponibles de un país falla, sus datos deben haber sido replicados en algún otro país y automáticamente se accede a la información tanto para lectura como para escritura en ese otro servidor hasta que el servidor con fallo se recupere                                            |
| #Pendiente | Cache, Redis, buscar información                       | se debe minimizar al máximo el ingreso a las bases de datos para realizar consultas, en este caso para buscar espacios disponibles en contenedores que vayan de un país a otro; esto sugiere no realizar dichas búsquedas directamente en la base de datos                                                        |
| #Pendiente | Flujo principal de la aplicación                       | Una vez que un usuario decide bookear un espacio o varios espacios en contenedores, y una vez hecho el pago se genera una orden de envío en el sistema que contiene toda información necesaria del paquete que debe llegar a la empresa de logística, y hacia que contenedor va dirigido que tiene dicho espacio. |
| #Pendiente | Evitar conflictos en el flujo principal                | Tenga en cuenta que dos personas o más, podrían intentar bookear el mismo espacio al mismo tiempo.                                                                                                                                                                                                                |
| #Pendiente | Una base para consultar el estado de un envío ?        | es necesario migrar dicha información de esa base de datos a otra que lepermita a los usuarios consultar el estado y la ubicación del paquete en todo momento hasta que llegue a puerto destino                                                                                                                   |
| #Pendiente |                                                        | se requiere de un solo proceso migratorio que pase de la DB de actualizaciones, a la base de datos de órdenes de envío                                                                                                                                                                                            |
| #Pendiente |                                                        |                                                                                                                                                                                                                                                                                                                   |
| #Pendiente | Los datos del navío se van moviendo igual que el navío | sería deseable que dicha orden se vaya moviendo de localidad física conforme se actualiza la posición del navío en su ruta                                                                                                                                                                                        |
| #Pendiente | Usuario => revisar ubicación de envío                  | El usuario puede en cualquier momento abrir el sistema web para revisar por donde va su o sus contenedores con tan solo indicar la orden de envío                                                                                                                                                                 |
| #Pendiente |                                                        | No debe existir en su solución ningún “single point of failure”                                                                                                                                                                                                                                                   |
| #Pendiente |                                                        | toda la lógica se diseñe con microservicios                                                                                                                                                                                                                                                                       |
| #Pendiente |                                                        |                                                                                                                                                                                                                                                                                                                   |
