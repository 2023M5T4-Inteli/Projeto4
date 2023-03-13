const express =require("express");
const { randomUID } = require("crypto")

const app = express();

app.use(express.json());

const products = [];


/**
 * POST => inserir um dado
 * GET +> buscar um/mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
     * Body => sempre que quiser enviar dados para a aplicação
     * Params => parâmetro de rota
     * Query => fazem parte da rota mas não são obrigatórios
     */

app.post("/products", (request, response) => {

    const { name, price } = request.body;

    const products={
        name, 
        price,
        id: randomUID(),
    }

    products.push(products);

    console.log(body);
});

app.listen(4002, () => console.log("servidor esta rodando na porta 4002"));