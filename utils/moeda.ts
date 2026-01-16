

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

export { formatarReal };