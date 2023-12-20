<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserFollow;
use App\Http\Resources\UserFollowResource;

class UserFollowController extends Controller
{
    public function index()
    {
        $users = UserFollow::all();
        return UserFollowResource::collection($users);
    }

}
