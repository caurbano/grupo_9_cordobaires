import { useEffect, useState } from 'react'

const useCustomFetch = (url) => {

    const [state, setState] = useState({data: null, hasError: null});

    useEffect(() => {
        fetch(url, {
            headers: {
                'Access-Control-Allow-Origin':'*'
            },
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => { setState({
                data,
                hasError: null
            }) 
        })
        .catch(error => {
            setState({
                data: null,
                hasError: error
            })
        })
    }, [url]);

  return { data : state.data, hasError : state.hasError }
}

export default useCustomFetch