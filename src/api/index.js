import axios from 'axios'
import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import store from '@/store'
import { toast } from 'react-toastify'
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const GetUrl = () => {
  const origin = window.location.origin
  const host = window.location.host
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const href = window.location.href
  let port = window.location.port






  if (process.env.NODE_ENV !== 'production') {
    //NODE_ENV is :development
    port = '15000'
  } else {
    //NODE_ENV is :production
    port = '7071'
    return `${protocol}//${hostname}:${port}/api`
  }
  return apiUrl
}

const GetHeaders = () => {
  const token = localStorage.getItem('autToken')
  // const current = new Date()
  // const time = current.toLocaleTimeString('en-US')
  return {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  }
}

const GetAxiosConfig = () => {
  return {
    baseURL: GetUrl(),
    headers: GetHeaders(),
  }
}

const getHttpClient = () => {
  return axios.create(GetAxiosConfig())
}
// httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// Headers.Authorization = 'Bearer ' + token;

/////////////////////////////////////////////////////////////////////////////

const handleError = (error) => {
  if (error.message === 'Network Error') {
    toast.error('خطا در برقراری ارتباط با سرور')
  }
  if (error?.response?.status === 401) {
    // const store = JSON.parse(localStorage.getItem('persist:root'))
    // store.autUser = null
    // localStorage.setItem('persist:root', store)
    // window.location = '/#/login'
    // window.location.reload()
    toast.error('خطای احراز هویت')
    store.dispatch({ type: 'set', autUser: null })
    store.dispatch({ type: 'set', autToken: null })
  }
  if (error?.response?.status === 403) {
    toast.error('توکن منقضی شده است')
    store.dispatch({ type: 'set', autUser: null })
    store.dispatch({ type: 'set', autToken: null })
  }
  if (error?.response && error?.response?.status) {
    const statusCode = parseInt(error.response.status)
    if (statusCode >= 500) {
      toast.error('خطای سمت سرور')
    }
  }
  if (error?.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.warn('درخواست انجام شد و سرور با یک کد وضعیت پاسخ داد')
    console.log('data => ', error.response.data)
    console.log('status => ', error.response.status)
    console.log('headers => ', error.response.headers)
  } else if (error?.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('درخواست انجام شد اما پاسخی دریافت نشد')
    console.error('request => ', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error From Api Layer --> ', error)
    console.error('Error Msg => ', error.message)
  }
}

/////////////////////////////////////////////////////////////////////////////
export const Get = async (url, data) => {
  try {
    let res = await axios({
      url: `${GetUrl()}${url}`,
      method: 'get',
      data: data,
      //timeout: 8000,
      headers: Headers,
    })
    return res.data
  } catch (error) {
    handleError(error)
    return error
  }
}
export const Post = async (url, data) => {
  try {
    let res = await axios({
      url: `${GetUrl()}${url}`,
      method: 'post',
      data: data,
      //timeout: 8000,
      headers: Headers,
    })
    //return res.data
    return { data: res.data }
  } catch (error) {
    handleError(error)
    return { error: error }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getHttpClient()
        .get(url)
        .then(
          (response) => {
            setData(response.data)
            setLoading(false)
          },
          (error) => {
            if (error?.response?.data) {
              setError(error.response.data)
            } else {
              setError(error)
            }
            setLoading(false)
            handleError(error)
          },
        )
    }
    fetchData()
  }, [url])
  return [data, loading, error]
}

export const usePost = (url, body) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const postData = async () => {
      setLoading(true)
      await getHttpClient()
        .post(url, body)
        .then(
          (response) => {
            setData(response.data)
            setLoading(false)
          },
          (error) => {
            if (error?.response?.data) {
              setError(error.response.data)
            } else {
              setError(error)
            }
            setLoading(false)
            handleError(error)
          },
        )
    }
    postData()
  }, [url])
  return [data, loading, error]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useFetchWithHandler = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiCall = useCallback(async (url) => {
    try {
      setData(null)
      setError(null)
      setLoading(true)
      await getHttpClient()
        .get(url)
        .then(
          (response) => {
            setData(response.data)
            setLoading(false)
          },
          (error) => {
            if (error?.response?.data) {
              setError(error.response.data)
            } else {
              setError(error)
            }
            setLoading(false)
            handleError(error)
          },
        )
    } catch (error) {
      setError(error)
      setLoading(false)
      handleError(error)
    }
  }, [])
  return [data, loading, error, apiCall]
}

export const usePostWithHandler = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiCall = useCallback(async (url, body) => {
    try {
      setData(null)
      setError(null)
      setLoading(true)
      await getHttpClient()
        .post(url, body)
        .then(
          (response) => {
            setData(response.data)
            setLoading(false)
          },
          (error) => {
            if (error?.response?.data) {
              setError(error.response.data)
            } else {
              setError(error)
            }
            setLoading(false)
            handleError(error)
          },
        )
    } catch (error) {
      setError(error)
      setLoading(false)
      handleError(error)
    }
  }, [])
  return [data, loading, error, apiCall]
}

export const usePutWithHandler = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiCall = useCallback(async (url, body) => {
    try {
      setData(null)
      setError(null)
      setLoading(true)
      await getHttpClient()
        .put(url, body)
        .then(
          (response) => {
            setData(response.data)
            setLoading(false)
          },
          (error) => {
            if (error?.response?.data) {
              setError(error.response.data)
            } else {
              setError(error)
            }
            setLoading(false)
            handleError(error)
          },
        )
    } catch (error) {
      setError(error)
      setLoading(false)
      handleError(error)
    }
  }, [])
  return [data, loading, error, apiCall]
}

export const useDelWithHandler = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiCall = useCallback(async (url, body) => {
    try {
      setData(null)
      setError(null)
      setLoading(true)
      await getHttpClient()
        .delete(url, body)
        .then(
          (response) => {
            setData(response.data)
            setLoading(false)
          },
          (error) => {
            if (error?.response?.data) {
              setError(error.response.data)
            } else {
              setError(error)
            }
            setLoading(false)
            handleError(error)
          },
        )
    } catch (error) {
      setError(error)
      setLoading(false)
      handleError(error)
    }
  }, [])
  return [data, loading, error, apiCall]
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
