<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'mohammad',
            'email' => 'admin@qrcode.org',
            'password' => Hash::make('P@ssw0rd'),
            'api_token' => Str::random(150)
        ]);
        DB::table('users')->insert([
            'name' => 'Ammar',
            'email' => 'student@qrcode.org',
            'password' => Hash::make('P@ssw0rd'),
            'api_token' => Str::random(150)
        ]);
        DB::table('users')->insert([
            'name' => 'Bashar',
            'email' => 'teacher@qrcode.org',
            'password' => Hash::make('P@ssw0rd'),
            'api_token' => Str::random(150)
        ]);

        DB::table('role_users')->insert([
            'user_id' => 1,
            'role_id' => 1,
        ]);
        DB::table('role_users')->insert([
            'user_id' => 2,
            'role_id' => 3,
        ]);
        DB::table('role_users')->insert([
            'user_id' => 3,
            'role_id' => 2,
        ]);
    }
}
