import React from 'react';
import axios from '../../../../../../../../axios.js';
import { AuthContext } from '../../../../../../contexts/AuthContext.js';
export const TryoutContext = React.createContext();

class TryoutContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props){
		super(props);

		this.state = {
			tryouts: [],
			loading: {
				tryouts: true,
				do: true,
			}
		}

		this.getTryout = this.getTryout.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get tryouts
		axios.get(`/student/${this.context.id}/tryout/list ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
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

	getTryout = async (id) => {
		let response = await axios.get(`student/${this.context.id}/tryout/do/${id} ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ loading: { ...this.state.loading , do: false } });
				}
				res.user = this.context;
				return res;
			}).catch(err => console.error(err));

		return response;
	}

	render() {
		return(
			<TryoutContext.Provider value={{ 
									...this.state,
									getTryout: this.getTryout,
			}} >
				{this.props.children}
			</TryoutContext.Provider>
		)
	}
}


TryoutContextProvider.contextType = AuthContext;
export default TryoutContextProvider;