<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Http\Resources\CommentResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all();
        return CommentResource::collection($comments);
    }

    //vrati komentar po idu
    public function show($id)
    {
        $comments = Comment::findOrFail($id);
        return new CommentResource($comments);
    }

     //ostavi komentar
     public function store(Request $request)
     {
     $validator = Validator::make($request->all(), [
         'tekst' => 'required',
         'user_id' => 'required',
         'post_id' => 'required',
     ]);
 
     if ($validator->fails()) {
         return response()->json($validator->errors());
     }
 
     $comment = new Comment();
     $comment->tekst = $request->tekst;
     $comment->datum = Carbon::now()->format('Y-m-d H:i:s'); //trenutni datum i vreme
     $comment->user_id = $request->user_id;
     $comment->post_id = $request->post_id;
 
     $comment->save();
 
     return response()->json(['Uspešno ste ostavili komentar!',
          new CommentResource($comment)]);
     }


       //azuriranje komentara
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'tekst' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $comment = Comment::findOrFail($id);

        $comment->tekst = $request->tekst;
        $comment->datum = Carbon::now()->format('Y-m-d H:i:s'); //trenutni datum i vreme


        
        $comment->save();
    
        return response()->json(['Uspešno ste izmenili komentar!',
            new CommentResource($comment)]);
        }

    //brisanje komentara
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json('Uspešno obrisan komentar!');
    }
}
