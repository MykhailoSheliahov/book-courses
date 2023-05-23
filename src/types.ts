export type TAuthor = {
	id: string;
	name: string;
};

export type TSetAuthor = {
	name: string;
};

export type TSetCourse = {
	title: string;
	description: string;
	duration: number;
	authors: string[];
};

export type TCourse = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type TLoginCredentials = {
	email: string;
	password: string;
};

export type TRegistrationCredentials = {
	name: string;
	email: string;
	password: string;
};

export type TLoginUserData = {
	successful: boolean;
	user: {
		name: string;
		email: string;
	};
	result: string;
};

export type TLoggedUserData = {
	successful: boolean;
	result: {
		name: string;
		email: string;
		role: string;
	};
	token: string;
};

export type TUserState = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
};

export type TFormData = {
	authorsList: TAuthor[];
	courseTitle: string;
	courseDescription: string;
	newAuthorName: string;
	courseDuration: string;
	courseAuthors: Array<TAuthor>;
};

export type TMockedState = {
	user: TUserState;
	courses: TCourse[];
	authors: TAuthor[];
};
