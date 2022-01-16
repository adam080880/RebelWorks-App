import axios from 'axios'
import { movieDbApiKey, movieDbApiUrl } from '.'

export const nowPlaying = () => {
  return axios.get(`${movieDbApiUrl}/movie/now_playing?api_key=${movieDbApiKey}`)
}

export const discoverTv = () => {
  return axios.get(`${movieDbApiUrl}/discover/tv?api_key=${movieDbApiKey}`)
}

export const credits = (movieId) => {
  return axios.get(`${movieDbApiUrl}/movie/${movieId}/credits?api_key=${movieDbApiKey}`)
}

export const tvCredits = (tvId) => {
  return axios.get(`${movieDbApiUrl}/tv/${tvId}/credits?api_key=${movieDbApiKey}`)
}

export const similar = (movieId) => {
  return axios.get(`${movieDbApiUrl}/movie/${movieId}/similar?api_key=${movieDbApiKey}`)
}

export const tvSimilar = (tvId) => {
  return axios.get(`${movieDbApiUrl}/tv/${tvId}/similar?api_key=${movieDbApiKey}`)
}

