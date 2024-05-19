export const toPrice = (price: number) => {
	const formattedPrice = price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	return formattedPrice.replace(/\s+/g, '').replace(/,/g, ' ');
}
