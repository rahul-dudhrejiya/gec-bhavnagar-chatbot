import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  let sessionId = sessionStorage.getItem('gec_session_id')
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem('gec_session_id', sessionId)
  }
  config.headers['X-Session-ID'] = sessionId
  return config
})

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.error || (err.code === 'ECONNABORTED' ? 'Request timeout.' : 'Network error. Check backend.')
    return Promise.reject(new Error(message))
  }
)

export const sendChat = (message) => {
  const sessionId = sessionStorage.getItem('gec_session_id') || 'anon'
  return api.post('/chat', { message, sessionId })
}
export const getAllBranches = () => api.get('/branches')
export const getBranch = (code) => api.get(`/branches/${code}`)
export const getBranchFaculty = (code) => api.get(`/branches/${code}/faculty`)
export const getBranchSemester = (code, sem) => api.get(`/branches/${code}/semesters/${sem}`)
export const getPlacements = () => api.get('/placements')
export const getBranchPlacement = (code) => api.get(`/placements/${code}`)
export const getHolidays = () => api.get('/holidays')
export const getNotices = (params = {}) => api.get('/notices', { params })
export const getCollegeInfo = () => api.get('/college-info')
export const searchQuery = (q) => api.get(`/search?q=${encodeURIComponent(q)}`)
export default api
