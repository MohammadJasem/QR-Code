<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ScheduleService;

class ScheduleController extends Controller
{

    protected $scheduleService;

    public function __construct(ScheduleService $scheduleService){
        $this->scheduleService = $scheduleService;
    }

    public function addSchedule(Request $request)
    {
        $data = $request->all();

        return $this->scheduleService->addSchedule($data);
    }

    public function getAllSchedules(Request $request){

        $token = $request->header('Authorization');

        $token = str_replace('Bearer ', '', $token);

        return $this->scheduleService->getAllSchedules($token);
    }

    public function getAudiencesByScheduleId($schedule_id){

        return $this->scheduleService->getAudiencesByScheduleId($schedule_id);
    }
}
