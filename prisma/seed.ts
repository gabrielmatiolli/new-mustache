import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { env, loadEnvs } from "../src/lib/env";

// Carrega as variáveis de ambiente
loadEnvs()

const connectionString = env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ 
  adapter,
  log: ["query", "info", "warn", "error"],
});

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...\n");

  // Limpa o banco de dados (ordem importante por causa das foreign keys)
  console.log("🗑️  Limpando dados existentes...");
  await prisma.appointmentProduct.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.employeeService.deleteMany();
  await prisma.showcasePhoto.deleteMany();
  await prisma.account.deleteMany();
  await prisma.product.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Dados limpos!\n");

  // ========== USUÁRIOS ==========
  console.log("👥 Criando usuários...");
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "João Silva",
        phone: "+5511999999001",
      },
    }),
    prisma.user.create({
      data: {
        name: "Maria Santos",
        phone: "+5511999999002",
      },
    }),
    prisma.user.create({
      data: {
        name: "Pedro Oliveira",
        phone: "+5511999999003",
      },
    }),
    prisma.user.create({
      data: {
        name: "Ana Costa",
        phone: "+5511999999004",
      },
    }),
    prisma.user.create({
      data: {
        name: "Carlos Ferreira",
        phone: "+5511999999005",
      },
    }),
    prisma.user.create({
      data: {
        name: "Juliana Almeida",
        phone: "+5511999999006",
      },
    }),
    prisma.user.create({
      data: {
        name: "Roberto Lima",
        phone: "+5511999999007",
      },
    }),
    prisma.user.create({
      data: {
        name: "Fernanda Souza",
        phone: "+5511999999008",
      },
    }),
  ]);
  console.log(`✅ ${users.length} usuários criados!\n`);

  // ========== SERVIÇOS ==========
  console.log("✂️  Criando serviços...");
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "Corte Masculino",
        duration: 30,
        price: 45.0,
        description:
          "Corte de cabelo masculino tradicional com acabamento a máquina",
        imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
      },
    }),
    prisma.service.create({
      data: {
        name: "Corte + Barba",
        duration: 50,
        price: 65.0,
        description: "Corte de cabelo masculino + barba completa com navalha",
        imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      },
    }),
    prisma.service.create({
      data: {
        name: "Barba",
        duration: 25,
        price: 35.0,
        description: "Barba completa com navalha e finalização",
        imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
      },
    }),
    prisma.service.create({
      data: {
        name: "Sobrancelha",
        duration: 15,
        price: 20.0,
        description: "Design de sobrancelha masculina",
        imageUrl: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0",
      },
    }),
    prisma.service.create({
      data: {
        name: "Pézinho",
        duration: 15,
        price: 15.0,
        description: "Acabamento de pézinho e contorno",
        imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
      },
    }),
    prisma.service.create({
      data: {
        name: "Corte Feminino",
        duration: 60,
        price: 80.0,
        description: "Corte de cabelo feminino com lavagem e secagem",
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
      },
    }),
    prisma.service.create({
      data: {
        name: "Hidratação",
        duration: 45,
        price: 70.0,
        description: "Hidratação profunda para todos os tipos de cabelo",
        imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
      },
    }),
    prisma.service.create({
      data: {
        name: "Coloração",
        duration: 120,
        price: 150.0,
        description: "Coloração completa com produtos de alta qualidade",
        imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      },
    }),
  ]);
  console.log(`✅ ${services.length} serviços criados!\n`);

  // ========== FUNCIONÁRIOS ==========
  console.log("👨‍💼 Criando funcionários...");
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: "Marcelo Barbeiro",
        phone: "+5511988888001",
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    }),
    prisma.employee.create({
      data: {
        name: "Rafael Cortez",
        phone: "+5511988888002",
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
    }),
    prisma.employee.create({
      data: {
        name: "Lucas Tesoura",
        phone: "+5511988888003",
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      },
    }),
    prisma.employee.create({
      data: {
        name: "Patricia Style",
        phone: "+5511988888004",
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
    }),
    prisma.employee.create({
      data: {
        name: "Bruna Hair",
        phone: "+5511988888005",
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      },
    }),
  ]);
  console.log(`✅ ${employees.length} funcionários criados!\n`);

  // ========== RELACIONAMENTO FUNCIONÁRIO-SERVIÇO ==========
  console.log("🔗 Criando relacionamentos funcionário-serviço...");
  const employeeServices = await Promise.all([
    // Marcelo - especialista em masculino
    prisma.employeeService.create({
      data: {
        employeeId: employees[0].id,
        serviceId: services[0].id, // Corte Masculino
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[0].id,
        serviceId: services[1].id, // Corte + Barba
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[0].id,
        serviceId: services[2].id, // Barba
      },
    }),

    // Rafael - masculino completo
    prisma.employeeService.create({
      data: {
        employeeId: employees[1].id,
        serviceId: services[0].id,
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[1].id,
        serviceId: services[1].id,
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[1].id,
        serviceId: services[3].id, // Sobrancelha
      },
    }),

    // Lucas - masculino básico
    prisma.employeeService.create({
      data: {
        employeeId: employees[2].id,
        serviceId: services[0].id,
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[2].id,
        serviceId: services[2].id,
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[2].id,
        serviceId: services[4].id, // Pézinho
      },
    }),

    // Patricia - feminino completo
    prisma.employeeService.create({
      data: {
        employeeId: employees[3].id,
        serviceId: services[5].id, // Corte Feminino
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[3].id,
        serviceId: services[6].id, // Hidratação
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[3].id,
        serviceId: services[7].id, // Coloração
      },
    }),

    // Bruna - feminino
    prisma.employeeService.create({
      data: {
        employeeId: employees[4].id,
        serviceId: services[5].id,
      },
    }),
    prisma.employeeService.create({
      data: {
        employeeId: employees[4].id,
        serviceId: services[6].id,
      },
    }),
  ]);
  console.log(`✅ ${employeeServices.length} relações criadas!\n`);

  // ========== HORÁRIOS DOS FUNCIONÁRIOS ==========
  console.log("📅 Criando horários de trabalho...");
  const schedules = [];
  
  // Horário padrão: Segunda a Sexta 9h-18h, Sábado 9h-15h
  for (const employee of employees) {
    // Segunda a Sexta (1-5)
    for (let weekday = 1; weekday <= 5; weekday++) {
      schedules.push(
        prisma.schedule.create({
          data: {
            employeeId: employee.id,
            weekday,
            startTime: "09:00",
            endTime: "18:00",
            lunchStart: "12:00",
            lunchEnd: "13:00",
          },
        })
      );
    }
    // Sábado (6)
    schedules.push(
      prisma.schedule.create({
        data: {
          employeeId: employee.id,
          weekday: 6,
          startTime: "09:00",
          endTime: "15:00",
          lunchStart: null,
          lunchEnd: null,
        },
      })
    );
  }
  await Promise.all(schedules);
  console.log(`✅ ${schedules.length} horários criados!\n`);

  // ========== PRODUTOS ==========
  console.log("🛍️  Criando produtos...");
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Pomada Modeladora Premium",
        price: 45.0,
        quantity: 50,
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
      },
    }),
    prisma.product.create({
      data: {
        name: "Shampoo Anticaspa",
        price: 35.0,
        quantity: 40,
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1585828922344-f2447d8ea6a0",
      },
    }),
    prisma.product.create({
      data: {
        name: "Óleo para Barba",
        price: 55.0,
        quantity: 30,
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1618633944995-d2e1f1d2e9e1",
      },
    }),
    prisma.product.create({
      data: {
        name: "Cera Modeladora",
        price: 40.0,
        quantity: 35,
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      },
    }),
    prisma.product.create({
      data: {
        name: "Condicionador Hidratante",
        price: 38.0,
        quantity: 45,
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
      },
    }),
    prisma.product.create({
      data: {
        name: "Kit Pente + Escova",
        price: 65.0,
        quantity: 20,
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1522338140262-f46f5913618a",
      },
    }),
    prisma.product.create({
      data: {
        name: "Gel Fixador Forte",
        price: 28.0,
        quantity: 60,
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1616783943084-8aca2f827bf9",
      },
    }),
    prisma.product.create({
      data: {
        name: "Máscara Capilar Reparadora",
        price: 75.0,
        quantity: 25,
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
      },
    }),
  ]);
  console.log(`✅ ${products.length} produtos criados!\n`);

  // ========== AGENDAMENTOS ==========
  console.log("📆 Criando agendamentos...");
  const now = new Date();
  const appointments = await Promise.all([
    // Agendamentos concluídos (passado)
    prisma.appointment.create({
      data: {
        userId: users[0].id,
        employeeId: employees[0].id,
        serviceId: services[0].id,
        date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
        status: "DONE",
        paymentMethod: "PIX",
      },
    }),
    prisma.appointment.create({
      data: {
        userId: users[1].id,
        employeeId: employees[1].id,
        serviceId: services[1].id,
        date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
        status: "DONE",
        paymentMethod: "CREDIT",
      },
    }),
    prisma.appointment.create({
      data: {
        userId: users[2].id,
        employeeId: employees[3].id,
        serviceId: services[5].id,
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
        status: "DONE",
        paymentMethod: "DEBIT",
      },
    }),
    prisma.appointment.create({
      data: {
        userId: users[3].id,
        employeeId: employees[2].id,
        serviceId: services[2].id,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
        status: "DONE",
        paymentMethod: "CASH",
      },
    }),

    // Agendamentos cancelados
    prisma.appointment.create({
      data: {
        userId: users[4].id,
        employeeId: employees[0].id,
        serviceId: services[0].id,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // Ontem
        status: "CANCELED",
      },
    }),

    // Agendamentos futuros (agendados)
    prisma.appointment.create({
      data: {
        userId: users[5].id,
        employeeId: employees[1].id,
        serviceId: services[1].id,
        date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // Amanhã 10h
        status: "SCHEDULED",
      },
    }),
    prisma.appointment.create({
      data: {
        userId: users[6].id,
        employeeId: employees[3].id,
        serviceId: services[6].id,
        date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Daqui 2 dias 14h
        status: "SCHEDULED",
      },
    }),
    prisma.appointment.create({
      data: {
        userId: users[7].id,
        employeeId: employees[4].id,
        serviceId: services[5].id,
        date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Daqui 3 dias 11h
        status: "SCHEDULED",
      },
    }),
    prisma.appointment.create({
      data: {
        userId: users[0].id,
        employeeId: employees[0].id,
        serviceId: services[0].id,
        date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // Daqui 5 dias 9h
        status: "SCHEDULED",
      },
    }),
    prisma.appointment.create({
      data: {
        userId: users[1].id,
        employeeId: employees[2].id,
        serviceId: services[4].id,
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // Daqui 7 dias 15h
        status: "SCHEDULED",
      },
    }),
  ]);
  console.log(`✅ ${appointments.length} agendamentos criados!\n`);

  // ========== PRODUTOS NOS AGENDAMENTOS ==========
  console.log("🛒 Adicionando produtos aos agendamentos...");
  const appointmentProducts = await Promise.all([
    // Produtos vendidos em agendamentos concluídos
    prisma.appointmentProduct.create({
      data: {
        appointmentId: appointments[0].id,
        productId: products[0].id, // Pomada
        quantity: 1,
        price: products[0].price,
      },
    }),
    prisma.appointmentProduct.create({
      data: {
        appointmentId: appointments[1].id,
        productId: products[2].id, // Óleo para Barba
        quantity: 1,
        price: products[2].price,
      },
    }),
    prisma.appointmentProduct.create({
      data: {
        appointmentId: appointments[1].id,
        productId: products[3].id, // Cera Modeladora
        quantity: 1,
        price: products[3].price,
      },
    }),
    prisma.appointmentProduct.create({
      data: {
        appointmentId: appointments[2].id,
        productId: products[7].id, // Máscara Capilar
        quantity: 2,
        price: products[7].price,
      },
    }),
    prisma.appointmentProduct.create({
      data: {
        appointmentId: appointments[3].id,
        productId: products[1].id, // Shampoo
        quantity: 1,
        price: products[1].price,
      },
    }),
  ]);
  console.log(`✅ ${appointmentProducts.length} produtos vinculados!\n`);

  // ========== CONTAS DE ACESSO ==========
  console.log("🔐 Criando contas de acesso...");
  const accounts = await Promise.all([
    // Admin principal
    prisma.account.create({
      data: {
        phone: "+5511977777001",
        password: "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/ok.pNsnKEv.lq", // "senha123" hasheada
        role: "ADMIN",
      },
    }),
    // Funcionário Marcelo
    prisma.account.create({
      data: {
        phone: employees[0].phone,
        password: "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/ok.pNsnKEv.lq", // "senha123"
        role: "EMPLOYEE",
        employeeId: employees[0].id,
      },
    }),
    // Funcionário Rafael
    prisma.account.create({
      data: {
        phone: employees[1].phone,
        password: "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/ok.pNsnKEv.lq", // "senha123"
        role: "EMPLOYEE",
        employeeId: employees[1].id,
      },
    }),
  ]);
  console.log(`✅ ${accounts.length} contas criadas!\n`);
  console.log("📌 Senha padrão para todas as contas: senha123\n");

  // ========== FOTOS SHOWCASE ==========
  console.log("📸 Criando fotos showcase...");
  const showcasePhotos = await Promise.all([
    // Fotos de serviços
    prisma.showcasePhoto.create({
      data: {
        imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
        description: "Corte masculino moderno",
        serviceId: services[0].id,
        employeeId: employees[0].id,
      },
    }),
    prisma.showcasePhoto.create({
      data: {
        imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
        description: "Barba bem aparada",
        serviceId: services[2].id,
        employeeId: employees[1].id,
      },
    }),
    prisma.showcasePhoto.create({
      data: {
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
        description: "Corte feminino longo",
        serviceId: services[5].id,
        employeeId: employees[3].id,
      },
    }),
    prisma.showcasePhoto.create({
      data: {
        imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
        description: "Coloração balayage",
        serviceId: services[7].id,
        employeeId: employees[4].id,
      },
    }),
    // Fotos gerais dos funcionários
    prisma.showcasePhoto.create({
      data: {
        imageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
        description: "Trabalho do Marcelo",
        employeeId: employees[0].id,
      },
    }),
    prisma.showcasePhoto.create({
      data: {
        imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
        description: "Portfolio da Patricia",
        employeeId: employees[3].id,
      },
    }),
  ]);
  console.log(`✅ ${showcasePhotos.length} fotos showcase criadas!\n`);

  // ========== RESUMO ==========
  console.log("========================================");
  console.log("🎉 SEED CONCLUÍDO COM SUCESSO!");
  console.log("========================================");
  console.log(`👥 Usuários: ${users.length}`);
  console.log(`✂️  Serviços: ${services.length}`);
  console.log(`👨‍💼 Funcionários: ${employees.length}`);
  console.log(`🔗 Funcionário-Serviços: ${employeeServices.length}`);
  console.log(`📅 Horários: ${schedules.length}`);
  console.log(`🛍️  Produtos: ${products.length}`);
  console.log(`📆 Agendamentos: ${appointments.length}`);
  console.log(`🛒 Produtos vendidos: ${appointmentProducts.length}`);
  console.log(`🔐 Contas: ${accounts.length}`);
  console.log(`📸 Fotos Showcase: ${showcasePhotos.length}`);
  console.log("========================================");
  console.log("\n💡 Dica: Use as credenciais abaixo para login:");
  console.log("   📱 Admin: +5511977777001 | senha: senha123");
  console.log("   📱 Funcionário: +5511988888001 | senha: senha123");
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
