import '../webapp/css/custom.css';
import Users from '../component/Users'

import React from 'react';
import ReactDOM from 'react-dom';

const users = [
	{
		'ID': 'mash809',
		'PW': 'pw1234',
		'group': '인턴',
		'VM': 'Windows 10'
	},
	{
		'ID': 'tonem123',
		'PW': 'msh89',
		'group': '회사원',
		'VM': 'Ubuntu 18.04'
	},
	{
		'ID': 'mash809',
		'PW': '08sh09',
		'group': '학생',
		'VM': 'CentOS 8'
	},
	{
		'ID': 'mash809',
		'PW': 'mam!!',
		'group': '상업용',
		'VM': 'Mac OS'
	}
]

class Page1 extends React.Component {
	render() {
		return (
			<div>
				{users.map(c=>{
					return (<div>
								<Users key={c.ID} ID={c.ID} PW={c.PW} group={c.group} VM={c.VM} />
							    ------------------------------------------------------------------
							</div>)
				})}
			</div>
		);
	}
}

ReactDOM.render(<Page1/>, document.getElementById('root'));