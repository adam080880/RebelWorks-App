import axios from 'axios'
import { movieDbApiKey, movieDbApiUrl } from '.'

export const movieDbConfigutation = () => {
  return axios.get(`${movieDbApiUrl}/configuration?api_key=${movieDbApiKey}`)
}
