import React from 'react';

class Users extends React.Component {
	render() {
		return (
			<div>
				<p>아이디: {this.props.ID}</p>
				<p>비밀번호: {this.props.PW}</p>
				<p>그룹: {this.props.group}</p>
				<p>VM: {this.props.VM}</p>
			</div>
		);
	}
}

export default Users;