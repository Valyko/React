import React, { useEffect } from 'react'
import Button from '../../Button'
import Input from '../Input'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../../store/login/ActionCreators'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './Login.module.scss'

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  login: ''
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Not an Email')
    .required('Email is a required field')
    .min(8, 'Too short'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short'),
  firstName: yup.string().required('Name is required'),
  lastName: yup.string().required('LastName is required'),
  login: yup.string().required('Login is required')
})

const Login = () => {
  const dispatch = useDispatch()
  const statusSignIn = useSelector(state => state.signIn.status)
  const statusLogin = useSelector(state => state.login.status)
  const navigate = useNavigate()
  const [visibleError, setVisibleError] = useState(false)
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (statusLogin === 'rejected') {
      setVisibleError(true)
    }
  }, [statusLogin])

  useEffect(() => {
    if (statusSignIn === 'resolved' || token) {
      navigate('/')
    }
  }, [statusSignIn, token, navigate])

  const registerUser = value => {
    dispatch(fetchLogin(value))
  }

  const SignInvalues = [
    { placeholder: 'First Name', name: 'firstName' },
    { placeholder: 'Last Name', name: 'lastName' },
    { placeholder: 'Login', name: 'login' },
    { placeholder: 'Email', name: 'email' },
    { placeholder: 'Password', name: 'password' }
  ]

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={registerUser}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <Form>
            {SignInvalues.map(value => {
              const { placeholder, name } = value
              return (
                <div key={name} className={styles.forinput}>
                  <Field
                    name={name}
                    placeholder={placeholder}
                    component={Input}
                    id={name}
                    type={name === 'password' ? 'password' : 'text'}
                  />
                  <span>
                    <ErrorMessage name={name} />
                  </span>
                </div>
              )
            })}
            {visibleError && (
              <span style={{ color: 'red' }}>User already exists</span>
            )}
            <Button text='Create User' disabled={!values.name} type='submit' />
          </Form>
        )
      }}
    </Formik>
  )
}

export default Login
