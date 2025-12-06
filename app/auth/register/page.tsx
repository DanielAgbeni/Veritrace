import React from 'react';
import AuthHeader from '@/components/auth-component/header';
import SignupForm from '@/components/auth-component/signup-form';

const Register = () => {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
				{/* <AuthHeader title="Create Account" /> */}
				<SignupForm />
			</div>
		</div>
	);
};

export default Register;
