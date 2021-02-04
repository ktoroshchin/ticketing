import { useState } from 'react'
import axios from 'axios'

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState([])

    const doRequest = async () => {
        setErrors([])
        try {
            const response = await axios[method](url,body)
            
            if(response.data) {
                onSuccess(response.data)
            }
        } catch(error) {
            setErrors(error.response.data.errors)
        }
    }

    const renderError = (field) => {
        if(errors.length > 0) {
            return errors.map((err, index) => {
                if(err.field === field) {
                    return (err.field === field) ? <span style={{color: 'red'}} key={err.message}>{err.message}</span> : <></>
                }
            })
        }
    }

    return { doRequest, renderError }
}

export default useRequest