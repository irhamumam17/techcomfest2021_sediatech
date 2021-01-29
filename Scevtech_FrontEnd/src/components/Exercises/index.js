import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import '../../styles/dashboard.css';
import Exam from './pages/Exam/';
import Tryout from './pages/Tryout/';

class Exercises extends Component {
	render() {
		return(
			<React.Fragment>
				<Switch>
					<Route path='/exercises/exam/:id' component={Exam} />
					<Route path="/exercises/tryout/:id" component={Tryout} /> 
				</Switch>
			</React.Fragment>
		);
	}
}

export default Exercises;
	