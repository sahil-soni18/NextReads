import { testConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import path from "path";
import { ValidationError } from "sequelize";
import { promises as fs } from "fs";
import Book from "@/models/Books.model";

export async function POST(req: Request) {
    await testConnection(); // Ensure the database is connected

    const formData = await req.formData();

    // Use type assertions or null checks
    const title = formData.get("title") as string | null;
    const author = formData.get("author") as string | null;
    const description = formData.get("description") as string | null;
    const publishYear = formData.get("publishYear") as string | "";
    const pdfFile = formData.get("pdfFile") as File | null;

    // Validate required fields
    if (!title || !author || !description || !pdfFile) {
        return NextResponse.json(
            { success: false, message: "All fields, including a PDF file, are required" },
            { status: 400 }
        );
    }

    // Ensure the file is a valid PDF
    if (pdfFile.type !== "application/pdf") {
        return NextResponse.json(
            { success: false, message: "Only PDF files are allowed" },
            { status: 400 }
        );
    }

    // Save the PDF file to the /files directory
    try {
        const filesDir = path.join(process.cwd(), "files");
        await fs.mkdir(filesDir, { recursive: true }); // Ensure the directory exists

        const fileName = `${title}-${pdfFile.name}`;
        const filePath = path.join(filesDir, fileName);

        // Write the file to disk
        const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
        await fs.writeFile(filePath, pdfBuffer);

        // Store metadata in the database
        const newBook = await Book.create({
            title,
            author,
            description,
            publishYear: publishYear, // Convert string to number
            pdfPath: fileName // Save just the file name or path relative to /files
        });

        return NextResponse.json(
            { success: true, message: "Book has been uploaded", data: newBook },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            return NextResponse.json(
                { success: false, message: error.errors[0].message },
                { status: 400 }
            );
        } else if (error instanceof Error) {
            console.error("Error creating book:", error.message);
            return NextResponse.json(
                { success: false, message: "Internal server error" },
                { status: 500 }
            );
        }

        console.error("Unknown error:", error);
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
