export function updateLastPathSegment(path: string, newSegment?: string) {
	if (!newSegment) return path
	const segments = path.split('/')


	if (isNaN(Number(segments[segments.length - 1]))) {
		segments[segments.length - 1] = newSegment
	} else {
		segments.push(newSegment)
	}
	if (segments[segments.length - 1] === "/") segments.pop()
	return segments.join('/')
}
