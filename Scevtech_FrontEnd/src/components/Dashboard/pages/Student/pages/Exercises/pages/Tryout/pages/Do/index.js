import React , {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { TryoutContext } from '../../context.js';

class Do extends Component {
	constructor(props){
		super(props);

		this.state = {
			tryout: [],
			status: '',
		}

		console.log(this.props);
	}

	async componentDidMount() {
		let response = await this.context.getTryout(this.props.match.params.id);
		this.setState({ status: response.status , tryout: response.data , user: response.user });
	}

	render() {
		if(this.state.status === 200) {
			return(
				<Redirect to={{
									pathname:`/exercises/tryout/${this.props.match.params.id} `,
									tryout: this.state.tryout,
							}} />
			);
		} else {
			return(
				<React.Fragment>
					<h1>Loading ...</h1>
				</React.Fragment>
			)
		}
	}
}



Do.contextType = TryoutContext;
export default Do;
	