import { Router } from 'express';
import { createPurchase, getUserPurchases } from '../controllers/purchaseController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: API para gerenciamento de compras
 */

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Registra uma nova compra
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - gameId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário que está comprando
 *               gameId:
 *                 type: integer
 *                 description: ID do jogo que está sendo comprado
 *     responses:
 *       201:
 *         description: Compra registrada com sucesso
 *       404:
 *         description: Usuário ou Jogo não encontrado
 */
router.post('/', createPurchase);

/**
 * @swagger
 * /api/purchases/user/{userId}:
 *   get:
 *     summary: Retorna o histórico de compras de um usuário
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do usuário
 *     responses:
 *       200:
 *         description: Histórico de compras retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   purchaseId:
 *                     type: integer
 *                     description: ID da compra
 *                   gameId:
 *                     type: integer
 *                     description: ID do jogo comprado
 *                   gameTitle:
 *                     type: string
 *                     description: Título do jogo
 *                   purchaseDate:
 *                     type: string
 *                     format: date-time
 *                     description: Data da compra
 *       404:
 *         description: Usuário não encontrado ou sem compras registradas
 */
router.get('/user/:userId', getUserPurchases);

export default router;