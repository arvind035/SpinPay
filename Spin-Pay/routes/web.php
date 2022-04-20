<?php

use Illuminate\Support\Facades\Route;
    

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
})->name('home');

// registration routes start

Route::get('/register/userinfo', function () {
    return view('register.userinfo');
})->name('registerBtn');

Route::get('/register/userdata/{id}',function($id){
    $i = compact('id');
    return view('register.userdata')->with($i);
})->name('userdata'); 

Route::get('/register/userdocuments/{id}',function($id){
    $i = compact('id');
    return view('register.userdoc')->with($i);
})->name('userdoc');

// registration routes end

//  Login Routes
Route::get('/signin', function () {
    return view('signin');
});

// Borrower
Route::get('/dashboard', function(){
    return view('user.lender.dashboard');
    // return view('user.lender.sidenavbar');
});
Route::get('/navbar', function(){
    return view('user.layout.navbar');
});
Route::get('/a', function(){
    return view('user.layout.header');
});





