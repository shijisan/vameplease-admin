import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req, res) {
  const { id } = req.query;
  const { email, username, password } = await req.json();

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); 

    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data: {
        email,
        username,
        password: hashedPassword, 
      },
    });

    return res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update admin." });
  }
}

export async function DELETE(req, res) {
  const { id } = req.query;

  try {
    await prisma.admin.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Admin deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete admin." });
  }
}