import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    const admins = await prisma.admin.findMany();
    return new Response(JSON.stringify(admins), { status: 200 });
  } catch (error) {
    return new Response("Error fetching admins", { status: 500 });
  }
}

export async function POST(req) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({ message: "Username, email, and password are required." }),
      { status: 400 }
    );
  }

  try {
    // Check if the admin already exists by email
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return new Response(
        JSON.stringify({ message: "Admin with this email already exists." }),
        { status: 409 }
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await prisma.admin.create({
      data: {
        username,  // Add username here
        email,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "Admin created successfully", admin: newAdmin }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during admin creation:", error);

    if (error.code === 'P2002') {
      return new Response(
        JSON.stringify({ message: 'Admin with this email already exists.' }),
        { status: 409 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Something went wrong." }),
      { status: 500 }
    );
  }
}
