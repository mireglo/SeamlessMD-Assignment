import React from 'react';

export class TextField extends React.Component {
	constructor(props) {
		super(props);
	}

	render(props) {
		return (
			<input placeholder="Upper Limit for Entries" type="number" min={0} onChange={this.props.changeHandler}/>
		);
	}
}

export default TextField;