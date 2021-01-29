import React from 'react';
import axios from '../../../../../../../../axios.js';
import { AuthContext } from '../../../../../../contexts/AuthContext.js';
export const TryoutContext = React.createContext();

class TryoutContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			tryouts: [],
			loading: {
				tryouts: true,
				destroy: false,
			}
		}

		this.addTryout = this.addTryout.bind(this);
		this.removeTryout = this.removeTryout.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		// get list tryout
		axios.get(`teacher/${this.context.id}/tryout ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ 
									tryouts: res.data,  
									loading: {...this.state.loading , tryouts: false},
							})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addTryout = async (newData) => {
		let response = await axios.post(`teacher/${this.context.id}/tryout/create ` , newData , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.status;
			}).catch(err => console.error(err));
		return response;
	}

	removeTryout = (id) => {
		this.setState({ loading: {...this.state.loading , destroy: true} });
		axios.delete(`teacher/${this.context.id}/tryout/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					tryouts: this.state.tryouts.filter(tryout => tryout.id !== id),
					loading: { ...this.state.loading , destroy: false },
				})
			})
	}

	render() {
		return(
			<TryoutContext.Provider value={{
								...this.state,
								addTryout: this.addTryout,
								removeTryout: this.removeTryout,
			}} >
				{this.props.children}
			</TryoutContext.Provider>
		)
	}
}


TryoutContextProvider.contextType = AuthContext;
export default TryoutContextProvider;