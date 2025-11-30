import { defineConfig } from 'cypress'
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8080', // Vite dev server address / vue cli adress
        env: {
            TEST_USERNAME: process.env.TEST_USERNAME,
            TEST_PASSWORD: process.env.TEST_PASSWORD,
        },
    },
})
