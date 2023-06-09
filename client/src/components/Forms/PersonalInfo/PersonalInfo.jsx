import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../../Button'
import Input from '../Input'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import styles from './PersonalInfo.module.scss'
import { fetchUpdateUser } from '../../../store/user/ActionCreators'
import ErrorText from '../../TextRequests/TextRequests'

const phoneRegExp = /^\+380\d{3}\d{2}\d{2}\d{2}$/
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Not an Email')
    .required('Email is a required field')
    .min(8, 'Too short'),
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
  telephone: yup
    .string()
    .required('required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(13, 'too long')
})

const PersonalInfo = () => {
  const dispatch = useDispatch()
  const info = useSelector(state => state.user.data)
  const [visibleSuccess, setVisibleSuccess] = useState(false)

  const updateValues = value => {
    if (
      value.firstName === info.firstName &&
      value.lastName === info.lastName &&
      value.email === info.email &&
      value.telephone === info.telephone
    ) {
      return null
    } else {
      dispatch(fetchUpdateUser(value))
      setVisibleSuccess(true)
    }
  }

  const initialValues = {
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    telephone: info.telephone
  }

  const personalValues = [
    {
      placeholder: 'firstName',
      name: 'firstName',
      value: initialValues.firstName ? initialValues.firstName : null
    },
    {
      placeholder: 'lastName',
      name: 'lastName',
      value: initialValues.lastName ? initialValues.lastName : null
    },
    {
      placeholder: 'email',
      name: 'email',
      value: initialValues.email ? initialValues.email : null
    },
    {
      placeholder: 'telephone',
      name: 'telephone',
      value: initialValues.telephone ? initialValues.telephone : null
    }
  ]

  return (
    info && (
      <Formik
        initialValues={initialValues}
        onSubmit={updateValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form className={styles.form}>
              {personalValues.map(values => {
                const { placeholder, name, value } = values
                return (
                  <div key={name} className={styles.block_input}>
                    <Field
                      name={name}
                      placeholder={placeholder}
                      id={name}
                      component={Input}
                      value={value}
                    />
                    <span>
                      <ErrorMessage name={name} />
                    </span>
                  </div>
                )
              })}
              <div className={styles.block}>
                {visibleSuccess && (
                  <ErrorText resolveText text='Personal info was changed' />
                )}
                <Button
                  text='Update info'
                  disabled={!values.value}
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

export default PersonalInfo
