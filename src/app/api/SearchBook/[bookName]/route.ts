import connectToDatabase from "@/lib/dbConnect";
import { authOptions } from "../../Auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { User } from "next-auth";
import Book from "@/models/Books.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { bookName: string } }
) {
  const book = params.bookName;

  if (!book) {
    return NextResponse.json(
      { success: false, message: "Book name is required!" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: "Not Authorised!" },
      { status: 401 }
    );
  }

  try {
    const bookData = await Book.findOne({
      where: {
        title: book,
      },
    });

    if (!bookData) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: bookData },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error finding book: ", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        message:
          process.env.NODE_ENV === "production"
            ? "An error occurred while finding the book"
            : errorMessage,
      },
      { status: 500 }
    );
  }
}
