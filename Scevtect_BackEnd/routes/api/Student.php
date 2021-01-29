<?php 


/*
	* Routing for Student
*/
Route::name('student')->prefix('/student/{studentId}')->group(function() {
	include
	__DIR__.'/student/DashboardRoute.php';

	include
	__DIR__.'/student/SubjectRoute.php';

	include
	__DIR__.'/student/TheoryRoute.php';

	include
	__DIR__.'/student/DutyRoute.php';

	include 
	__DIR__.'/student/TryoutRoute.php';

	include 
	__DIR__.'/student/ExamRoute.php';

	include
	__DIR__.'/student/AbsentRoute.php';

	include
	__DIR__.'/student/AnnouncementRoute.php';

	include
	__DIR__.'/student/ProductRoute.php';

	include 
	__DIR__.'/student/WalletRoute.php';

	include
	__DIR__.'/student/ProfileRoute.php';

	include
	__DIR__.'/student/LibraryRoute.php';

	include
	__DIR__.'/student/PaymentRoute.php';

	include
	__DIR__.'/student/EventRoute.php';
});