import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast, Flip } from 'react-toastify'

export const RequestManager = ({ data, error, loading, loadingMessage, showSuccess = false }) => {
  const [toastId, setToastId] = useState(null)
  const defaultErrorMessage = 'خطا در ذخیره/بازیابی اطلاعات'
  const defaultLoadingMessage = 'در حال بارگذاری...'

  //Dispose Component
  useEffect(() => {
    return toast.dismiss()
  }, [])

  useEffect(() => {
    const resultId = data?.data?.id
    toastId &&
      toast.update(toastId, {
        render: (
          <>
            {data?.message} <br /> {resultId && `شناسه : ${resultId}`}
          </>
        ),
        type: 'success',
        closeButton: true,
        transition: Flip,
        isLoading: false,
        autoClose: 3000,
      })
    setToastId(null)
  }, [data])
  useEffect(() => {
    toastId &&
      toast.update(toastId, {
        render: error?.message ||  defaultErrorMessage,
        type: 'error',
        closeButton: true,
        transition: Flip,
        isLoading: false,
        autoClose: 3000,
      })
    error?.errors?.map((err) => {
      err?.message && toast.warning(err?.message)
    })
    setToastId(null)
  }, [error])

  useEffect(() => {
    if (loading) {
      const id = toast.loading(loadingMessage || defaultLoadingMessage)
      setToastId(id)
    } else {
      //elseZ
    }
  }, [loading])
  return <></>
}
RequestManager.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.any,
  loadingMessage: PropTypes.string,
  showSuccess: PropTypes.bool,
}
