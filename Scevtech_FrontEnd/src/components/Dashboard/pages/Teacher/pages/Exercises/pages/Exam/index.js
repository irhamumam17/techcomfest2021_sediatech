import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import ExamContextProvider from './context.js';
import Add from './pages/Add/';
import List from './pages/List/';

class Exam extends Component {
	render() {
		return(
			<React.Fragment>
				<ExamContextProvider>
					<Switch>
						<Route path="/teacher/exercises/exam/add" component={Add} />
						<Route path="/teacher/exercises/exam/list" component={List} />
					</Switch>
				</ExamContextProvider>
			</React.Fragment>
		);
	}
}

export default Exam;
	