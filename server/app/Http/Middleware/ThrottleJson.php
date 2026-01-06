<?php

namespace App\Http\Middleware;

use App\Services\Response;
use Closure;
use Illuminate\Http\Exceptions\ThrottleRequestsException;

class ThrottleJson
{
    public function handle($request, Closure $next, $maxAttempts = 60, $decayMinutes = 1)
    {
        try {
            return app(\Illuminate\Routing\Middleware\ThrottleRequests::class)
                ->handle($request, $next, $maxAttempts, $decayMinutes);
        } catch (ThrottleRequestsException $e) {
            return Response::json([
                'message' => 'Too Many Requests',
                'retry_after' => $e->getHeaders()['Retry-After'] ?? null
            ], 'Too Many Requests', 429);
        }
    }
}
