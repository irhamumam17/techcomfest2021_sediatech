import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../../../components/Variants/';
import { ExercisesContext } from '../../../../context.js';
import { ExamContext } from '../../context.js';
import Loading from '../../../../../../../../components/Loading/';

class Add extends Component {
	btnDeleteQuestion = '';
	constructor(props) {
		super(props);

		this.state = {
			title: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.createQuestion = this.createQuestion.bind(this);
		this.formatQuestion = this.formatQuestion.bind(this);
		this.changeQuestion = this.changeQuestion.bind(this);
		this.deleteQuestion = this.deleteQuestion.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});
	}

	formatQuestion = (number) => {
		const question = document.createElement('div');
		question.classList.add('w-1/2');
		question.innerHTML = `
			<div class="card">
				<div class="flex flex-row justify-between">
					<span class="bg-purple-400 text-white rounded-full h-12 w-12 block flex items-center justify-center font-semibold text-lg">${number}</span>
					<button class="btn-delete-question focus:outline-none bg-red-400 text-white rounded-full h-12 w-12 hover:bg-red-500 transition duration-200">
						<svg class="w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
				<div class="my-4">
					<textarea data-name="question" name="question${number}" id="question" rows="7" class="form-input" placeholder="Soal ${number}"></textarea>
				</div>
				<div class="mt-4">
					<div class="my-2 flex flex-row">
						<input type="radio" name="answer_correct_number${number}" value="answer1" class="w-10 mt-4 cursor-pointer" />
						<input data-name="answer" type="text" class="form-input" name="number${number}_answer1" placeholder="Opsi 1" />
					</div>
					<div class="my-2 flex flex-row">
						<input type="radio" name="answer_correct_number${number}" value="answer2" class="w-10 mt-4 cursor-pointer" />
						<input data-name="answer" type="text" class="form-input" name="number${number}_answer2" placeholder="Opsi 2" />
					</div>
					<div class="my-2 flex flex-row">
						<input type="radio" name="answer_correct_number${number}" value="answer3" class="w-10 mt-4 cursor-pointer" />
						<input data-name="answer" type="text" class="form-input" name="number${number}_answer3" placeholder="Opsi 3" />
					</div>
					<div class="my-2 flex flex-row">
						<input type="radio" name="answer_correct_number${number}" value="answer4" class="w-10 mt-4 cursor-pointer" />
						<input data-name="answer" type="text" class="form-input" name="number${number}_answer4" placeholder="Opsi 4" />
					</div>
					<div class="flex flex-row items-center justify-center">
						<label for="" class="form-label">Score</label>
						<div class="w-20 ml-4">
							<input data-name="score" value="0" min="0" type="number" name="score${number}" class="form-input transform translate-y-2" />
						</div>
					</div>
				</div>
			</div>
		`;
		return question
	}

	createQuestion = () => {
		// disable input
		document.querySelector('input[name="total_questions"]').setAttribute('disabled' , 'true');
		document.getElementById('btnCreateQuestion').classList.add('hidden');
		document.getElementById('btnSubmit').classList.remove('hidden');

		// create question
		const questionContainer = document.getElementById('questionContainer');
		let totalQuestion = document.querySelector('input[name="total_questions"]');
		totalQuestion = parseInt(totalQuestion.value);
		let totalRows = (totalQuestion % 2 === 0) ? totalQuestion / 2 : Math.ceil(totalQuestion / 2);
		let number = 1;
		for (var i = 1; i <= totalRows; i++) {
			const row = document.createElement('div');
			row.classList.add('flex' ,'flex-row', 'my-4' ,'gap-4');
			const question1 = this.formatQuestion(number);
			row.append(question1);
			number++;

			if(number <= totalQuestion) {
				const question2 = this.formatQuestion(number);
				row.append(question2);
				number++;
			}

			questionContainer.append(row);
		}

		this.deleteQuestion();
	}

	changeQuestion = () => {
	    this.btnDeleteQuestion = document.querySelectorAll('.btn-delete-question')
	}

	deleteQuestion = () => {
	    this.btnDeleteQuestion = document.querySelectorAll('.btn-delete-question')
		this.btnDeleteQuestion.forEach(btn => {
			btn.addEventListener('click' , () => {
				let parent = btn.parentElement.parentElement.parentElement;
				let child = btn.parentElement.parentElement;
				parent.removeChild(child);

				this.changeQuestion();
			})
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		// get classes id;
		let classesId = [];
		for(let [key , value] of Object.entries(this.state)) {
			console.log(value);
			if(key.includes('class_id_')) {
				let classId = key.replace('class_id_' ,'');
				classId = parseInt(classId);
				classesId.push(classId);
			}
		}

		// get question and answer
		let questions = [];
		let getQuestions = document.querySelectorAll('textarea[data-name="question"]');
		getQuestions.forEach(question => {
			let data = {
				question: question.value,
				answers: [],
			};
			let element = question.parentElement.parentElement.lastElementChild;
			let answers = element.querySelectorAll('input[data-name="answer"]');
			let correct = element.querySelectorAll('input[type="radio"]');
			let score = element.querySelector('input[data-name="score"]');
			answers.forEach(answer => {
				// console.log(answer.value);
				let dataAnswer = { answer: answer.value};
				data.answers = [...data.answers , dataAnswer];
			});
			correct.forEach((answer , key) => {
				data.answers[key].correct =  answer.checked;
			})
			data.score = parseInt(score.value);
			questions.push(data);
		});


		// sent to exam context and waiting response from server
		let start_time = this.state.start_date + ' ' + this.state.start_time + ':00';
		let finish_time = this.state.finish_date + ' ' + this.state.finish_time+':00';
		let status = await this.context.addExam({
			title: this.state.title,
			description: this.state.description,
			start_time: start_time,
			finish_time: finish_time,
			subject_id: this.state.subject_id,
			classesId: classesId,
			questions: questions,
		});

		// redirect
		if(status === 200) {
			this.props.history.push('/teacher/exercises/exam/list');
		}
	}

	render() {
		return(
			<React.Fragment>
				<motion.div className="dashboard-title"
						variants={ Variants }
						initial="tInit"
						animate="tAnimate"
						transition="tTransition"
					>
					<h2 className="text-xl font-bold">Daftar Ujian</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/exercises/exam/list" className="hover:underline hover:text-blue-400">ujian </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/exercises/exam/add" className="hover:underline hover:text-blue-400">tambah </Link> 
					</h4>
				</motion.div>
				<motion.div
						variants={Variants}
						initial="btnHeadInit"
						animate="btnHeadAnimate"
						transition="btnHeadTransition"
						className="inline-block"
					>
					<Link to="/teacher/exercises/exam/list" className="button-header">Daftar Ujian</Link>
				</motion.div>
				<ExercisesContext.Consumer>{exercisesContext => {
					return(
						<React.Fragment>
							<form onSubmit={this.handleSubmit} className="card">
								<div className="form-group">
									<label htmlFor="title" className="form-label">Judul</label>
									<input autoFocus={true} type="text" name="title" onChange={this.handleChange} className="form-input" />
								</div>
								<div className="form-group">
									<label htmlFor="description" className="form-label">Deskripsi</label>
									<textarea name="description" onChange={this.handleChange} id="description" rows="2" className="form-input"></textarea>
								</div>
								<div className="flex flex-row gap-4">
									<div className="w-1/2">
										<div className="form-group">
											<label htmlFor="deadline" className="form-label">Dimulai</label>
											<div className="flex flex-row gap-2">
												<input type="date" name="start_date" onChange={this.handleChange} className="form-input"/>
												<input type="time" name="start_time" onChange={this.handleChange} className="form-input"/>
											</div>
										</div>
									</div>
									<div className="w-1/2">
										<div className="form-group">
											<label htmlFor="deadline" className="form-label">Berakhir</label>
											<div className="flex flex-row gap-2">
												<input type="date" name="finish_date" onChange={this.handleChange} className="form-input"/>
												<input type="time" name="finish_time" onChange={this.handleChange} className="form-input"/>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-row gap-4">
									<div className="w-3/4">
										<div className="form-group">
											<label htmlFor="subject_id" className="form-label">Mata Pelajaran</label>
											<select name="subject_id" onChange={this.handleChange} id="subject_id" className="form-input">
												<option value="">-- Pilih Mata Pelajaran --</option>
												{
													exercisesContext.subjects.map((subject , key) => {
														return(
															<option key={key} value={subject.id}>{subject.subject}</option>
															)
													})
												}
											</select>
										</div>
									</div>
									<div className="w-1/4">
										<div className="form-group">
											<label htmlFor="total_questions" className="form-label">Jumlah Soal</label>
											<input type="number" name="total_questions" className="form-input" />
										</div>
									</div>
								</div>
								<div className="form-group">
									{
										(exercisesContext.loading.classes) ?
											<Loading status={exercisesContext.loading.classes} size="large" />
										:
										exercisesContext.classes.map((value , key) => {
											return(
													<div key={key} className="flex flex-row items-center">
														<input type="checkbox" name={`class_id_${value.id}`} onChange={this.handleChange} />
														<span className="ml-2">{value.class_name}</span>
													</div>	
												)
										})
									}
								</div>
								<div className="text-right">
									<button onClick={this.createQuestion} id="btnCreateQuestion" type="button" className="button bg-purple-400">Buat Soal</button>
									<button type="submit" id="btnSubmit" className="button hidden bg-blue-400">Kirim</button>
								</div>
							</form>
							<div id="questionContainer" className="my-6">
							</div>
						</React.Fragment>
					)
				}}</ExercisesContext.Consumer>
			</React.Fragment>
		);
	}
}


Add.contextType = ExamContext;
export default Add;
	