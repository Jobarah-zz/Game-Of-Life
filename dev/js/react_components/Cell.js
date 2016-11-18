import React from 'react';

export default class Cell extends React.Component {
	constructor() {

		super();
		this.state = {
			alive: false
		};
	}

	handleClick(e) {

		this.setState({ alive: !this.state.alive });
		console.log(this.props);
		this.props.onUpdate(this);
	}

	render() {

		const { handleClick } = this;
		const status = (this.state.alive) ? 'alive' : null;

		return (
			<button className={ 'Cell ' + status } onClick={ this.handleClick.bind(this) }>
			</button>
		);
	}
}

Cell.propTypes = {
	onUpdate: React.PropTypes.func
};