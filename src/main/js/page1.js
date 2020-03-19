import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';

class Page1 extends React.Component {
	render() {
		return <div className="page1">첫 번째 페이지</div>;
	}
}

ReactDOM.render(<Page1/>, document.getElementById('root'));