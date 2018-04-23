import axios from 'axios'
import Cookies from 'js-cookie'

function clearData () {
  Cookies.remove('username')
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

function updateTokens () {
  return axios({
    method: 'GET',
    url: makeAbsolute('/v1/users/' + Cookies.get('username') + '/token'),
    headers: { Authorization: 'Bearer ' + Cookies.get('refreshToken') }
  }).then(response => {
    Cookies.set('accessToken', response.data.data.accessToken)
  })
}

function makeAbsolute (url) {
  return process.env.API_PATH + url
}

function get (url) {
  let params = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + Cookies.get('accessToken') }
  }
  return request(params, url)
}

function post (url, body) {
  let params = {
    method: 'POST',
    data: body,
    headers: { Authorization: 'Bearer ' + Cookies.get('accessToken') }
  }
  return request(params, url)
}

function request (params, url) {
  params.url = url
  return axios(params).then(response => {
    return response.data
  }).catch(err => {
    if (err.response && (err.response.status === 400 || err.response.status === 401)) {
      return updateTokens().then(() => {
        params.headers.Authorization = 'Bearer ' + Cookies.get('accessToken')
        return axios(params).then(response => response.data)
      })
    } else {
      console.log(err)
      throw err
    }
  })
}

export default {
  clearData,
  get,
  post,
  makeAbsolute
}
