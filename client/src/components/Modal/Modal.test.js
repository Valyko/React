import { render } from '@testing-library/react'
import Modal from './Modal'

const close = jest.fn()

describe('Modal tests', () => {
  test('Modai is render', () => {
    const { asFragment } = render(<Modal onClose={close} text='Text modal' />)
    expect(asFragment()).toMatchSnapshot()
  })
})