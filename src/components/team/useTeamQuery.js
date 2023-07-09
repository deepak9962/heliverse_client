import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { getTeams } from '../../api/team'

function useUserQuery(url) {
    const { teamReload, dispatch } = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [team, setTeam] = useState([])

    useEffect(() => {
        setLoading(true)
        let cancelToken = axios.CancelToken.source()
        const data = {
            url: url,
            cancelToken: cancelToken
        }

        getTeams(data).then(res => {
            if (res.data !== undefined) {
                setTeam(res.data.teams)
                setLoading(false)
            }
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })

        if (!error) {
            dispatch({
                type: 'SET_TEAM_RELOAD',
                payload: {
                    teamReload: false
                }
            })
        }

        return () => cancelToken.cancel()
    }, [url, error, teamReload, dispatch])

    return { loading, error, team }
}

export default useUserQuery