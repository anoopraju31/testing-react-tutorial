import { render, screen } from '@testing-library/react'
import ProductImageGallery from '../../src/components/ProductImageGallery'

describe('Product Image Gallary', () => {
	it('Should render nothing if given an empty array', () => {
		const { container } = render(<ProductImageGallery imageUrls={[]} />)

		expect(container).toBeEmptyDOMElement()
	})

	it('Should render a list of images', () => {
		const imageUrls = ['url1', 'url2']

		render(<ProductImageGallery imageUrls={imageUrls} />)

		const images = screen.getAllByRole('img')

		expect(images).toHaveLength(2)

		imageUrls.forEach((imageUrl, idx) => {
			expect(images[idx]).toHaveAttribute('src', imageUrl)
		})
	})
})
