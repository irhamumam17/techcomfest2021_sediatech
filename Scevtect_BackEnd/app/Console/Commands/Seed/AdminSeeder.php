<?php

namespace App\Console\Commands\Seed;

use Illuminate\Console\Command;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Admin;

class AdminSeeder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:admin {value=5}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command for generate dummy data table admins';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $faker = Faker::create('id_ID');
        $value = $this->argument('value');
        echo "\n";
        for ($i=1; $i <= $value; $i++) { 
            $user = [
                'name'     => $faker->name,
                'email'    => $faker->freeEmail,
                'password' => Hash::make('admin123'),
                'level_id' => 1,
                'image'    => 'admin.jpg',
            ];

            $this->info('----------- Admin ke - ' . $i . ' -----------');
            dump($user);echo "\n";
            User::create($user);
            Admin::create(['user_id' => User::get()->last()->id]);
        }

        return 0;
    }
}
