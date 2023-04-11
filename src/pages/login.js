import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { AUTH_USER } from '../graphQL/mutations/user'

const Login = () => {
    const [message, setMessage] = useState('')
    const [authUser] = useMutation(AUTH_USER)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Please enter a valid email')
                .required('Please enter your email'),
            password: Yup.string().required('Please enter your password')
        }),
        onSubmit: async values => {
            const { email, password } = values
            try {
                const { data } = await authUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                })
                setMessage('Authenticating...')
                const { token } = data.authUser
                localStorage.setItem('token', token)
                setTimeout(() => {
                    setMessage(null)
                    router.push('/')
                }, 1000)
            } catch (error) {
                setMessage(error.message.replace('authUser: Error: ', ''))
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
                console.error(error)
            }
        }
    })

    const showMessage = () => {
        return (
            <div className="bg-red-800 py-3 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }
    return (
        <>
            <Layout>
                {message && showMessage()}
                <h1 className="text-center text-2xl text-white font-light">
                    <span className="text-2xl font-black">🎬 MovieApp</span> - Login
                </h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="User Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="mb-4 text-red-700">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="User Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="mb-4 text-red-700">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                            <input
                                type="submit"
                                className="bg-red-800 w-full mt-5 p-2 text-white hover:cursor-pointer hover:bg-red-400"
                                value="Login"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login
