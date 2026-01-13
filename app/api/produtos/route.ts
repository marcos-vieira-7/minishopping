import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.nome || body.preco == null) {
      return NextResponse.json(
        { error: "Nome e preço são obrigatórios" },
        { status: 400 }
      );
    }

    const produto = await prisma.produto.create({
      data: {
        nome: body.nome,
        preco: Number(body.preco),
        estoque: Number(body.estoque),
        categoria: body.categoria,
      },
    });

    return NextResponse.json(produto, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}