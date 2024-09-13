
# Innoscripta Full Stack Project Setup

This guide will walk you through the steps to set up both the backend (Laravel) and frontend (React) of the Innoscripta project using Docker. After completing the backend Laravel setup, follow these instructions to set up the frontend.

## Backend (Laravel) Setup Recap

Make sure you've completed the setup for the backend Laravel project before proceeding with the frontend.

1. **Clone the Backend Repository**:

   Clone the backend repository from GitHub:

   ```bash
   git clone https://github.com/srinivasgundale/innoscripta-laravel.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd innoscripta-laravel
   ```

3. **Set up Environment Variables**:

   Ensure that you have a `.env` file at the root of your project. You can copy the `.env.example` and modify it as necessary:

   ```bash
   cp .env.example .env
   ```

4. **Start the Docker Containers**:

   To build and run the backend application, use:

   ```bash
   docker-compose up --build
   ```

5. **Run Laravel Commands**:

   Set up the Laravel application by running these commands:

   - Clear the configuration cache:

     ```bash
     docker-compose exec app php artisan config:clear
     ```

   - Cache the configuration:

     ```bash
     docker-compose exec app php artisan config:cache
     ```

   - Run database migrations:

     ```bash
     docker-compose exec app php artisan migrate
     ```

   - Install Laravel Passport:

     ```bash
     docker-compose exec app php artisan passport:install
     ```

   - Set proper file permissions:

     ```bash
     docker-compose exec app chmod -R 777 storage bootstrap/cache
     ```

6. **Access the Backend Application**:

   The backend application should now be accessible at:

   - [http://localhost:8000](http://localhost:8000) (or the port you specified in your Docker Compose setup).

## Frontend (React) Setup

Once the backend Laravel project is running, follow the steps below to set up the frontend React project.

### Steps to Set Up the React Frontend

1. **Clone the React Repository**:

   Clone the frontend repository from GitHub:

   ```bash
   git clone https://github.com/srinivasgundale/innoscripta-react-app-test.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd innoscripta-react-app-test
   ```

3. **Start the Docker Containers**:

   Build and run the React frontend application with Docker:

   ```bash
   docker-compose up --build
   ```

4. **Access the Frontend Application**:

   Once the build is complete, the frontend will be accessible at:

   - **Frontend Application**: [http://localhost:8080](http://localhost:8080) (You can change the port in the `docker-compose.yml` file if needed).

### Important: Updating Backend URL in Frontend

If you make changes to the port number or domain for the backend Laravel project, ensure that you update the base URL in the frontend. This is necessary so that the frontend can communicate with the backend.

1. Open the file `src/utils/constants.js` in the React project directory.
2. Update the `API_BASE_URL` variable with the new URL for the backend.

For example:

```javascript
export const API_BASE_URL = 'http://localhost:8000'; // Update this to match the backend URL
```

### Additional Notes

- If you encounter any issues, ensure both Docker containers (backend and frontend) are running and correctly configured.
- The backend Laravel application should be running before the frontend React application is accessed.

## Conclusion

By following the steps outlined above, you should have both the backend (Laravel) and frontend (React) applications up and running using Docker. Ensure that the backend URL is correctly set in the React frontend to allow proper communication between the two.

If you encounter any issues or have questions, feel free to create an issue in the respective repositories.

