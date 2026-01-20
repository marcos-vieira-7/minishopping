"use client";
import FormField from "@/app/components/FormField/page";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Toast from "@/app/components/Toast/page";
import { apiFetch } from "@/lib/api";

// const TOKEN = localStorage.getItem("token");


export default function ProdutoForm() {

    const router = useRouter();

    const [toast, setToast] = useState({
      message: "",
      type: "success",
      visible: false,
    });
    const timeoutRef:any = useRef(null);

    const [form, setForm] = useState({
        nome: "",
        preco: "",
        estoque: "",
        categoria: "",
    })

    function showToast(message="", type = "success") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // entra
      setToast({ message, type, visible: true });
      // sai
      timeoutRef.current = setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          visible: false,
        }));
      }, 2500);

      // remove do DOM depois da animação
      setTimeout(() => {
        setToast({ message: "", type, visible: false });
      }, 3000);
    }


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value} = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(form);
    }


  async function salvarProduto() {
    console.log("ss",`${process.env.NEXT_PUBLIC_API_URL}/api/produtos/`);
    const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produtos/`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${TOKEN}`, // se usar JWT
      // },
      body: JSON.stringify({
        nome: form.nome,
        preco: form.preco,
        estoque: form.estoque,
        categoria: form.categoria,
      }),
    });

    if(res.ok){
      showToast("Produto cadastrado com sucesso!", "success");
      setForm({
        nome: "",
        preco: "",
        estoque: "",
        categoria: "",
      });
    } else {
      const erro = await res.json();
      showToast("Erro ao cadastrar produto", "error");
    }
  }


  return (
    <section className="mx-auto max-w-xl">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {/* Cabeçalho */}
        <header className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Cadastro de Produto
          </h2>
          <p className="text-sm text-gray-500">
            Preencha os dados do produto para adicionar ao sistema
          </p>
        </header>

        {/* Mensagens  */}
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
         />

        {/* Formulário */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            label="Nome do produto"
            name="nome"
            placeholder="Ex: Paçoca"
            value={form.nome}
            onChange={handleChange}
          />

          <FormField
            label="Preço (R$)"
            name="preco"
            type="number"
            value={form.preco}
            onChange={handleChange}
            placeholder="Ex: 2.50"
          />

          <FormField
            label="Quantidade em estoque"
            name="estoque"
            type="number"
            value={form.estoque}
            onChange={handleChange}
            placeholder="Ex: 100"
          />

          <FormField
            label="Categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            placeholder="Ex: Doces"
          />

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="rounded-md border px-4 py-2 text-sm text-gray-600
                         hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              onClick={() => salvarProduto()}
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm
                         font-medium text-white hover:bg-blue-700"
            >
              Salvar produto
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}