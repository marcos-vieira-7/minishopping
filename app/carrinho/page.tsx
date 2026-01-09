"use client";
import FormField from "@/app/components/FormField/page";
import SelectField from "../components/SelectField/SelectField";
import { useState } from "react";

type Produto = {
    id: string;
    nome: string;
    preco: number;
};

export default function Carrinho() {

    //produtos (viriam da API)
    const produtos: Produto[] = [
        {id: "1", nome: "Paçoca", preco: 2.5},
        {id: "2", nome: "Chips", preco: 5.0},
        {id: "3", nome: "Pipa", preco: 3.9},
    ];

    const [carrinho, setCarrinho] = useState([]);
    const [item, setItem] = useState({
        produtoId: "", 
        quantidade: 1,
        precoUnitario: 0,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(carrinho);
    }

    const total = item.precoUnitario * item.quantidade; //calulo do total do item pedido

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value} = e.target;

        if (name === "produtoId") { //produto deve-se pegar o preco tbm.
            const produtoSelecionado = produtos.find(
                (p) => p.id === value
            );
            setItem((prev) => ({
                ...prev,
                produtoId: value,
                precoUnitario: produtoSelecionado ? produtoSelecionado.preco: 0,
            }));

            return;
        }

        setItem((prev) => ({
            ...prev,
            [name]: name === "quantidade"? Number(value) : value, //tratar tipo ao guardar value
        }));
    }

    function adicionarAoCarrinho() {
        console.log(item);
        //TODO: set no carrinho.
    }

    console.log("renderizou", item);

    return(
    <section className="mx-auto max-w-xl">
        <div className="rounded-lg bg-white p-6 shadow-sm">
            {/* Cabeçalho */}
            <header className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
                Carrinho
            </h2>
            <p className="text-sm text-gray-500">
                Adicionar Item
            </p>
            </header>

            {/* Formulário */}
            <form className="space-y-4" onSubmit={handleSubmit}>
            <SelectField
                label="Produto"
                name="produtoId"
                value={item.produtoId}
                onChange={handleChange}
                options={produtos.map((p) => ({
                    value: p.id,
                    label: p.nome,
                }))}      
            />

            <FormField
                label="Quantidade"
                name="quantidade"
                type="number"
                value={item.quantidade}
                onChange={handleChange}
                placeholder=""
            />


            <p className="text-right text-sm text-gray-600">
                Total:{" "}
                <strong>
                    R$ {total.toFixed(2)}
                </strong>
            </p>

            {/* Ações */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                type="button"
                className="rounded-md border px-4 py-2 text-sm text-gray-600
                            hover:bg-gray-100"
                >
                Cancelar
                </button>

                <button onClick={adicionarAoCarrinho} 
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm 
                               font-medium text-white hover:bg-blue-700">
                Adicionar 
                </button>
            </div>
            </form>
        </div>
    </section>
    );

}