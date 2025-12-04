import { create } from 'zustand';

type UserStore = {
	user: any;
	setUser: (user: any) => void;
	logout: () => void;
	hydrate: () => void;
};

export const useStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	logout: () => set({ user: null }),
	hydrate: () => {
		if (typeof window === 'undefined') return;

		const accessToken = window.localStorage.getItem('accessToken');
		const refreshToken = window.localStorage.getItem('refreshToken');
		const userRaw = window.localStorage.getItem('authUser');

		
		if (!accessToken || !refreshToken || !userRaw) {
			set({
				user: null,
				accessToken: null,
				refreshToken: null,
				isAuthenticated: false,
			});
			return;
		}

        try {
            const user = JSON.parse(userRaw);
			set({
				user,
				accessToken,
				refreshToken,
				isAuthenticated: true,
			});
        } catch (error) {
            console.error(error);
           window.localStorage.removeItem('accessToken');
			window.localStorage.removeItem('refreshToken');
			window.localStorage.removeItem('authUser');
			set({
				user: null,
				accessToken: null,
				refreshToken: null,
				isAuthenticated: false,
			});
        }
	},
}));
