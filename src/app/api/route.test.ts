import { prisma } from "@/lib/prisma";

// Mock do Prisma Client ANTES de importar a rota
jest.mock("@/lib/prisma", () => ({
  prisma: {
    employee: {
      findMany: jest.fn(),
    },
  },
}));

// Mock do Redis
jest.mock("@/lib/redis", () => ({
  setCache: jest.fn(),
  getCache: jest.fn(),
  deleteCache: jest.fn(),
  deleteCachePattern: jest.fn(),
}));

// Mock do NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      json: async () => data,
      status: 200,
    })),
  },
}));

// Importa a rota DEPOIS dos mocks
import { GET } from "./route";
import { NextResponse } from "next/server";
import { setCache } from "@/lib/redis";

describe("GET /api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar lista de funcionários com sucesso", async () => {
    // Arrange
    const mockEmployees = [
      {
        id: "1",
        name: "João Silva",
        phone: "+5511999999001",
        imageUrl: "https://example.com/image1.jpg",
        status: "ACTIVE",
      },
      {
        id: "2",
        name: "Maria Santos",
        phone: "+5511999999002",
        imageUrl: "https://example.com/image2.jpg",
        status: "ACTIVE",
      },
    ];

    (prisma.employee.findMany as jest.Mock).mockResolvedValue(mockEmployees);
    (setCache as jest.Mock).mockResolvedValue(undefined);

    // Act
    await GET();

    // Assert
    expect(prisma.employee.findMany).toHaveBeenCalledTimes(1);
    expect(setCache).toHaveBeenCalledWith("employees", mockEmployees, 600);
    expect(NextResponse.json).toHaveBeenCalledWith({ employees: mockEmployees });
  });

  it("deve retornar array vazio quando não há funcionários", async () => {
    // Arrange
    (prisma.employee.findMany as jest.Mock).mockResolvedValue([]);
    (setCache as jest.Mock).mockResolvedValue(undefined);

    // Act
    await GET();

    // Assert
    expect(prisma.employee.findMany).toHaveBeenCalledTimes(1);
    expect(setCache).toHaveBeenCalledWith("employees", [], 600);
    expect(NextResponse.json).toHaveBeenCalledWith({ employees: [] });
  });

  it("deve retornar múltiplos funcionários", async () => {
    // Arrange
    const mockEmployees = [
      {
        id: "1",
        name: "Funcionário 1",
        phone: "+5511111111111",
        imageUrl: null,
        status: "ACTIVE",
      },
      {
        id: "2",
        name: "Funcionário 2",
        phone: "+5511222222222",
        imageUrl: null,
        status: "INACTIVE",
      },
      {
        id: "3",
        name: "Funcionário 3",
        phone: "+5511333333333",
        imageUrl: "https://example.com/image.jpg",
        status: "ACTIVE",
      },
    ];

    (prisma.employee.findMany as jest.Mock).mockResolvedValue(mockEmployees);
    (setCache as jest.Mock).mockResolvedValue(undefined);

    // Act
    await GET();

    // Assert
    expect(prisma.employee.findMany).toHaveBeenCalledTimes(1);
    expect(setCache).toHaveBeenCalledWith("employees", mockEmployees, 600);
    expect(NextResponse.json).toHaveBeenCalledWith({ employees: mockEmployees });
  });

  it("deve lançar erro quando o Prisma falha", async () => {
    // Arrange
    const mockError = new Error("Database connection failed");
    (prisma.employee.findMany as jest.Mock).mockRejectedValue(mockError);
    (setCache as jest.Mock).mockResolvedValue(undefined);

    // Act & Assert
    await expect(GET()).rejects.toThrow("Database connection failed");
    expect(prisma.employee.findMany).toHaveBeenCalledTimes(1);
  });

  it("deve chamar findMany sem filtros", async () => {
    // Arrange
    (prisma.employee.findMany as jest.Mock).mockResolvedValue([]);
    (setCache as jest.Mock).mockResolvedValue(undefined);

    // Act
    await GET();

    // Assert
    expect(prisma.employee.findMany).toHaveBeenCalledWith();
    expect(setCache).toHaveBeenCalled();
  });
});
