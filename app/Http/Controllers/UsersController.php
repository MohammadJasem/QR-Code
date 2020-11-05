<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UsersController extends Controller
{

    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function GetAllStudents(){

        return $this->userService->GetAllStudents();
    }

    public function GetAllTeachers(){
        return $this->userService->GetAllTeachers();
    }
}
