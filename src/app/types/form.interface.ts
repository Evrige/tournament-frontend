export interface IRegisterForm {
	nickname: string,
	email: string,
	password: string,
	confirmPassword?: string
}

export interface ILoginForm {
	email: string,
	password: string
}