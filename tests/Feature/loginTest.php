<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class loginTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testLogIn()
    {
        $this->json('POST', '/api/login', [
                'email' => 'admin@qrcode.org',
                'password' => 'password'
            ])
            ->assertStatus(401)
            ->assertJson([
                'code' => 401,
        ]);

        $this->json('POST', '/api/login', [
            'email' => 'admin@qrcode.org',
            'password' => 'P@ssw0rd'
        ])
        ->assertStatus(200)
        ->assertJson([
            'code' => 200,
    ]);
    }
}
