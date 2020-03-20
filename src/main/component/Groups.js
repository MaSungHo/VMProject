import React from 'react';

class Groups extends React.Component {
	render() {
		return (
			<div>
				<p>그룹명: {this.props.name}</p>
				<p>인원수: {this.props.num_people}</p>
			</div>
		);
	}
}

export default Groups;