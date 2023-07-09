import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { getUsers } from '../../api/users'
import { AppContext } from '../../context/AppContext'

function useUserQuery(query, filter, currentPage) {
    const { userReload, dispatch } = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [next, setNext] = useState()
    const [prev, setPrev] = useState()

    useEffect(() => {
        setLoading(true)
        let cancelToken = axios.CancelToken.source()
        const data = {
            url: currentPage,
            params: {
                q: query,
                domain: filter.domain,
                gender: filter.gender,
                available: filter.available
            },
            cancelToken: cancelToken
        }

        getUsers(data).then(res => {
            if (res.data !== undefined) {
                setUsers(res.data.users)
                setPrev(res.data.prev)
                setNext(res.data.next)
                setLoading(false)
            }
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })

        if (!error) {
            dispatch({
                type: 'SET_USER_RELOAD',
                payload: {
                    userReload: false
                  }
            })
        }

        return () => cancelToken.cancel()
    }, [currentPage, query, filter, error, userReload, dispatch])

    return { loading, error, users, next, prev }
}

export default useUserQuery