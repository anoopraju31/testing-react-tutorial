import { render, screen } from '@testing-library/react'
import UserAccount from '../../src/components/UserAccount'
import { type User } from '../../src/entities'

describe('User Account', () => {
	it("Should render user's name", () => {
		const user: User = { id: 1, name: 'Anoop' }

		render(<UserAccount user={user} />)

		expect(screen.getByText(user.name)).toBeInTheDocument()
	})

	it('Should render the edit button if the user is an admin', () => {
		const user: User = { id: 1, name: 'Anoop', isAdmin: true }

		render(<UserAccount user={user} />)

		const button = screen.getByRole('button')

		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent(/edit/i)
		expect(screen.getByText(user.name))
	})

	it('Should not render edit button if user is not an admin', () => {
		const user: User = { id: 2, name: 'Anoop', isAdmin: false }

		render(<UserAccount user={user} />)

		const button = screen.queryByRole('button')

		expect(button).not.toBeInTheDocument()
		expect(screen.getByText(user.name))
	})
})
