import React from 'react';
import AuthHeader from '@/components/auth-component/header';
import SigninForm from '@/components/auth-component/signin-form';

const Login = () => {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
				<AuthHeader title="Manufacturer Portal" />
				<SigninForm />
			</div>
		</div>
	);
};

export default Login;
