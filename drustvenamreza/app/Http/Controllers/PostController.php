<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
//za datum
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return PostResource::collection($posts);
    }

    //vrati post po idu
    public function show($id)
    {
        $posts = Post::findOrFail($id);
        return new PostResource($posts);
    }

     //objavljivanje novog posta
     public function store(Request $request)
     {
        //validacija koja sve polja moraju da se unesu
     $validator = Validator::make($request->all(), [
         'naslov' => 'required',
         'tekst' => 'required',
         //dozvoljeni formati za sliku
         'slika' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
         'user_id' => 'required',
         
     ]);
 
     if ($validator->fails()) {
         return response()->json($validator->errors());
     }
     //generisanje imena slike
     $slikaIme = Str::random(32).".".$request->slika->getClientOriginalExtension();
 
     $post = new Post();
     $post->naslov = $request->naslov;
     $post->datum = Carbon::now()->format('Y-m-d'); //trenutni datum
     $post->tekst = $request->tekst;
     $post->slika = $slikaIme;
     $post->user_id = $request->user_id;
     $post->statusPosta = 'Aktivan'; //po defaultu se sam stavlja da je aktivan
 
     //cuva se taj novi post
     $post->save();
 
     //cuvanje slike u folderu storage
     Storage::disk('public')->put($slikaIme, file_get_contents($request->slika));
 
     return response()->json(['Objavljen novi post.',
          new PostResource($post)]);
     }
 
     //azuriranje posta
     public function update(Request $request, $id)
     {
         $validator = Validator::make($request->all(), [
            'naslov' => 'required',
            'tekst' => 'required',
             //dozvoljeni formati za sliku
             'slika' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
             'statusPosta' => 'required',
             
         ]);
 
         if ($validator->fails()) {
             return response()->json($validator->errors());
         }
 
         $post = Post::find($id);
         if(!$post){
           return response()->json([
             'message'=>'Nije nadjen dati post da se izmeni.'
           ],404);
         }
 
         //menjanje unesenih vrednosti
         $post->naslov = $request->naslov;
         $post->tekst = $request->tekst;
         $post->statusPosta = $request->statusPosta;
 
         if($request->slika) {
             // Public storage
             $storage = Storage::disk('public');
 
             // Brisanje stare slike
             if($storage->exists($post->slika))
                 $storage->delete($post->slika);
 
             //generisanje imena slike 
             $slikaIme = Str::random(32).".".$request->slika->getClientOriginalExtension();
             //cuva se nova slika
             $post->slika = $slikaIme;
 
             // Image save in public folder
             $storage->put($slikaIme, file_get_contents($request->slika));
         }
 
         // Update posta
         $post->save();
 
         return response()->json(['Post uspesno azuriran.', new PostResource($post)]);
     }

     //izmena samo statusa posta
     public function updateStatus(Request $request, $id)
     {
         $request->validate([
             'statusPosta' => 'required'
         ]);
 
         $post = Post::findOrFail($id);
 
         $post->update(['statusPosta' => $request->input('statusPosta')]);
 
         return response()->json(['message' => 'Status posta uspesno izmenjen.', new PostResource($post)]);
     }
 
     //brisanje aposta
     public function destroy($id)
     {
          // Detail 
          $post = Post::find($id);
          if(!$post){
            return response()->json([
               'message'=>'Post za brisanje nije nadjen.'
 
            ],404);
          }
 
          // Public storage
          $storage = Storage::disk('public');
 
          // Brisanje slike iz foldera storage
          if($storage->exists($post->slika))
              $storage->delete($post->slika);
 
          // Brisanje Nekretnine
          $post->delete();
 
          // Return Json Response
          return response()->json([
              'message' => "Post je uspesno obrisan."
          ],200);
     }
    
}
