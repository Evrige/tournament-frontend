import { useEffect, useState } from 'react';
import { SocketApi } from '@/app/api/socket-api';
import { IUser } from '@/app/types/db.interface'

export const useConnectSocket = (userId: number) => {
	const [user, setUser] = useState<IUser>()

	const connectSocket = () => {
		SocketApi.createConnection();
		if (userId){
			SocketApi.socket.on(`userChanges/${userId}`, (updatedUser) => {
				setUser(JSON.parse(updatedUser));
			});
		}

	};

	useEffect(() => {
		connectSocket();
	}, [userId]);
	return user
};
