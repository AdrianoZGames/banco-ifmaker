import { Request, Response } from 'express'
import { criarConexao } from '../database'
//import { Item } from '../models/Itens'
//listar itens
async function getItens(req: Request, res: Response) {
    const banco = await criarConexao() // responsavel pela conexão com o banco
    const consulta = "SELECT * from itens";
    const result = await banco.query(consulta);

    banco.end() //encerra conexão
    
    res.send(result[0]);
}
//inserir itens
async function criarItens(req: Request, res: Response) {
    const banco = await criarConexao() // responsavel pela conexão com o banco
    const consulta = "INSERT INTO itens VALUES (id, nome, disponivel, `data-de-aquisicao`)"
    const result = await banco.query(consulta,[req.body.id,req.body.nome,req.body.disponivel,req.body.DataDeAquisicao]);
    banco.end();
    res.send(result[0]); 
}
//alterar itens
async function atualizarItens(req: Request, res: Response) {
    const banco = await criarConexao() // responsavel pela conexão com o banco
    const consulta = 
        "UPDATE itens SET id = ?, nome = ?, disponivel = ?, data-de-aquisicao WHERE id = ?";
    const result = await banco.query(consulta,[req.body.id,req.body.nome,req.body.disponivel,req.body.DataDeAquisicao,req.params.id]);
    banco.end();
    res.send(result[0]);
}
//excluir itens
async function apagarItens(req: Request, res: Response) {
    const banco = await criarConexao() // responsavel pela conexão com o banco
    const consulta = "DELETE FROM itens WHERE id = ?";
    const result = await banco.query(consulta,[req.params.id]);
    banco.end();
    res.send(result[0]);
}

export { getItens, criarItens, atualizarItens, apagarItens }