import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'
import { ReactComponent as ShowPass } from './svg/showPass.svg'
import { ReactComponent as HeidPass } from './svg/heidPass.svg'

const Input = ({
  value,
  placeholder,
  name,
  id,
  type,
  field,
  show,
  showPass,
  checkIcon
}) => {
  const { onChange, onBlur } = field

  return show ? (
    <div className={styles.input_block}>
      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span>
        {checkIcon ? (
          <ShowPass onClick={field.value !== '' ? showPass : null} />
        ) : (
          <HeidPass onClick={field.value !== '' ? showPass : null} />
        )}
      </span>
    </div>
  ) : (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={value}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

Input.defaultProps = {
  placeholder: 'placeholder'
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object
}

export default Input
