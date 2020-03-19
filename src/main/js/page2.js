import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';

class Page2 extends React.Component {
	render() {
		return <div className="page2">두 번째 페이지</div>;
	}
}

ReactDOM.render(<Page2/>, document.getElementById('root'));