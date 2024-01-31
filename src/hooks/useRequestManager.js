import { useEffect, useState } from 'react'
import { toast, Flip } from 'react-toastify'
//====================================================================
//                        useEffects
//====================================================================
const useRequestManager = ({ data, error, loading, loadingMessage }) => {
  const [toastId, setToastId] = useState(null)
  const defaultSuccessMessage = 'عملیات با موفقیت انجام شد'
  const defaultErrorMessage = 'خطا در ذخیره/بازیابی اطلاعات'
  const defaultLoadingMessage = 'در حال بارگذاری...'
  //====================================================================
  //                        Functions
  //====================================================================
  const getSuccessMessage = (data) => {
    const resultId = data?.data?.id
    return (
      // <>
      //   {data?.message || defaultSuccessMessage}  {resultId && `شناسه : ${resultId}`}
      // </>
      (data?.message || defaultSuccessMessage)  + (resultId && `شناسه : ${resultId}`)
    )
  }
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    return toast.dismiss()
  }, [])

  useEffect(() => {
    if (toastId) {
      toast.update(toastId, {
        render: getSuccessMessage(data),
        type: 'success',
        closeButton: true,
        transition: Flip,
        isLoading: false,
        autoClose: 3000,
      })
    } else {
      data && toast.success(getSuccessMessage(data))
    }
    setToastId(null)
  }, [data])

  useEffect(() => {
    if (toastId) {
      toast.update(toastId, {
        render: error?.message || defaultErrorMessage ,
        type: 'error',
        closeButton: true,
        transition: Flip,
        isLoading: false,
        autoClose: 3000,
      })
    } else {
      if(error?.errors?.length >0){
        error?.errors?.map((err) => {
          err?.message && err?.message !== error?.message && toast.warning(err?.message)
        })
      }else{
        error && toast.error(error?.message || defaultErrorMessage )
      }
    }
    error?.title && toast.error(error?.title)
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

  return null
}

export default useRequestManager
