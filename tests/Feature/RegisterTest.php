<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;

class RegisterTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegister()
    {

        $user = User::where('email','like','admin@qrcode.org')->first();

        $authorization = 'Bearer '.$user->api_token;

        $response = $this->post('/api/register',[
            'name' => 'test name',
            'email' => 'test123@qrcode.org',
            'role_id' => 2
        ]);

        $response->assertStatus(401)->assertJson([
            'code' => 401
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer InvalidToken'
        ])->post('/api/register',[
            'name' => 'test123 name',
            'email' => 'test123@qrcode.org',
            'role_id' => 2
        ]);

        $response->assertStatus(401)->assertJson([
            'code' => 401
        ]);

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->post('/api/register',
        [
            'name' => 'test name',
            'email' => 'test123@qrcode.org',
            'role_id' => 2
        ]);

        $response->assertStatus(201)->assertJson([
            'code' => 201
        ]);

        $response = $this->withHeaders([
            'Authorization' => $authorization
        ])->post('/api/register',[
            'name' => 'test name',
            'email' => 'test123@qrcode.org',
            'role_id' => 3
        ]);

        $response->assertStatus(400)->assertJson([
            'code' => 400
        ]);
    }
}
