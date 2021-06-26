import React from 'react';

export class Button extends React.Component {
	constructor(props) {
		super(props);
	}

	render(props) {
		return (
			<button onClick={this.props.clickHandler}>Fetch Patient Information</button>
		);
	}
}

export default Button;