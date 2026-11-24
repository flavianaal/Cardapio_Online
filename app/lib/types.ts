

export interface Pizza{
    id: number,
    nome: string,
    descricao: string,
    ativo:boolean,
    caminhoImagem: string,
    ingredientes: Ingrediente[],
    itens: Item[]

}

export interface Ingrediente{

    id:number,
    nome: string,
    ativo:boolean,
    caminhoImagem:string,
}

export interface Item{
    id: number,
    tamanho: string,
    valor: number,
}