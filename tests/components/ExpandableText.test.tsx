import { render, screen } from '@testing-library/react'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event'

describe('Expandable Text', () => {
	const limit = 255
	const shortText = 'a'.repeat(100)
	const longText = 'a'.repeat(limit + 10)
	const trucatedText = longText.substring(0, limit) + '...'

	it('Should render the full text if less than or equal 255 characters', () => {
		render(<ExpandableText text={shortText} />)

		expect(screen.getByText(shortText)).toBeInTheDocument()

		const button = screen.queryByRole('button')
		expect(button).not.toBeInTheDocument()
	})

	it('Should render the trucated text if longer than 255 characters', () => {
		render(<ExpandableText text={longText} />)

		expect(screen.getByText(trucatedText)).toBeInTheDocument()

		const button = screen.getByRole('button')
		expect(button).toHaveTextContent(/more/i)
	})

	it('Should expand text when show more button is clicked', async () => {
		render(<ExpandableText text={longText} />)

		expect(screen.getByText(trucatedText)).toBeInTheDocument()

		const button = screen.getByRole('button')
		const user = userEvent.setup()
		await user.click(button)

		expect(screen.getByText(longText)).toBeInTheDocument()
		expect(button).toHaveTextContent(/less/i)
	})

	it('Should collaspe text when show less button is clicked', async () => {
		render(<ExpandableText text={longText} />)

		expect(screen.getByText(trucatedText)).toBeInTheDocument()

		const button = screen.getByRole('button')
		const user = userEvent.setup()
		await user.click(button)
		await user.click(button)

		expect(screen.getByText(trucatedText)).toBeInTheDocument()
		expect(button).toHaveTextContent(/more/i)
	})
})
