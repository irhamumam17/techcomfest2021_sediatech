<?php 

Route::name('school')->prefix('school/{schoolId}')->group(function() {
	include
	__DIR__.'/school/Dashboard.php';

	include
	__DIR__.'/school/ClassRoute.php';

	include
	__DIR__.'/school/Schedule.php';

	include
	__DIR__.'/school/CourseRoute.php';

	include
	__DIR__.'/school/SubjectRoute.php';

	include
	__DIR__.'/school/TeacherRoute.php';

	include
	__DIR__.'/school/StudentRoute.php';

	include
	__DIR__.'/school/ContractRoute.php';

	include
	__DIR__.'/school/EventRoute.php';

});