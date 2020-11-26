<?php

namespace App\Http\Controllers;

use App\Services\AttendanceService;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{

    protected $attendanceService;

    public function __construct(AttendanceService $attendanceService){
        $this->attendanceService = $attendanceService;
    }

    public function register(Request $request){

        $api_token = str_replace('Bearer ', '',$request->header('Authorization'));
        $url = $request->url();

        $qr_token = substr($url, strrpos($url, '/')+1);

        return $this->attendanceService->register($api_token, $qr_token);
    }
}
