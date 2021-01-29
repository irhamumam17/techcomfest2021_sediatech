import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const TheoryContext = createContext();

class TheoryContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			theories: [],
			loading: {
				theories: true,
			}
		}

		this.newestTheory = this.newestTheory.bind(this);
		this.detailTheory = this.detailTheory.bind(this);
		this.downloadFile = this.downloadFile.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`student/${this.context.id}/theory/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ 
									theories: res.data , 
									loading: {...this.state.loading , theories: false} ,
							})
				}
			}).catch(err => console.error(err));
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	newestTheory = () => {
		this._isMounted = true;
		if(this._isMounted) {
			let theories = this.state.theories.filter(theory => theory.status === false);
			return theories;
		} else {
			return [];
		}
	}

	detailTheory = async (id) => {
		let theory = await axios.get(`student/${this.context.id}/theory/detail/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.data;
			});
		return theory;
	}

	downloadFile = async (id) => {
		let status = await axios.get(`student/${this.context.id}/theory/download/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.status;
			}).catch(err => console.error(err));
		return status;
	}

	render() {
		return(
			<TheoryContext.Provider value={{ 
										...this.state,
										detailTheory: this.detailTheory,
										downloadFile: this.downloadFile,
										newestTheory: this.newestTheory,
								 }} >
				{this.props.children}
			</TheoryContext.Provider>
		)
	}
}

TheoryContextProvider.contextType = AuthContext;

export default TheoryContextProvider;