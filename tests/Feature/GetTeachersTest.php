<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GetTeachersTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetTeachers()
    {
        $user = User::where('email','like','admin@qrcode.org')->first();
        $authorization = 'Bearer '.$user->api_token;

        $teacher_1 = User::create([
            'name' => 'teacher1',
            'email' => 'teacher1@qrcode.org',
            'password' => Hash::make('abcd1234'),
            'api_token' => Str::random(80),
        ]);

        $teacher_2 = User::create([
            'name' => 'teacher2',
            'email' => 'teacher2@qrcode.org',
            'password' => Hash::make('abcd1234'),
            'api_token' => Str::random(80),
        ]);

        $role_teacher = Role::where('role_name','like','ROLE_TEACHER')->first();

        $role_teacher->users()->attach($teacher_1->id);
        $role_teacher->users()->attach($teacher_2->id);

        $teachers = Role::with(['users' => function($query){
                $query->select('id','name','email');
        }])->where('role_name','like','ROLE_TEACHER')->first()->users;

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->get('/api/teachers');

        $response->assertStatus(200)
            ->assertSee(json_encode([
                'code' => 200,
                'teachers' => $teachers
        ]));
    }
}
