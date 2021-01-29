import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
export const LibraryContext = createContext();


class LibraryContextProvider extends React.Component 
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state ={
			books: [],
			borrows: [],
			classes: [],
			loading: {
				books: true,
				borrows: true,
				delBooks: false,
			},
		}

		this.addBook      = this.addBook.bind(this);
		this.removeBook   = this.removeBook.bind(this);
		this.addBorrow    = this.addBorrow.bind(this);
		this.getBorrow    = this.getBorrow.bind(this);
		this.markReturn = this.markReturn.bind(this);
		this.removeBorrow = this.removeBorrow.bind(this);
		this.getStudent   = this.getStudent.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list books
		axios.get(`teacher/${this.context.id}/library/book/ ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({
						books: res.data,
						loading: { ...this.state.loading , books: false },
					})
				}
			});

		// get list class
		axios.get(`teacher/${this.context.id}/class ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ classes: res.data });
				}
			})

		// get list borrows book
		axios.get(`teacher/${this.context.id}/library/borrow ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({
						borrows: res.data,
						loading: { ...this.state.loading , borrows: false },
					});
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addBook = async (newBook) => {
		let response = await axios.post(`teacher/${this.context.id}/library/book/add` , newBook , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				this.setState({
					books: [...this.state.books , res.data],
				});
				return res.status;
			});

		return response;
	}

	removeBook = (id) => {
		this.setState({ loading: {...this.state.loading , delBooks: true} });
		axios.delete(`teacher/${this.context.id}/library/book/${id} `)
			.then(res => {
				this.setState({
					books: this.state.books.filter(book => book.id !== id),
					loading: {...this.state.loading , delBooks: false},
				})
			})
	}

	addBorrow = async (newBorrow) => {
		console.log(newBorrow);
		let response = await axios.post(`teacher/${this.context.id}/library/borrow/add ` , newBorrow , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				console.log(res.data);
				this.setState({
					borrows: [ ...this.state.borrows , res.data ],
				})
				return res.status;
			});
		return response;
	}

	getBorrow = (status) => {
		return this.state.borrows.filter(borrow => borrow.status === status);
	}

	markReturn = async (id) => {
		let response = await axios.put(`teacher/${this.context.id}/library/borrow/${id}/return ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				if(res.status === 200) {
					this.state.borrows.forEach(borrow => (borrow.id === id) ? borrow.status = 'return' : '');
				}
				return res.status;
			});
		return response;
	}

	removeBorrow = (id) => {
		console.log(id);
	}

	getStudent = async (classId) => {
		let response = await axios.get(`teacher/${this.context.id}/student/class/${classId} ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
					.then(res => {
						return res.data;
					}).catch(err => console.log(err));
		return response;
	}

	render() {
		return(
			<LibraryContext.Provider value={{
									...this.state,
									addBook: this.addBook,
									removeBook: this.removeBook,
									addBorrow: this.addBorrow,
									getBorrow: this.getBorrow,
									markReturn: this.markReturn,
									removeBorrow: this.removeBorrow,
									getStudent: this.getStudent,
			}} >
				{ this.props.children }
			</LibraryContext.Provider>
		)
	}
}


LibraryContextProvider.contextType = AuthContext;
export default LibraryContextProvider;