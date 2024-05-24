import { useEffect, useState } from 'react'
import { IInvites } from '@/app/types/db.interface'

const useSSEInvites = () => {
	const [sseData, setSseData] = useState<IInvites[]>();

	useEffect(() => {
		const createEventSource = (url: string) => {
			const eventSourceInitDict = { withCredentials: true };
			return new EventSource(url, eventSourceInitDict);
		};

		const eventSource = createEventSource('http://localhost:5000/api/user/invites');

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setSseData(data.invites);
		};

		eventSource.onerror = (error) => {
			console.error('Ошибка SSE:', error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return sseData;
};

export default useSSEInvites;
