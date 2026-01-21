import ProdutosClient from "./ProdutosClient";
import { apiFetch } from "@/lib/api";

export default async function ProdutosPage() {
  const res = await apiFetch("http://localhost:8000/api/produtos/", {
    cache: "no-store",
  });

  const produtos = await res.json();

  return (
    <ProdutosClient produtos={produtos} />
  );
}
