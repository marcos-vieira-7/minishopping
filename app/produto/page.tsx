import { getProdutos } from "@/services/produtos";


export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div style={{ padding: 24 }}>
      <h1>Produtos</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Categoria</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produtos: any) => (
            <tr key={produtos.id}>
              <td>{produtos.nome}</td>
              <td>R$ {produtos.preco}</td>
              <td>{produtos.estoque}</td>
              <td>{produtos.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}