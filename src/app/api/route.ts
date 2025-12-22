import type { Employee } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  const employees = await prisma.employee.findMany();
  await setCache("employees", employees, 600); // Cache por 10 minutos
  const cachedEmployees = await getCache<Employee[]>("employees");
  return NextResponse.json({ employees: cachedEmployees ?? employees });
}
