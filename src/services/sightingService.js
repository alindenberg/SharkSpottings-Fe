import Axios from 'axios'

function getAllSightings(queryString) {
  return Axios.get(`${process.env.VUE_APP_API_URL}/sightings?${queryString}`).then(sightings => sightings.data);
}
function createSighting(data, token) {
  Axios.post(`${process.env.VUE_APP_API_URL}/sightings`, data, authHeaders(token))
}

function authHeaders(token) {
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}
export {
  getAllSightings,
  createSighting
}