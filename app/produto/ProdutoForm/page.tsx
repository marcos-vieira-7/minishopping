
import FormField from "@/app/components/FormField/page";


export default function ProdutoForm() {

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

        {/* Formulário */}
        <form className="space-y-4">
          <FormField
            label="Nome do produto"
            name="nome"
            placeholder="Ex: Paçoca"
          />

          <FormField
            label="Preço (R$)"
            name="preco"
            type="number"
            placeholder="Ex: 2.50"
          />

          <FormField
            label="Quantidade em estoque"
            name="estoque"
            type="number"
            placeholder="Ex: 100"
          />

          <FormField
            label="Categoria"
            name="categoria"
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