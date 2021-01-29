<?php

/*
	* Routing for Admin
*/
Route::name('admin')->prefix('admin/{adminId}')->group(function() {
	include
	__DIR__.'/admin/Dashboard.php';

	include
	__DIR__.'/admin/Admin.php';

	include
	__DIR__.'/admin/School.php';

	include
	__DIR__.'/admin/Recruiter.php';

	include
	__DIR__.'/admin/Scholarship.php';

	include
	__DIR__.'/admin/Job.php';

	include
	__DIR__.'/admin/Payment.php';

});