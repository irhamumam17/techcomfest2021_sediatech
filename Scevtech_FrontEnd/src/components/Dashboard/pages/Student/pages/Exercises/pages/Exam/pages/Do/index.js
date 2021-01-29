import React , {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { ExamContext } from '../../context.js';

class Do extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exam: [],
			status: '',
		}

	}

	async componentDidMount() {
		let response = await this.context.getExam(this.props.match.params.id);
		this.setState({ status: response.status , exam: response.data , user: response.user });
	}

	render() {
		if(this.state.status === 200) {
			return(
				<Redirect to={{
									pathname:`/exercises/exam/${this.props.match.params.id} `,
									exam: this.state.exam,
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


Do.contextType = ExamContext;
export default Do;
	