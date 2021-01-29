import React , {createContext , useState} from 'react';
export const CourseContext = createContext();

const CourseContextProvider = (props) => {
	const [courses , setCourse] = useState([
		{id: 1 , name: 'Web Development' , instructor: 'Darmawan S.Kom' , students: '100' },
		{id: 2 , name: 'Graphic Design' , instructor: 'Tito Ristiadi S.Kom' , students: '250' },
	]);

	const addCourse = (newCourse) => {
		setCourse([...courses, newCourse]);
	}

	const removeCourse = (id) => {
		setCourse(courses.filter(course => course.id !== id));
	}

	return (
		<CourseContext.Provider value={{courses , addCourse , removeCourse}} >
			{props.children}
		</CourseContext.Provider>
	)
}

export default CourseContextProvider;
	