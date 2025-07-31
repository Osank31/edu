import { NextResponse } from "next/server";

class Response {
    static success(data: any, message: string = "Success", status: number = 200) {
        return NextResponse.json({data, message},{status})
    }

    static error(data: any, message: string = "Error", status: number = 400) {
        return NextResponse.json({data, message},{status})
    }

    static serverError(error: any, message: string = "An error occurred", status: number = 500) {
        return NextResponse.json({error, message},{status})
    }
}


export default Response;