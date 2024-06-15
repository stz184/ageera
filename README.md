# Project Summary

My goal was to create a service for posting and getting data from a database. Every insertion to the database should be performed only after the data has been validated. If the data isn't valid then the service should return an error message.



## Solution 

Despite the fact I was allowed to use any technology, I decided to demonstrate my skills using the technologies the company has in its tool chain: node.js with Typescript, TypeORM and PostgreSQL. Given the structured nature of the data and the need for strict validation and relationships, an SQL database is more suitable for this task and that's why I selected it. 

### Database

The provided JSON snippets were unclear if they are just example of the data that I need to store, example responses or example request payloads. So I assumed I can threat them as illustrative and organized the data in more structured nature like that:

1. **`sites` Table:**
   - `id`: Primary key, automatically incrementing.
   - `name`: Name of the site, cannot be null.
   - `location`: Location of the site, cannot be null.
2. **`configurations` Table:**
   - `id`: Primary key, automatically incrementing.
   - `site_id`: Foreign key referencing the `id` column in the `sites` table. The `ON DELETE CASCADE` clause ensures that if a site is deleted, the related configurations are also deleted.
   - `battery_vendor`: Must be either 'Tesla' or 'KATL'.
   - `battery_capacity_kwh`, `battery_max_power_kw`: Must be non-negative.
   - `production_pv_units`, `production_bio_units`, `production_cro_units`: Must be non-negative.
   - `production_pv_kwp`, `production_cro_kwp`: No specific constraints as they can be zero or more.
3. **`live_data` Table:**
   - `id`: Primary key, automatically incrementing.
   - `site_id`: Foreign key referencing the `id` column in the `sites` table. The `ON DELETE CASCADE` clause ensures that if a site is deleted, the related live data entries are also deleted.
   - `dt_stamp`: Timestamp of the data entry, cannot be null.
   - `soc`: State of charge, must be between 0 and 100.
   - `load_kwh`, `net_load_kwh`: Must be non-negative.
   - `pv_notification`, `bio_notification`, `cro_notification`: Must be boolean values.

Indexes are added on the `site_id` and `dt_stamp` columns to improve the performance of queries filtering by site and timestamp.



## Endpoints

An example Bruno collection is provided as part of this repo. Bruno is a Fast and Git-Friendly Opensource API client, aimed at revolutionizing the status quo represented by Postman, Insomnia and similar tools out there. You can download it for free from https://www.usebruno.com/



## Scalability

To scale this service to handle millions of requests per day, we need to design a cloud-based, highly available, and scalable architecture. Here’s how we can achieve this:

### Cloud Architecture Components

1. **API Gateway:**

   - Acts as a single entry point for all client requests.
   - Can handle authentication, rate limiting, and request routing.

2. **Load Balancer:**

   - Distributes incoming traffic across multiple instances of the service to ensure no single instance is overwhelmed.

3. **Microservices:**

   - Split the service into smaller, independently deployable services. For example, separate services for sites, configurations, and live data.

4. **Containerization and Orchestration:**

   - Use Docker to containerize the services.
   - Use Kubernetes (K8s) to manage and orchestrate the containers, ensuring high availability and scalability.

5. **Database:**

   - Use a managed relational database service like Amazon RDS for PostgreSQL for persistent storage.
   - Use read replicas to handle read-heavy loads and ensure high availability.
   - Implement database sharding if the write load becomes too high.

6. **Caching:**

   - Use a distributed cache (Redis or Memcached) to store frequently accessed data and reduce database load.

7. **Message Queue:**

   - Use a message queue service like Amazon SQS or Apache Kafka to decouple and buffer requests, ensuring smooth processing even during traffic spikes.

   

### 