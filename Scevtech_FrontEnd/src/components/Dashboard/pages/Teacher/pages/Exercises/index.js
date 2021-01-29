import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Tryout from './pages/Tryout/';
import Exam from './pages/Exam/';
import ExerciseContextProvider from './context.js';

class Exercise extends Component {
	render() {
		return(
			<React.Fragment>
				<ExerciseContextProvider>
					<Switch>
						<Route path="/teacher/exercises/tryout" component={Tryout} />
						<Route path="/teacher/exercises/exam" component={Exam} />
					</Switch>
				</ExerciseContextProvider>
			</React.Fragment>
		);
	}
}

export default Exercise;
	