<?php

namespace App\Console\Commands\Seed;

use Illuminate\Console\Command;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\School;

class SchoolSeeder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:school {value=5}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command for generate dummy data table schools.';

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
        return 0;
    }
}
