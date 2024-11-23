import { testConnection } from "@/lib/dbConnect";
import Book from "@/models/Books.model";
import { NextResponse } from "next/server";
import { ValidationError } from "sequelize";

export async function POST(req: Request) {
    await testConnection(); // Ensure the database is connected

    const { title, author, description, downloadLink, readLink } = await req.json();

    // Validate required fields
    if (!title || !author || !description || !downloadLink || !readLink) {
        return NextResponse.json(
            { success: false, message: "All fields are required" },
            { status: 400 }
        );
    }

    try {
        // Create a new book record
        await Book.create({
            title,
            author,
            description,
            downloadLink,
            readLink,
        });

        return NextResponse.json(
            { success: true, message: "Book has been uploaded..." },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            return NextResponse.json(
                { success: false, message: error.errors[0].message },
                { status: 400 }
            );
        } else if (error instanceof Error) {
            console.error('Error creating book:', error.message);
    
            return NextResponse.json(
                { success: false, message: "Internal server error" },
                { status: 500 }
            );
        }
    
        console.error('Unknown error:', error);
    
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
