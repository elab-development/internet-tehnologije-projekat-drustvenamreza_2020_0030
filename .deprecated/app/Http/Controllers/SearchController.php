<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\userResource;

class SearchController extends Controller
{
    public function searchUsers(Request $request)
    {
        $query = User::query();

        //Pretrazuje se po imenu korisnika
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        //Paginacija samo usera koji zadovoljavaju uslov za name
        $page = $request->input('page', 1);
        $perPage = 3;

        $users = $query->orderBy('name')->paginate($perPage, ['*'], 'page', $page);

        if($users->isEmpty()){
            return response()->json(['message' => 'Korisnici nisu pronadjeni'], 404);
        }
        return response()->json(['Trenutna strana' => $users->currentPage(), 'Poslednja strana' => $users->lastPage(),
         'Pronadjeni korisnici' => UserResource::collection($users)], 200);
    }
}
