<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\User;
use Tests\TestCase;

class RolesTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRoles()
    {

        $user = User::where('email','like','admin@qrcode.org')->first();

        $authorization = 'Bearer '.$user->api_token;

        $response = $this->get('api/roles');

        $response->assertStatus(401)->assertJson([
            'code' => 401
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer InvalidToken'
        ])->get('api/roles');

        $response->assertStatus(401)->assertJson([
            'code' => 401
        ]);

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->get('/api/roles');

        $response->assertStatus(200)->assertJson([
            [
                'id' => 1,
                'role_name' => 'ROLE_ADMIN'
            ],
            [
                'id' => 2,
                'role_name' => 'ROLE_TEACHER'
            ],
            [
                'id' => 3,
                'role_name' => 'ROLE_STUDENT'
            ]
        ]);
    }
}
