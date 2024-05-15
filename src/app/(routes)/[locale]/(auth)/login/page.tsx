"use client"
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NextPage } from 'next'
import { useTranslations } from 'next-intl'

const Page : NextPage = () => {
	const dic = useTranslations()
	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email(dic("Auth.email")).required(dic("Auth.required")),
		password: Yup.string().required(dic("Auth.required"))
			.min(6, dic("Auth.passwordErrorMin"))
			.max(16, dic("Auth.passwordErrorMax"))
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, dic("Auth.passwordError")),
	});

	// @ts-ignore
	const handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			setSubmitting(false);
		}, 400);
	};
	return (
		<div>
			<h1>Login</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<div>
						<label htmlFor="email">Email</label>
						<Field type="email" id="email" name="email" />
						<ErrorMessage name="email" component="div" />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<Field type="password" id="password" name="password" />
						<ErrorMessage name="password" component="div" />
					</div>
					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	)
}

export default Page