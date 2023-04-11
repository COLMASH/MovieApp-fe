import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/graphQL/queries/user'
import { useRouter } from 'next/router'

export default function Favorites() {
    const [token, setToken] = useState(null)
    const [hasEffectFinished, setHasEffectFinished] = useState(false)
    const router = useRouter()

    useQuery(GET_USER, {
        skip: !hasEffectFinished,
        variables: { token },
        onError: () => router.push('/login')
    })

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setHasEffectFinished(true)
    }, [token])

    return (
        <div>
            <Layout>
                <h1 className="text-2xl">🍿 Favorites</h1>
            </Layout>
        </div>
    )
}
