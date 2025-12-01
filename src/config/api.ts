// API Configuration
export const API_BASE_URL = 'http://localhost:8003';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
  },
  EMPLOYEES: `${API_BASE_URL}/api/employees`,
  ROLES: `${API_BASE_URL}/api/roles`,
  FILES: `${API_BASE_URL}/api/files`,
  IMPORT_EXPORT: `${API_BASE_URL}/api/import`,
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
};