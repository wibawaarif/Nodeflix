import axios from 'axios'

// Base URL
const baseURL = 'https://localhost:3000'

export default axios.create({
  baseURL,
})