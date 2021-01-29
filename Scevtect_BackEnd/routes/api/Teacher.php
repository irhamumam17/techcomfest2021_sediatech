<?php

/*
	* Routing for Teacher
*/
Route::name('teacher')->prefix('teacher/{teacherId}')->group(function() {
	include
	__DIR__.'/teacher/DashboardRoute.php';

	include
	__DIR__.'/teacher/ProfileRoute.php';

	include
	__DIR__.'/teacher/StudentRoute.php';

	include
	__DIR__.'/teacher/TheoryRoute.php';

	include
	__DIR__.'/teacher/DutyRoute.php';

	include
	__DIR__.'/teacher/TryoutRoute.php';

	include
	__DIR__.'/teacher/ExamRoute.php';

	include
	__DIR__.'/teacher/PaymentRoute.php';

	include
	__DIR__.'/teacher/LibraryRoute.php';

	include
	__DIR__.'/teacher/AnnounceRoute.php';

	include 
	__DIR__.'/teacher/AbsentRoute.php';
	
});