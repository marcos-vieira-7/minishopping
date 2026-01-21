"use client";

import { useState } from "react";

import { formatarReal } from "@/utils/moeda";

type Produto = {
    id: number;
    nome: string;
    preco: number;
}

export default function ProdutosClient({ produtos }: {produtos: Produto[]}) {
  
    const [busca, setBusca] = useState("");
    const produtosFiltrados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase())
    );
    // const produtos = await getProdutos();

    return (
        <div className="overflow-x-auto">

            <input
                type="text"
                placeholder="Buscar produto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
            />

            <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
                <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                    Nome
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                    Preço
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                    Estoque
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                    Categoria
                </th>
                </tr>
            </thead>

            <tbody>
                {produtosFiltrados.map((produto:any) => (
                <tr
                    key={produto.id}
                    className="border-t hover:bg-gray-50 transition"
                >
                    <td className="px-4 py-3 font-medium text-gray-800">
                    {produto.nome}
                    </td>

                    <td className="px-4 py-3 text-green-600 font-semibold">
                    {formatarReal(produto.preco)}
                    </td>

                    <td className="px-4 py-3">
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                        produto.estoque > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {produto.estoque}
                    </span>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                    {produto.categoria}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );

}