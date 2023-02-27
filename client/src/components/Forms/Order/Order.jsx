import React from 'react'
import Button from '../../Button'
import Input from '../Input'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import Title from '../../Title'
import styles from './Order.module.scss'
import { useSelector } from 'react-redux'

const phoneRegExp = /^\+380\d{3}\d{2}\d{2}\d{2}$/

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Not an Email')
    .required('Email is a required field')
    .min(8, 'Too short'),
  phone: yup
    .string()
    .required('required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(13, 'too long'),
  country: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid country')
    .required('Country is required')
    .min(3, 'Too short')
    .max(15, 'Too long'),
  city: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid city')
    .required('Sity is required')
    .min(3, 'Too short')
    .max(15, 'Too long'),
  zipCode: yup.number().required('ZIP Code is required'),
  adress: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid adress')
    .required('Adress is required')
    .min(3, 'Too short')
    .max(15, 'Too long')
})

const Order = ({ createOrder }) => {
  const userInfo = useSelector(state => state.user.data)

  const initialValues = {
    email: userInfo.email,
    telephone: userInfo.telephone,
    country: '',
    city: '',
    zipCode: '',
    adress: ''
  }

  const PersonalDetails = [
    {
      placeholder: 'email',
      name: 'email',
      value: initialValues.email ? initialValues.email : null
    },
    {
      placeholder: 'telephone',
      name: 'phone',
      value: initialValues.telephone ? initialValues.telephone : null
    }
  ]
  const ShippingInformation = [
    { placeholder: 'Country', name: 'country' },
    { placeholder: 'City', name: 'city' },
    { placeholder: 'ZIP Code', name: 'zipCode' },
    { placeholder: 'Adress', name: 'adress' }
  ]

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={createOrder}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values }) => {
        return (
          <Form>
            <Title title='personal details' />
            <div className={styles.block}>
              {PersonalDetails.map(values => {
                const { placeholder, name, value } = values
                return (
                  <div className={styles.block_input} key={name}>
                    <Field
                      key={name}
                      name={name}
                      placeholder={placeholder}
                      component={Input}
                      id={name}
                      value={value}
                    />
                    <span>
                      <ErrorMessage name={name} />
                    </span>
                  </div>
                )
              })}
            </div>
            <Title title='shipping information' />
            <div className={styles.block}>
              {ShippingInformation.map(value => {
                const { placeholder, name } = value
                return (
                  <div className={styles.block_input} key={name}>
                    <Field
                      name={name}
                      placeholder={placeholder}
                      component={Input}
                      id={name}
                    />
                    <span>
                      <ErrorMessage name={name} />
                    </span>
                  </div>
                )
              })}
            </div>
            <Button
              text='Make an order'
              type='submit'
              disabled={!values.value}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

Order.propTypes = {
  createOrder: PropTypes.func
}

Order.defaultProps = {
  createOrder: () => {}
}

export default Order
