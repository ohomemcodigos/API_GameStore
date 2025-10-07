import { Request, Response } from 'express';
import { prisma } from '../index';

/* -- Montando o purchaseRoutes -- */

// POST
// Nova compra
export const createPurchase = async (req: Request, res: Response) => {
    try {
        const { userId, gameId } = req.body;
        
        // Validação básica dos IDs
        if ( !userId || !gameId ) {
            return res.status(400).json({ error: "O userId e o gameId são obrigatórios." });
        }

        // Chaves estrangeiras
        const newPurchase = await prisma.purchase.create({
            data: {
                userId : userId,
                gameId : gameId,
            }
        });
        res.status(201).json(newPurchase); // Sucesso!
    } catch (error) {
        // O erro (P2003) acontece caso usar um userId ou gameId que não existe.
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === "P2003") {
            res.status(404).json({ error: "Usuário ou Jogo não encontrado."})
        }
        res.status(500).json({ error: "Erro ao realizar uma compra." }); //Falha...
    }
};

// GET
// Todas as compras de um usuário
export const getUserPurchases = async (req: Request, res: Response) => {
    try{
        const { userId } = req.params; // Pega o ID que vier da URL
        const purchases = await prisma.purchase.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                game: true, // Pega todos os dados do jogo relacionado
                user: { // Pega apenas dados específicos do usuário
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
        // Caso o user não tenha realizado compras, será retornado um array vazio
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: "Não foi possível buscar as compras."})
    }
}