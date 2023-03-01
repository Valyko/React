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
  login: '',
  confirm: ''
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
    .min(8, 'Password is too short')
    .matches(/^[0-9a-zA-Z]*$/, 'Enter valid password')
    .max(25, 'Password is too long'),
  firstName: yup
    .string()
    .matches(/^[A-Za-z]*$/, 'Please enter valid name')
    .min(3, 'Too short')
    .max(15, 'Too long')
    .required('Name is required'),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]*$/, 'Please enter valid name')
    .min(3, 'Too short')
    .max(15, 'Too long')
    .required('LastName is required'),
  login: yup
    .string()
    .matches(/^[0-9a-zA-Z]*$/, 'Please enter valid login')
    .required('Login is required')
    .min(3, 'Too short')
    .max(15, 'Too long')
})

const Login = () => {
  const dispatch = useDispatch()
  const statusSignIn = useSelector(state => state.signIn.status)
  const statusLogin = useSelector(state => state.login.status)
  const errorMessage = useSelector(state => state.login.error)
  const navigate = useNavigate()
  const [visibleError, setVisibleError] = useState(false)
  const token = useSelector(state => state.auth.token)
  const [typeForPass, setTypeForPasss] = useState('password')
  const [typeForPassNew, setTypeForPasssNew] = useState('password')

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

  const showPass = value => {
    value === 'old'
      ? typeForPass === 'password'
        ? setTypeForPasss('text')
        : setTypeForPasss('password')
      : typeForPassNew === 'password'
      ? setTypeForPasssNew('text')
      : setTypeForPasssNew('password')
  }

  const SignInvalues = [
    { placeholder: 'First Name', name: 'firstName', type: 'text' },
    { placeholder: 'Last Name', name: 'lastName', type: 'text' },
    { placeholder: 'Login', name: 'login', type: 'text' },
    { placeholder: 'Email', name: 'email', type: 'text' },
    { placeholder: 'Password', name: 'password', type: typeForPass },
    { placeholder: 'Confirm password', name: 'confirm', type: typeForPassNew }
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
              const { placeholder, name, type } = value
              return (
                <div key={name} className={styles.forinput}>
                  <Field
                    name={name}
                    placeholder={placeholder}
                    component={Input}
                    id={name}
                    type={type}
                    show={
                      name === 'password' || name === 'confirm' ? true : false
                    }
                    showPass={
                      name === 'password'
                        ? () => showPass('old')
                        : () => showPass('new')
                    }
                    checkIcon={
                      typeForPass === 'password' || typeForPass === 'confirm'
                        ? true
                        : false
                    }
                  />
                  <span>
                    <ErrorMessage name={name} />
                  </span>
                </div>
              )
            })}
            <div className={styles.block_btn}>
              {visibleError && (
                <span style={{ color: 'red' }}>{errorMessage}</span>
              )}
              <Button
                text='Create User'
                disabled={!values.name}
                type='submit'
              />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Login
