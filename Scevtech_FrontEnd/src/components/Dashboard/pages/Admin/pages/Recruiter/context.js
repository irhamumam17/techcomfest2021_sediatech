import React , {createContext} from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const RecruiterContext = createContext();

class RecruiterContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			recruiters: [],
			loading: {
				recruiters: true,
				del: false,
				detail: false,
			}
		}

		this.addRecruiter = this.addRecruiter.bind(this);
		this.detailRecruiter = this.detailRecruiter.bind(this);
		this.removeRecruiter = this.removeRecruiter.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get recruiter
		axios.get(`admin/${this.context.id}/recruiter` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted){
					this.setState({
						recruiters: res.data,
						loading: { ...this.state.loading , recruiters: false },
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addRecruiter = async (data) => {
		this.setState({ loading: {...this.state.loading , detail: true} });
		let response = await axios.post(`admin/${this.context.id}/recruiter/store` , data , {headers: { Authorization: `Bearer ${this.context.token}` },})
						.then(res => {
							console.table(res.data);
							this.setState({
								recruiters: [...this.state.recruiters , res.data],
								loading: {...this.state.loading , detail: false},
							});
							return res.status;
						});
		return response
	}

	detailRecruiter = async (id) => {
		let response = await axios.get(`admin/${this.context.id}/recruiter/detail/${id} ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
						.then(res => {
							console.log(res.data);
							return res.data;
						}).catch(err => console.log(err));
		return response;
	}

	removeRecruiter = async (id) => {
		this.setState({ loading: { ...this.state.loading , del: true } });
		let response = await axios.delete(`admin/${this.context.id}/recruiter/delete/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				console.log(res);
				this.setState({
					recruiters: this.state.recruiters.filter(recruiter => recruiter.id !== id),
					loading: {...this.state.loading , del: false},
				});

				return res.status;
			})

		return response;
	}

	render() {
		return(
			<RecruiterContext.Provider value={{
							...this.state,
							addRecruiter: this.addRecruiter,
							detailRecruiter: this.detailRecruiter,
							removeRecruiter: this.removeRecruiter,
			}} >
				{this.props.children}
			</RecruiterContext.Provider>
		)
	}
}


RecruiterContextProvider.contextType = AuthContext;
export default RecruiterContextProvider;