"use client"
import React, { createContext, useState, useEffect } from 'react';
import { IUser } from '@/app/types/db.interface';

interface UserContextType {
	user: IUser | null;
	isLoading: boolean;
	updateUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextType>({
	user: null,
	isLoading: true,
	updateUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
																																				children,
																																			}) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const updateUser = (updatedUser: IUser | null) => {
		setUser(updatedUser);
		setIsLoading(false);
	};

	return (
		<UserContext.Provider value={{ user, isLoading, updateUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => React.useContext(UserContext);
