import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import BookContextProvider from './context.js';

import AddBook from './pages/AddBook/';
import AddBorrow from './pages/AddBorrow/';
import Book from './pages/Book/';
import Loan from './pages/Loan/';
import Return from './pages/Return/';
import Statistic from './pages/Statistic/';

class Library extends Component {
	render() {
		return(
			<React.Fragment>
				<BookContextProvider>
					<Switch>
						<Route path="/teacher/library/addbook" component={AddBook} />
						<Route path="/teacher/library/book" component={Book} />
						<Route path="/teacher/library/addborrow" component={AddBorrow} />
						<Route path="/teacher/library/loan" component={Loan} />
						<Route path="/teacher/library/return" component={Return} />
						<Route path="/teacher/library/statistic" component={Statistic} />
					</Switch>
				</BookContextProvider>
			</React.Fragment>
		);
	}
}

export default Library;
	