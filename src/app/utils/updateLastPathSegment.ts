export function updateLastPathSegment(path: string, newSegment: string) {
	const segments = path.split('/');
	segments[segments.length - 1] = newSegment;
	return segments.join('/');
}
