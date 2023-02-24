import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Title from './Title'

const showContent = jest.fn()

describe('Title', () => {
  test('Title is render', () => {
    const { asFragment } = render(<Title showContent={showContent}/>)
    expect(asFragment()).toMatchSnapshot()
  })
  test('Title with props title', () => {
    const { getByText } = render(<Title title='Something' />)
    const linkOnElement = getByText(/Something/i)
    expect(linkOnElement).toBeInTheDocument()
  })
  test('Title with props subtitle', () => {
    const { getByText } = render(<Title subtitle='Something more' />)
    const linkOnElement = getByText(/Something more/i)
    expect(linkOnElement).toBeInTheDocument()
  })
})
