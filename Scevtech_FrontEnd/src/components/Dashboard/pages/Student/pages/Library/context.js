import React , {Component , createContext} from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';


export const LibraryContext = createContext();

class LibraryContextProvider extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			borrows: [],
			loading: {
				borrows: true,
			}
		}

		this.detailBook = this.detailBook.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get borrows
		axios.get(`student/${this.context.id}/library/borrow`, {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				console.log(res.data);
				if(this._isMounted) {
					this.setState({
						borrows: res.data,
						loading: {...this.state.loading , borrows: false},
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	detailBook = async (id) => {
		let response = await axios.get(`student/${this.context.id}/library/borrow/${id}`, {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				console.log(res.data);
				return res.data;
			}).catch(err => console.error(err));
		return response
	}

	render() {
		return(
			<LibraryContext.Provider value={{
				...this.state,
				detailBook: this.detailBook,
			}} >
				{this.props.children}
			</LibraryContext.Provider>
		);
	}
}



LibraryContextProvider.contextType = AuthContext;
export default LibraryContextProvider;
	