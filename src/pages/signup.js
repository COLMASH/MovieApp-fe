import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'

const NEW_USER = gql`
    mutation newUser($input: UserInput) {
        newUser(input: $input) {
            name
            lastName
            email
        }
    }
`

const SignUp = () => {
    const [newUser] = useMutation(NEW_USER)

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
                await newUser({
                    variables: {
                        input: {
                            name,
                            lastName,
                            email,
                            password
                        }
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">SignUp</h1>
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
                                    onChange={formik.handleChange}
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
                                    onChange={formik.handleChange}
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
                                    onChange={formik.handleChange}
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
