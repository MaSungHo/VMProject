import '../webapp/css/custom.css';
import Groups from '../component/Groups';

import React from 'react';
import ReactDOM from 'react-dom';

const groups = [
	{
		'name': '인턴',
		'num_people': 12
	},
	{
		'name': '회사원',
		'num_people': 5
	},
	{
		'name': '학생',
		'num_people': 31
	},
	{
		'name': '상업용',
		'num_people': 9
	},
]


class Page2 extends React.Component {
	render() {
		return (
				<div>
					{groups.map(c=>{
						return (<div>
									<Groups key={c.name} name={c.name} num_people={c.num_people} />
								    ------------------------------------------------------------------
								</div>)
					})}
				</div>
			);
	}
}

ReactDOM.render(<Page2/>, document.getElementById('root'));