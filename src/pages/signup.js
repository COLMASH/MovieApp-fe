import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { NEW_USER } from '../graphQL/mutations/user'

const SignUp = () => {
    const [message, setMessage] = useState('')
    const [newUser] = useMutation(NEW_USER)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please enter your name'),
            lastName: Yup.string().required('Please enter your last name'),
            email: Yup.string()
                .email('Please enter a valid email')
                .required('Please enter your email'),
            password: Yup.string()
                .required('Please enter your password')
                .min(5, 'Password must have at least 5 characters')
        }),
        onSubmit: async values => {
            const { name, lastName, email, password } = values
            try {
                const data = await newUser({
                    variables: {
                        input: {
                            name,
                            lastName,
                            email,
                            password
                        }
                    }
                })
                setMessage(`User with email: ${data.email} has been created successfully!`)
                setTimeout(() => {
                    setMessage(null)
                    router.push('/login')
                }, 3000)
            } catch (error) {
                setMessage(error.message.replace('newUser: Error: ', ''))
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
                    {' '}
                    <span className="text-2xl font-black">🎬 MovieApp</span> - SignUp
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
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="mb-4 text-red-700">{formik.errors.name}</div>
                                ) : null}
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="lastName"
                                >
                                    Last Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="mb-4 text-red-700">
                                        {formik.errors.lastName}
                                    </div>
                                ) : null}
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
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
                                value="SignUp"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default SignUp
