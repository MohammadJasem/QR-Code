<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;
use App\User;
use App\Group;
use App\Subject;

class GroupTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testAddGroup()
    {
        $user = User::where('email','like','admin@qrcode.org')->first();
        $authorization = 'Bearer '.$user->api_token;

        $teacher = User::Create([
            'name' => 'teacher1',
            'email' => 'teacher1@qrcode.org',
            'password' => Hash::make('abcd1234'),
            'api_token' => Str::random(80),
        ]);

        $student_1 = User::create([
            'name' => 'std1',
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

        $student_3 = User::create([
            'name' => 'std3',
            'email' => 'std3@qrcode.org',
            'password' => Hash::make('abcd1234'),
            'api_token' => Str::random(80),
        ]);

        $subject = new Subject([
            'title' => 'subject1',
            'description' => 'Subject1 Description',
            'num_of_schedules' => 14,
            'credits' => 5,
        ]);

        $teacher->subjects()->save($subject);

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->post('/api/addGroup',[
            'name' => 'Group 1',
            'subject_id' => $subject->id,
            'students' => [
                $student_1->id,
                $student_2->id,
                $student_3->id
            ]
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'code' => 201
        ]);
    }
}
