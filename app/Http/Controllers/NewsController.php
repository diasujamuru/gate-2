<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use Illuminate\Http\Request;
use App\Models\News;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $news = new NewsCollection(News::OrderByDesc('id')->paginate(8));
        return Inertia::render('Homepage', [
            'title' => 'Gate',
            'description' => 'Welcome to Gate',
            'news' => $news
        ]);
    }

    public function store(Request $request)
    {

        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->save();
        return redirect()->back()->with('message', 'News is created!');
    }

    public function show(News $news)
    {
        $myNews = $news::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
        ]);
    }

    public function update(Request $request)
    {
        News::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return to_route('dashboard')->with('message', 'Update news has successfully!');
    }

    public function edit(News $news, Request $request) {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }

    public function destroy(Request $request) {
        News::find($request->id)->delete();
        return redirect()->back()->with('message', 'News is deleted successfully!');
    }
}
