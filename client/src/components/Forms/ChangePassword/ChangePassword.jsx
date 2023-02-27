import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../../Button'
import Input from '../Input'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { clearStatusPass } from '../../../store/user/userSlice'
import { fetchChangePassword } from '../../../store/user/ActionCreators'
import styles from './ChangePassword.module.scss'
import * as yup from 'yup'
import ErrorText from '../../TextRequests/TextRequests'

const validationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short')
    .max(25, 'Password is too long'),
  password: yup.string().required('No password provided.')
})

const ChangePassword = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.data)
  const { statusChangePass } = useSelector(state => state.user)
  const [visibleErrorMatch, setVisibleErrorMatch] = useState(false)
  const [visibleError, setVisibleError] = useState(false)
  const [visibleResolve, setVisibleResolve] = useState(false)
  const [typeForPass, setTypeForPasss] = useState('password')
  const [typeForPassNew, setTypeForPasssNew] = useState('password')
  const { location } = useSelector(state => state.location)

  const initialValues = { newPassword: '', password: '' }

  useEffect(() => {
    dispatch(clearStatusPass())
  }, [location, dispatch])

  useEffect(() => {
    if (userInfo.password === 'Password does not match') {
      setVisibleErrorMatch(true)
      setVisibleError(false)
      setVisibleResolve(false)
    } else if (statusChangePass === 'resolved') {
      setVisibleError(false)
      setVisibleResolve(true)
    } else if (statusChangePass === 'rejected') {
      setVisibleResolve(false)
      setVisibleError(true)
    } else {
      setVisibleErrorMatch(false)
      setVisibleError(false)
      setVisibleResolve(false)
    }
  }, [statusChangePass, userInfo])

  const updateValues = value => {
    dispatch(fetchChangePassword(value))
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

  const personalValues = [
    {
      placeholder: 'Old password',
      name: 'password',
      type: typeForPass
    },
    { placeholder: 'New password', name: 'newPassword', type: typeForPassNew }
  ]

  return (
    userInfo && (
      <Formik
        initialValues={initialValues}
        onSubmit={updateValues}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form className={styles.form}>
              {personalValues.map(value => {
                const { placeholder, name, type } = value
                return (
                  <div key={name} className={styles.block_input}>
                    <Field
                      name={name}
                      placeholder={placeholder}
                      id={name}
                      component={Input}
                      type={type}
                      show
                      showPass={
                        name === 'password'
                          ? () => showPass('old')
                          : () => showPass('new')
                      }
                      checkIcon={
                        name === 'password'
                          ? typeForPass === 'password'
                            ? true
                            : false
                          : typeForPassNew === 'password'
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
              <div className={styles.block}>
                {visibleErrorMatch && (
                  <ErrorText text='Password does not match, try again' />
                )}
                {visibleError && <ErrorText text='Smth wrong happened' />}
                {visibleResolve && (
                  <ErrorText resolveText text='Password successfully changed' />
                )}
                <Button
                  text='Change Password'
                  disabled={!values.name}
                  type='submit'
                />
              </div>
            </Form>
          )
        }}
      </Formik>
    )
  )
}

export default ChangePassword
