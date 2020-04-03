const users = [
	{ name: '마성호', email: 'maam123', password: '1234' },
	{ name: '신현철', email: 'mash809', password: '1111' },
]

function Auth({ email, password }) {
	const user = users.find(user => user.email === email && user.password === password)
	if (user === undefined) {
		throw new Error()
	}
	return user;
}

export default Auth;