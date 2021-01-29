import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import LibraryContextProvider from './context.js';
import List from './pages/List/';
import Detail from './pages/Detail/';

class Library extends Component {
	render() {
		return(
			<React.Fragment>
				<LibraryContextProvider>
					<Switch>
						<Route exact path="/student/library" component={List} />
						<Route path="/student/library/:id" component={Detail} />
					</Switch>
				</LibraryContextProvider>
			</React.Fragment>
		);
	}
}

export default Library;
	