import { create } from 'zustand';

type UserType = {
	id: string;
	companyName: string;
	email: string;
	logo: string;
	address: string;
	productDescription: string;
};

type UserStore = {
	user: UserType | null;
	token: string | null;
	isAuthenticated: boolean;
	setUser: (user: UserType) => void;
	logout: () => void;
	hydrate: () => void;
};

export const useStore = create<UserStore>((set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	setUser: (user) => set({ user, isAuthenticated: true }),
	logout: () => {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('accessToken');
			window.localStorage.removeItem('refreshToken');
			window.localStorage.removeItem('authUser');
		}
		set({ user: null, token: null, isAuthenticated: false });
	},
	hydrate: () => {
		if (typeof window === 'undefined') return;

		const accessToken = window.localStorage.getItem('accessToken');
		const refreshToken = window.localStorage.getItem('refreshToken');
		const userRaw = window.localStorage.getItem('authUser');

		if (!accessToken || !refreshToken || !userRaw) {
			set({
				user: null,
				token: null,
				isAuthenticated: false,
			});
			return;
		}

		try {
			const user = JSON.parse(userRaw);
			set({
				user,
				token: accessToken,
				isAuthenticated: true,
			});
		} catch (error) {
			console.error(error);
			window.localStorage.removeItem('accessToken');
			window.localStorage.removeItem('refreshToken');
			window.localStorage.removeItem('authUser');
			set({
				user: null,
				token: null,
				isAuthenticated: false,
			});
		}
	},
}));
