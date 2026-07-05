import axios from 'axios';

// Instantiate Axios Client pointing to local dev root
const api = axios.create({
  baseURL: '/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// A global toggle to simulate backend failures (allows testing React Error Boundaries)
let simulateApiError = false;

export const toggleApiErrorSimulation = (state) => {
  simulateApiError = state;
  localStorage.setItem('simulate_api_error', state ? 'true' : 'false');
};

export const getApiErrorStatus = () => {
  return localStorage.getItem('simulate_api_error') === 'true' || simulateApiError;
};

// Response Interceptor to simulate server latency and error boundaries
api.interceptors.response.use(
  async (response) => {
    // Inject simulated network delay (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (getApiErrorStatus()) {
      return Promise.reject({
        message: 'Internal Server Error (500): The database server failed to compile query request.',
        response: { status: 500, data: { message: 'Database failure' } }
      });
    }
    
    return response;
  },
  (error) => {
    return Promise.reject({
      message: error.message || 'Network Error: Failed to fetch records from mock backend.',
      response: error.response
    });
  }
);

// Mock data-fetching layers resolving with standard Axios responses
export const mockDataService = {
  fetchDashboardKPIs: async () => {
    try {
      await api.get('/api/kpi-heartbeat.json');
      return {
        success: true,
        message: 'KPIs fetched successfully'
      };
    } catch (err) {
      throw err;
    }
  },
  
  fetchRecentLogs: async () => {
    try {
      await api.get('/api/activity-logs.json');
      return {
        success: true,
        message: 'Logs fetched'
      };
    } catch (err) {
      throw err;
    }
  }
};

export default api;

