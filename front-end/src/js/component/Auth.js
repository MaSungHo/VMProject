  const users = [
	{ name: '마성호', email: 'maam123', password: 'tjdgh960809!' },
]

function Auth({ email, password }) {
	const user = users.find(user => user.email === email && user.password === password)
	if (user === undefined) {
		throw new Error()
	}
	return user;
}

export default Auth;