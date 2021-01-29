<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use App\Models\LevelUser;
use App\Models\LevelSchool;
use App\Models\User;
use App\Models\Admin;
use App\Models\School;
use App\Models\Course;
use App\Models\RoleTeacher;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('table_user' , function() {
	$this->table(
	    ['name' , 'email'],
	    User::all(['name' , 'email'])->toArray()
	);
	$this->newLine(4);
	$this->line('something wrong');
});

Artisan::command('table_level' , function() {
	$this->table(
		['id' , 'level'],
		LevelUser::all(['id' , 'level'])->toArray(),
	);
});

Artisan::command('progress' , function() {
	$this->comment('Start Progress');
	$this->output->progressStart(5);
	for($i=0;$i<5;$i++) {
	    sleep(1);
	    $this->output->progressAdvance();
	}
	$this->output->progressFinish();
	$this->info('finish Progress');
});

Artisan::command('level_user ', function() {
	$this->comment('generate level user');
	$data = [
		['id' => 1, 'level' => 'admin'],
		['id' => 2, 'level' => 'instructor'],
		['id' => 3, 'level' => 'school'],
		['id' => 4, 'level' => 'teacher'],
		['id' => 5, 'level' => 'student'],
	];

	foreach ($data as $value) {
		dump($value);
		LevelUser::create($value);
	}
});

Artisan::command('level_school' , function() {
	$this->comment('generate level school');
	$data = [
		['id' => 1, 'level' => 'SD'],
		['id' => 2, 'level' => 'SMP'],
		['id' => 3, 'level' => 'SMA'],
		['id' => 4, 'level' => 'SMK'],
	];

	foreach ($data as $value) {
		dump($value);
		LevelSchool::create($value);
	}
});

Artisan::command('default_akun' , function() {
	$this->comment('generate data default akun');
	User::create([
		'name'     => 'Abdul Latif Mubasir',
		'email'    => 'bj.angel119@gmail.com',
		'password' => Hash::make('latifandfa119'),
		'level_id' => 1,
		'image'    => 'admin.jpg',
	]);
	Admin::create(['user_id' => User::get()->last()->id]);

	User::create([
		'name'     => 'Admin',
		'email'    => 'admin@gmail.com',
		'password' => Hash::make('admin123'),
		'level_id' => 1,
		'image'    => 'admin.jpg',
	]);
	Admin::create(['user_id' => User::get()->last()->id]);

	User::create([
		'name'     => 'SMK N 1 Kawunganten',
		'email'    => 'sekolah@gmail.com',
		'password' => Hash::make('sekolah123'),
		'level_id' => 3,
		'image'    => 'school.jpg',
	]);
	School::create([
		'user_id'    => User::get()->last()->id,
		'level_id'   => 4,
		'address'    => 'Jln. pramuka , bojong , kawunganten',
		'headmaster' => 'Drs. Witoto',
		'phone'      => '(0219) 0291920291',
		'hp'         => '08291289128392',
	]);
});


Artisan::command('generate_course' , function() {
	$this->comment('generate data course');
	$data = [
		['school_id' => 1 , 'name' => 'Teknik Kendaraan Ringan' , 'acronym' => 'TKR'],
		['school_id' => 1 , 'name' => 'Teknik Sepeda Motor' , 'acronym' => 'TSM'],
		['school_id' => 1 , 'name' => 'Multimedia' , 'acronym' => 'MM'],
		['school_id' => 1 , 'name' => 'Animasi' , 'acronym' => 'AN'],
	];
	foreach ($data as $value) {
		dump($value);
		Course::create($value);
	}
});

Artisan::command('role_teacher' , function() {
	$this->comment('generate default data role teacher');
	$data = [
		['name' => 'Mata Pelajaran'],
		['name' => 'Tata Usaha'],
		['name' => 'Perpustakaan'],
		['name' => 'Kurikulum'],
	];
	foreach ($data as $value) {
		dump($value);
		RoleTeacher::create($value);
	}
});