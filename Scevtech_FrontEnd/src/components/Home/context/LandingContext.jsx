import React , {Component , createContext} from 'react';
import axios from '../../../axios.js';

export const LandingContext = createContext();

class LandingContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: [],
		}
	}

	componentDidMount() {
		// get job
		axios.get(`landing/jobs`)
			.then(res => {
				this.setState({ jobs: res.data });
			})
	}

	render() {
		return(
			<LandingContext.Provider  value={{
				...this.state
			}} >
				{this.props.children}
			</LandingContext.Provider>
		);
	}
}

export default LandingContextProvider;
	