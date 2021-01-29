import React , { createContext , Component} from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const JobContext = createContext();


class JobContextProvider extends Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			jobs: [],
			loading: {
				jobs: true,
			},
		}

		this.updateStatus = this.updateStatus.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get jobs
		axios.get(`admin/${this.context.id}/job/` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						jobs: res.data,
						loading: {...this.state.loading , jobs: false},
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	updateStatus = async (id , status) => {
		let response = await axios.put(`admin/${this.context.id}/job/${id}/status` , {status} , {headers: { Authorization: `Bearer ${this.context.token}` },})
			.then(res => {
				let jobs = this.state.jobs.map(job => {
					if(job.id === id) {
						return {...job , status: status};
					} else {
						return job;
					}
				});
				this.setState({ jobs: jobs });
				return res.status;
			});
		return response;
	}

	render() {
		return(
			<JobContext.Provider value={{
				...this.state,
				updateStatus: this.updateStatus,
			}} >
				{this.props.children}
			</JobContext.Provider>
		)
	}
}


JobContextProvider.contextType = AuthContext;
export default JobContextProvider;