import axios from 'axios'
import { movieDbApiKey, movieDbApiUrl } from '.'

export const nowPlaying = () => {
  return axios.get(`${movieDbApiUrl}/movie/now_playing?api_key=${movieDbApiKey}`)
}

export const discoverTv = (data = {}) => {
  let query = new URLSearchParams(data).toString()

  if (query) {
    query = '&' + query
  }

  return axios.get(`${movieDbApiUrl}/discover/tv?api_key=${movieDbApiKey}${query}`)
}

export const discoverMovie = (data = {}) => {
  let query = new URLSearchParams(data).toString()

  if (query) {
    query = '&' + query
  }

  return axios.get(`${movieDbApiUrl}/discover/movie?api_key=${movieDbApiKey}${query}`)
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

export const tvDetail = (tvId) => {
  return axios.get(`${movieDbApiUrl}/tv/${tvId}?api_key=${movieDbApiKey}`)
}

export const tvSeasonDetail = (tvId, seasonId) => {
  return axios.get(`${movieDbApiUrl}/tv/${tvId}/season/${seasonId}?api_key=${movieDbApiKey}`)
}
