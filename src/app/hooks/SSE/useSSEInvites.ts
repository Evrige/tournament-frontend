import { useEffect, useState } from 'react'
import { IInvites } from '@/app/types/db.interface'

const useSSEInvites = () => {
	const [sseData, setSseData] = useState<IInvites>();

	useEffect(() => {
		const createEventSource = (url: string) => {
			const eventSourceInitDict = { withCredentials: true };
			return new EventSource(url, eventSourceInitDict);
		};

		const eventSource = createEventSource(`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_USER_SSE_INVITES_URL}`);
		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setSseData(data);
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
