import React , {Component} from 'react';


class Navbar extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			color: 'purple',
			status: true,
		}
	}

	componentDidUpdate(prevProps) {
		if((this.props.timer === 'WAKTU HABIS' || this.props.timer === 'SELESAI MENGERJAKAN' ) && this.state.status === true) {
			let color = (this.props.timer === 'WAKTU HABIs') ? 'red' : 'teal'; 
			this.setState({
				status: false,
				color: color,
			})
		}
	}

	render() {
		return(
			<React.Fragment>
				<nav className="fixed z-40 w-full top-0 bg-white shadow-sm flex flex-grow-2 justify-between items-center px-4 h-12">
					<h2 className="mr-4 font-semibold text-gray-600">{this.props.data.title}</h2>
					<p className={`border-2 border-${this.state.color}-300 py-1 px-4 rounded text-sm font-semibold text-${this.state.color}-500`}>{this.props.timer}</p>
					<h3 className="font-light text-gray-400">{this.props.data.subject}</h3>
				</nav>
			</React.Fragment>
		);
	}
}

export default Navbar;
	