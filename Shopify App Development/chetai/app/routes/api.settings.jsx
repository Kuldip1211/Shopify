// ✅ app/routes/api.settings.jsx
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ GET user info (first record)
export async function loader() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return Response.json({
        success: false,
        message: "No user found",
        user: null,
      });
    }
    return Response.json({ success: true, user });
  } catch (error) {
    console.error("❌ Loader error:", error);
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST/PUT user info
export async function action({ request }) {
  try {
    const data = await request.json();
    const { firstName, lastName, phone, email } = data;

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      const updated = await prisma.user.update({
        where: { email },
        data: { firstName, lastName, phone },
      });
      return Response.json({
        success: true,
        message: "User updated successfully",
        user: updated,
      });
    } else {
      const created = await prisma.user.create({
        data: { firstName, lastName, phone, email },
      });
      return Response.json({
        success: true,
        message: "User created successfully",
        user: created,
      });
    }
  } catch (error) {
    console.error("❌ Action error:", error);
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
