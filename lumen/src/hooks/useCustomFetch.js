import { useEffect } from 'react'

const useCustomFetch = (url) => {

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data
        })
        .catch(error => {
            return null
        })
    }, [url]);

}

export default useCustomFetch