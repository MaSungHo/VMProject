import '../webapp/css/custom.css';
import Users from '../component/Users'

import React from 'react';
import ReactDOM from 'react-dom';

const users = {
		'ID': 'mash809',
		'PW': 'pw1234',
		'group': '인턴',
		'VM': 'Windows 10'
}


class Page1 extends React.Component {
	render() {
		return (
			<Users
			ID={users.ID}
			PW={users.PW}
			group={users.group}
			VM={users.VM}
			/>
		);
	}
}

ReactDOM.render(<Page1/>, document.getElementById('root'));