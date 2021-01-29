import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import ExamContextProvider from './context.js';
import Do from './pages/Do/';
import List from './pages/List/';

class Exam extends Component {
	render() {
		return(
			<React.Fragment>
				<ExamContextProvider>
				<Switch>
					<Route path="/student/exercises/exam/do/:id" component={Do} />
					<Route path="/student/exercises/exam/list" component={List} />
					<Route path="/student/exercises/exam" component={List} />
				</Switch>
				</ExamContextProvider>
			</React.Fragment>
		);
	}
}

export default Exam;
	