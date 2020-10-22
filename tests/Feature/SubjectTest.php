<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;
use App\User;
use App\Role;
use App\Subject;

class SubjectTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testAddSubject()
    {
        // Get Authorization Token
        $user = User::where('email','like','admin@qrcode.org')->first();
        $authorization = 'Bearer '.$user->api_token;

        $teacher = User::create([
            'name' => 'test',
            'email' => 'test@qrcode.org',
            'password' => Hash::make('abcd1234'),
            'api_token' => Str::random(80),
        ]);

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->post('/api/addSubject',[
            'title' => 'subject1',
            'description' => 'Subject Description',
            'num_of_schedules' => 12,
            'credits' => 5,
            'teacher_id' => $teacher->id
        ]);

        $response->assertStatus(201)->assertJson([
            'code' => 201
        ]);
    }

    public function testGetSubjects(){
        // Get Authorization Token
        $user = User::where('email','like','admin@qrcode.org')->first();
        $authorization = 'Bearer '.$user->api_token;

        $teacher = User::where('email','like','test@qrcode.org')->first();

        if($teacher == null){
            $teacher = User::create([
                'name' => 'test',
                'email' => 'test@qrcode.org',
                'password' => Hash::make('abcd1234'),
                'api_token' => Str::random(80),
            ]);
        }

        $subject_1 = new Subject([
            'title' => 'subject1',
            'description' => 'Subject1 Description',
            'num_of_schedules' => 14,
            'credits' => 5,
        ]);

        $subject_2 = new Subject([
            'title' => 'subject11',
            'description' => 'Subject11 Description',
            'num_of_schedules' => 12,
            'credits' => 3,
        ]);

        $subject_3 = new Subject([
            'title' => 'subject111',
            'description' => 'Subject111 Description',
            'num_of_schedules' => 16,
            'credits' => 2,
        ]);

        $teacher->subjects()->saveMany([
            $subject_1,
            $subject_2,
            $subject_3
        ]);

        $subjects = Subject::with('user:id,name,email')->get();

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->get('/api/subjects');

        $response->assertSee(json_encode([
            'code' => 200,
            'subjects' => $subjects
        ]));
    }
}
