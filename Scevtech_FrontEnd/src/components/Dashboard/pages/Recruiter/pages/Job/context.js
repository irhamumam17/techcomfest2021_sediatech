import React , { createContext , Component } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const JobContext = createContext();

class JobContextProvider extends Component
{
	_isMounted = false;
	constructor(props) {
		super(props)

		this.state = {
			jobs: [],
			loading: {
				jobs: true,
				add: false,
				del: false,
			}
		}

		this.addJob = this.addJob.bind(this);
		this.detailJob = this.detailJob.bind(this);
		this.removeJob = this.removeJob.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get jobs
		axios.get(`/recruiter/${this.context.id}/job`)
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

	addJob = async (data) => {
		this.setState({ loading: {...this.state.loading , add: true} })
		let response = await axios.post(`recruiter/${this.context.id}/job/store` , data)
					.then(res => {
						this.setState({
							jobs: [...this.state.jobs , res.data],
							loading: {...this.state.loading , add: false}
						})						
						return res.status;
					})
		return response;
	}

	detailJob = async (id) => {
		let response = await axios.get(`recruiter/${this.context.id}/job/detail/${id}`)
				.then(res => {
					return res.data;
				}).catch(err => console.error(err));
		return response;
	}

	removeJob = async (id) => {
		this.setState({ loading: {...this.state.loading , del: true} });
		let response = await axios.delete(`recruiter/${this.context.id}/job/delete/${id}`)
			.then(res => {
				this.setState({
					jobs: this.state.jobs.filter(job => job.id !== id),
					loading: {...this.state.loading , del: false},
				})
				return res.status;
			}).catch(err => console.error(err))
		return response;
	}

	render() {
		return(
			<JobContext.Provider value={{
				...this.state,
				addJob: this.addJob,
				detailJob: this.detailJob,
				removeJob: this.removeJob,
			}} >
				{this.props.children}
			</JobContext.Provider>
		)
	}
}


JobContextProvider.contextType = AuthContext;
export default JobContextProvider