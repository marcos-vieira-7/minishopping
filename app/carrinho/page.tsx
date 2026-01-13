"use client";
import FormField from "@/app/components/FormField/page";
import SelectField from "../components/SelectField/SelectField";
import { useState } from "react";
import { randomUUID } from "crypto";

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

    const [carrinho, setCarrinho] = useState<any>([]);
    const [item, setItem] = useState({
        produtoId: "",
        quantidade: 1,
        precoUnitario: 0,
        nomeProduto: ""
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(carrinho);
    }

    const total = item.precoUnitario * item.quantidade; //calulo do total do item pedido

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value} = e.target;

        if (name === "produtoId") { //produto deve-se pegar o preco tbm.

            item.quantidade = 1; //trocou produto, conserta qtd.

            const produtoSelecionado = produtos.find(
                (p) => p.id === value
            );
            setItem((prev:any) => ({
                ...prev,
                produtoId: value,
                precoUnitario: produtoSelecionado ? produtoSelecionado.preco: 0,
                nomeProduto: produtoSelecionado?.nome,
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
        setCarrinho((prev: any) => [...prev, item]);
    }

    console.log("renderizou", item);


    function removerItem(indexToRemove: number) {

        let confirmar = window.confirm("Você confirma a exclusão do item?");

        if (confirmar) {
            setCarrinho((prev:any) =>
                prev.filter((_:any,index:any) => index !== indexToRemove)
            );
        }
        return;
    }

    const totalCarrinho = carrinho.reduce((acc:any, item:any) => {
        return acc + item.precoUnitario * item.quantidade;
    }, 0);


    function formatarReal(valor: number|string) {

        let _valor = valor;
        if (typeof valor == "string") {
            _valor = Number(valor);
        }

        return _valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }

    return(
    <section className="mx-auto max-w-xl">
        <div className="rounded-lg bg-white p-6 shadow-sm">
            {/* Cabeçalho */}
            <header className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
                Carrinho
            </h2>
            <p className="text-sm text-gray-500 font-bold">
                Adicionar Item
            </p>
            </header>

            {/* Formulário */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
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


            <div className="flex flex-col gap-1">
                <label
                    htmlFor="precoUnitario"
                    className="text-sm font-medium text-gray-700">
                    Preço Unitário
                </label>
                <input name="precoUnitario" disabled value={formatarReal(item.precoUnitario)} 
                    className="bg-gray-100 text-gray-500 font-medium rounded-sm p-1"/>
            </div>

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
                    {formatarReal(total.toFixed(2))}
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

            <ul className="mt-6 space-y-2">
                {carrinho.map((item: any, index: any) => (
                    <li key={index} className="flex justify-between rounded-md border p-3 text-sm">
                        <span>
                            <strong>{item.quantidade} x</strong>
                        </span>

                        <span>
                            <strong>{item.nomeProduto}</strong>
                        </span>

                        <strong>
                            {formatarReal((item.precoUnitario * item.quantidade).toFixed(2))}
                        </strong>

                        <button
                            onClick={() => removerItem(index)}
                            className="text-red-500 text-sm hover:underline">
                                Excluir
                        </button>

                    </li>
                ))}
            </ul>

            <div className="mt-6 rounded-lg bg-gray-100 p-6 text-right">
                <p className="text-sm text-gray-500">Total do Carrinho</p>
                <p className="text-3xl font-bold text-green-600">
                    {formatarReal(totalCarrinho.toFixed(2))}
                </p>
            </div>


        </div>
    </section>
    );

}