
export async function getProdutos() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}