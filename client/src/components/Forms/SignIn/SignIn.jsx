import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../../Button'
import Input from '../Input'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSignIn } from '../../../store/signIn/ActionCreators'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './SignIn.module.scss'

const initialValues = {
  loginOrEmail: '',
  password: ''
}

const validationSchema = yup.object().shape({
  loginOrEmail: yup
    .string()
    .required('Is required')
    .matches(/^[0-9a-zA-Z]*$/, 'Please enter valid loginOrEmail'),
  password: yup
    .string()
    .required('No password provided')
    .matches(/^[0-9a-zA-Z]*$/, 'Enter valid password')
})

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status, error } = useSelector(state => state.signIn)
  const [visibleError, setVisibleError] = useState(false)
  const token = useSelector(state => state.auth.token)
  const [typeForPass, setTypeForPasss] = useState('password')

  useEffect(() => {
    if (status === 'resolved' || token) {
      navigate('/')
    } else if (status === 'rejected') {
      setVisibleError(true)
    }
  }, [status, token, navigate])

  const loginUser = value => {
    dispatch(fetchSignIn(value))
  }

  const showPass = () => {
    typeForPass === 'password'
      ? setTypeForPasss('text')
      : setTypeForPasss('password')
  }

  const loginValues = [
    { placeholder: 'Login Or Email', name: 'loginOrEmail', type: 'text' },
    { placeholder: 'Password', name: 'password', type: typeForPass }
  ]

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={loginUser}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <Form>
            {loginValues.map(value => {
              const { placeholder, name, type } = value
              return (
                <div key={name}>
                  <Field
                    name={name}
                    placeholder={placeholder}
                    id={name}
                    component={Input}
                    type={type}
                    show={name === 'password' ? true : false}
                    showPass={showPass}
                    checkIcon={typeForPass === 'password' ? true : false}
                  />
                  <span>
                    <ErrorMessage name={name} />
                  </span>
                </div>
              )
            })}
            <div className={styles.block_btn}>
              {visibleError && <span style={{ color: 'red' }}>{error}</span>}
              <Button text='Sign in' disabled={!values.name} type='submit' />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SignIn
