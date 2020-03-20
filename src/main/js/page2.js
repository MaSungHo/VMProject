import '../webapp/css/custom.css';
import Groups from '../component/Groups';

import React from 'react';
import ReactDOM from 'react-dom';

const groups = {
		'name': '인턴',
		'num_people': 12
}

class Page2 extends React.Component {
	render() {
		return (
			<Groups
			name={groups.name}
			num_people={groups.num_people}
			/>
		);
	}
}

ReactDOM.render(<Page2/>, document.getElementById('root'));