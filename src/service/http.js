import axios from 'axios'

const appPath = process.env.VUE_APP_PATH === '/' ? '' : process.env.VUE_APP_PATH

const service = axios.create({
  timeout: 60000,
  baseURL: appPath,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
})

service.interceptors.request.use((config) => {
    /*if (getCookie('token')) {
      config.headers['Authorization'] = 'Bearer ' + getCookie('token');
    }*/
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 请求配置发生的错误
    if (!error.response) {
      console.log(error.message)
    } else {
      let message = error.response.data.message ? error.response.data.message : error.response
      return { code: status, message: error.response }; 
    }
  }
)

export default service