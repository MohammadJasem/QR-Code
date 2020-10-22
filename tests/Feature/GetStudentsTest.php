<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GetStudentsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetStudents()
    {

        $user = User::where('email','like','admin@qrcode.org')->first();
        $authorization = 'Bearer '.$user->api_token;

        $student_1 = User::create([
            'name' => 'Std1',
            'email' => 'std1@qrcode.org',
            'password' => Hash::make('abcd1234'),
            'api_token' => Str::random(80),
        ]);

        $student_2 = User::create([
            'name' => 'std2',
            'email' => 'std2@qrcode.org',
            'password' => Hash::make('abcd1234'),
            'api_token' => Str::random(80),
        ]);

        $role_student = Role::where('role_name','like','ROLE_STUDENT')->first();

        $role_student->users()->attach($student_1->id);
        $role_student->users()->attach($student_2->id);

        $students = Role::with(['users' => function($query){
                $query->select('id','name','email');
        }])->where('role_name','like','ROLE_STUDENT')->first()->users;

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->get('/api/students');

        $response->assertStatus(200)
            ->assertSee(json_encode([
                'code' => 200,
                'students' => $students
        ]));
    }
}
