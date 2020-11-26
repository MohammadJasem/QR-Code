<?php

namespace App\Http\Controllers;

use App\Services\GroupService;

use Illuminate\Http\Request;

class GroupController extends Controller
{
    protected $groupService;

    public function __construct(GroupService $groupService){
        $this->groupService = $groupService;
    }

    public function addGroup(Request $request){

        return $this->groupService->addGroup($request->all());
    }
    public function getGroup(Request $request,$is_admin){

        return $this->groupService->getGroup($request->header('Authorization'),$is_admin);
    }
}
