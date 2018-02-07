import axios from 'axios'
import Cookies from 'js-cookie'

function updateTokens () {
  return axios({
    method: 'GET',
    url: process.env.API_PATH + '/users/' + Cookies.get('username') + '/token',
    headers: { Authorization: 'Bearer ' + Cookies.get('refreshToken') }
  }).then(response => {
    Cookies.set('accessToken', response.data.data.accessToken)
  })
}

function get (path) {
  let params = {
    method: 'GET',
    url: process.env.API_PATH + path,
    headers: { Authorization: 'Bearer ' + Cookies.get('accessToken') }
  }
  return axios(params).then(response => {
    return response.data.data
  }).catch(err => {
    if (err.response && (err.response.status === 400 || err.response.status === 401)) {
      return updateTokens().then(() => {
        params.headers.Authorization = 'Bearer ' + Cookies.get('accessToken')
        return axios(params)
      })
    } else {
      console.log(err)
      return err
    }
  })
}

export default {
  get
}
