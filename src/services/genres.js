import axios from 'axios'
import { movieDbApiKey, movieDbApiUrl } from '.'

export const genre = () => {
  return axios.get(`${movieDbApiUrl}/genre/movie/list?api_key=${movieDbApiKey}&language=en-US`)
}

export const genreTv = () => {
  return axios.get(`${movieDbApiUrl}/genre/tv/list?api_key=${movieDbApiKey}&language=en-US`)
}
