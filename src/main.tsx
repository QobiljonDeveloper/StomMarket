import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.tsx'

// Global Axios Logging Interceptor for Raw Queries
axios.interceptors.request.use((request) => {
  console.log(`[Axios Request] URL: ${request.baseURL || ''}${request.url} | Method: ${request.method?.toUpperCase()} | Body:`, request.data);
  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log(`[Axios Response] Status: ${response.status} | URL: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`[Axios Error] Status: ${error.response?.status} | URL: ${error.config?.url} | Message: ${error.message}`, error.response?.data);
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
