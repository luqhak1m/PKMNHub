
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function authMiddleware(request: NextRequest){

    console.log("running authMiddleware()");

    const jwt_token=process.env.JWT_SECRET;

    // get token from request
    const token=request.headers.get("Authorization")?.replace("Bearer ", "");

    // check if there is token
    if(!token){console.log("running authMiddleware()");
        return NextResponse.json(
        {error: "not authorized"},
        {status: 401 }
    )}

    try{
        const payload=jwt.verify(token, jwt_token!);
        (request as any).user=payload;
        return;
    }catch(err){
        return NextResponse.json({
            error: "invalid token"
        })
    }
}

// HOF
export function withAuth<T extends { params: any }>(handler: (request: Request, context?: T)=>Promise<NextResponse>){
    console.log("running withAuth()");

    return async (request: Request, context?: T)=>{
        console.log("returning withAuth()");

        const middlewareResponse=authMiddleware(request as any);
        if(middlewareResponse){console.log("middleware response ok");
            return middlewareResponse;
        }
        return handler(request, context);
    }
}