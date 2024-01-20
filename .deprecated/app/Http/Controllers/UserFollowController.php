<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserFollow;
use App\Http\Resources\UserFollowResource;

use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserFollowController extends Controller
{
    public function index()
    {
        $users = UserFollow::all();
        return UserFollowResource::collection($users);
    }

         //ostavi komentar
         public function zaprati(Request $request)
         {
         $validator = Validator::make($request->all(), [
             'followed_id' => 'required',
         ]);
     
         if ($validator->fails()) {
             return response()->json($validator->errors());
         }
    
         $user_id = Auth::user()->id;
     
         $userFollow = new UserFollow();

         $userFollow->statusPracenja = 'prati';
         $userFollow->datum = Carbon::now()->format('Y-m-d'); //trenutni datum i vreme
         $userFollow->follower_id = $user_id;
         $userFollow->followed_id = $request->followed_id;
     
         $userFollow->save();
     
         return response()->json(['Uspešno ste zapratili datu osobu!',
              new UserFollowResource($userFollow)]);
         }


         public function otprati(Request $request)
         {
         $validator = Validator::make($request->all(), [
             'followed_id' => 'required',
         ]);
     
         if ($validator->fails()) {
             return response()->json($validator->errors());
         }
    
         $user_id = Auth::user()->id;
     
         $userFollow = UserFollow::where('follower_id', $user_id)
         ->where('followed_id', $request->followed_id)
         ->delete();;
     
         return response()->json(['Uspešno ste otpratili datu osobu!']);
         }
    

}
