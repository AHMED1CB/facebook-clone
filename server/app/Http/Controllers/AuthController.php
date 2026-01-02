<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    function getUserDetails()
    {

        return Response::json([
            'user' => request()->user()
        ], "Success", 200);

    }


    function register()
    {


        /* 

            name *
            email *
            password *
            password Verification *

        */

        $data = request()->only('name', 'email', 'password', 'password_confirmation');

        $check = Validator::make($data, [
            'name' => ['required', 'max:255'],
            'email' => ['email', 'required', 'max:255', 'unique:users,email'],
            'password' => ['min:8', 'max:16', 'required', 'confirmed']
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Register Data", 400);
        }


        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);


        return Response::json([], 'User registered successfully', 201);


    }


    public function login()
    {

        $data = request()->only('email', 'password');

        $check = Validator::make($data, [
            'email' => ['email', 'required', 'max:255', 'exists:users,email'],
            'password' => ['min:8', 'max:16', 'required']
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors(),
                'dd' => $data
            ], "Invalid Data Data", 400);
        }


        $userByEmail = User::whereEmail($data['email'])->first();

        $passwordCheck = Hash::check($data['password'], $userByEmail->password);

        if (!$passwordCheck) {
            return Response::json([
                'errors' => [
                    'login' => "Invalid Login Data"
                ]
            ], "Invalid Data Data", 400);
        }

        $token = $userByEmail->createToken('USER_AUTH_TOKEN', [], Carbon::now()->addDays(30))->plainTextToken;


        return Response::json([
            'token' => $token
        ], "User Login Successfully", 200);
    }


}
