import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const AdminContext = createContext();

class AdminContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) 
	{
		super(props);
		this.state = {
			admins: [],
			getLoading: true,
			deleteLoading: false,
		}

		this.addAdmin = this.addAdmin.bind(this);
		this.removeAdmin = this.removeAdmin.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list admin
		axios.get(`admin/${this.context.id}/admin` , { headers: { Authorization: `Bearer ${this.context.token}` } })
			.then(res => {
				if(this._isMounted) {
					this.setState({admins: res.data , getLoading: false});
				}
			}).catch(err => console.log(err));
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addAdmin = async (newAdmin) => {
		let response = await axios.post(`/admin/${this.context.id}/admin/add` , newAdmin , {
			onUploadProgress: progressEvent => {
				let persentage = Math.round(progressEvent.loaded / progressEvent.total * 100);
				console.log(persentage);
			},
			headers: { Authorization: `Bearer ${this.context.token}` },
		})
			.then(res => {
				this.setState({admins: [...this.state.admins , newAdmin]});
				return res.status;
			}).then(status => {
				return status;
			})
		return response;
	}

	removeAdmin = (id) => {
		this.setState({ deleteLoading: true });
		axios.delete(`/admin/${this.context.id}/admin/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ admins:  this.state.admins.filter(admin => admin.id !== id) , deleteLoading: false });
			})
	}

	render() {
		return (
			<AdminContext.Provider value={{ ...this.state , addAdmin: this.addAdmin , removeAdmin: this.removeAdmin }} >
				{this.props.children}
			</AdminContext.Provider>
		)
	}
}


AdminContextProvider.contextType = AuthContext;
export default AdminContextProvider;