import type { Employee } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  const cachedEmployees = await getCache<Employee[]>("employees");
  if (!cachedEmployees) {
    const employees = await prisma.employee.findMany();
    await setCache("employees", employees, 600); // Cache por 10 minutos
    return NextResponse.json({ employees: employees });
  }
  return NextResponse.json({ employees: cachedEmployees });
}
