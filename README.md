
# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Seguros mútuos com Smart Contracts via Blockchain

## P2Chain

- <a href="https://www.linkedin.com/in/gabriela-de-morais-da-silva-467b29238/">Gabriela de Morais da Silva	</a>
- <a href="https://www.linkedin.com/in/lucas-britto-376665208/">Lucas de Britto Vieira	</a>
- <a href="https://www.linkedin.com/in/gutopompeo/">Luiz Augusto Pompeo de Camargo Franco Ferreira	</a>
- <a href="https://www.linkedin.com/in/raduanmuarrek/">Raduan Oliveira Galli Muarrek	</a>
- <a href="https://www.linkedin.com/in/sophia-dias/">Sophia Mello Dias	</a>
- <a href="https://www.linkedin.com/in/vitor-moura-de-oliveira/">Vitor Moura de Oliveira	</a>

## 📝 Descrição da solução 

Uma solução em blockchain Ethereum foi proposta para criar grupos de seguro mútuo eficientes, baratos e seguros. Os grupos são formados por pessoas que se unem para se proteger contra riscos predeterminados e são autoadministrados em certa medida. A administração do grupo é feita através de smart contracts que executam automaticamente as condições acordadas pelas partes. Todas as regras de negócio e reservas financeiras são mantidas no contrato inteligente. Os usuários interagem com o sistema por meio de uma aplicação em Web 3, que inclui uma área do cliente para adesão, pagamento e pedido de indenização, e uma área da seguradora P2P para configuração e criação de novos grupos e atuação no processo de indenização. A seguradora apenas opera os grupos mútuos e não assume o risco como é feito no seguro privado.

## 📁 Estrutura de pastas


|--> documentos<br>
  &emsp;| --> outros <br>
  &emsp;| DocumentaçãoProjetoModulo5.docx.pdf<br>
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|--> Frontend<br>
  &emsp;|--> Smart_Contracts<br>
| readme.md<br>


Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

readme.md: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

documentos: aqui estão todos os documentos do projeto. Há também uma pasta denominada outros onde estão presentes outros documentos complementares.

src: todo o código fonte criado para o desenvolvimento do projeto, incluindo o Smart Contract, backend e frontend.

## 💻 Smart Contract 
A administração do grupo será realizada através de smart contracts, que são programas que se executam de forma automática assim que certas condições acordadas previamente pelas partes são atendidas. Nesse sentido, todas as regras de negócio e as reservas financeiras serão mantidas neste contrato inteligente. 

## Requisitos de negócio:
No smart contract seguimos as seguintes regras de negócio em nosso código;
- Regra de negócio 1: A Coover é definida como dona e administradora do contrato, devendo estabelecer os membros deste e seus IMEIs dos aparelhos protegidos, assim como a taxa administrativa.
- Regra de negócio 2: os membros, no deploy do contrato, devem realizar um pagamento inicial.
- Regra de negócio 3: a Coover deve aprovar a indenização de um segurado e, a partir disso, é informado a carteira dele. O hash do segurado em que o sinistro ocorreu deve ser igual ao que está armazenado no contrato de sua carteira para que seja concretizado
- Regra de negócio 4: A Coover pode retirar a taxa administrativa a qualquer momento.
- Regra de negócio 5: O cliente deve conseguir ver seu valor de resera para conferir o valor protegido do seguro.
- Regra de negócio 6: O cliente deve conseguir repor sua reserva..

## Diagrama de Blocos

O diagrama de blocos da solução quebra o projeto em partes menores e mais gerenciáveis, representadas por blocos ou módulos. Isso ajuda na compreensão da estrutura e dos componentes da solução por meio de uma representação visual simplificada.

![image](https://user-images.githubusercontent.com/99191909/221442612-d2bd7a19-c809-4e34-a877-6a1aa04d8382.png)

Na solução proposta há dois atores que interagem com o sistema, sendo estes, a seguradora P2P (representada pela Coover) e o participante (cliente do seguro). Essa interação dos usuários acontece através do Front end, onde se encontra a lógica da interface, além disso para acessar as funcionalidades da aplicação é necessário se conectar a Metamask,  pois para realizar determinadas ações será necessário “assiná-la” (confirmar) usando a chave privada. 

No bloco Backend, há o sistema de dados da Coover, onde são armazenados dados pessoais de seus clientes,  que não podem ser publicados no smart contract, mas são necessários para definir a lógica de negócios do software. Por fim, a seguradora P2P (administradora) realiza o deploy do contrato (smart contract) na Ethereum Testenet, blockchain alternativa do Ethereum para testes globais. Nesse smar contract estará armazenado os fundos dos grupos mútuos e todas as regras de negócio, tais como a de pagamento de indenização. 

## UML
Para entendermos de maneira visual como atender as 6 regras de negócios, temos as seguintes matrizes UML:

![image](https://user-images.githubusercontent.com/99191909/221442840-efe982bc-8985-4a2e-b536-8ada9e01f71b.png)
Para a indenização, entendemos primeiro no âmbito de negócios. O usuário somente irá fazer essa ação quando ele for roubado e quiser requisitar a indenização. 
Nesse caso, teremos uma primeira fase de cadastro completo na MetaMask com login e autenticação. Posteriormente ele irá localizar seu celular no na testnet através do nosso front-end utilizando o IMEI. Esses são os passos necessários para o usuário encontrar e informar os dados pré requisitados. 
Após isso temos o passo da requisição em si, em que o usuário enviará o B.O. para o front end que repassa para a seguradora, se tivermos um aceite (após uma análise do documento da mesma), é requisitado no smart contract que envie o dinheiro da indenização até a carteira do usuário.

![image](https://user-images.githubusercontent.com/99191909/221442873-bee14ee5-9eb9-4117-9709-f02dce52f428.png)
Para a indenização, entendemos primeiro no âmbito de negócios. O usuário somente irá fazer essa ação quando ele for roubado e quiser requisitar a indenização. 
Nesse caso, teremos uma primeira fase de cadastro completo na MetaMask com login e autenticação. Posteriormente ele irá localizar seu celular no na testnet através do nosso front-end utilizando o IMEI. Esses são os passos necessários para o usuário encontrar e informar os dados pré requisitados. 
Após isso temos o passo da requisição em si, em que o usuário enviará o B.O. para o front end que repassa para a seguradora, se tivermos não tiver o aceite (após uma análise do documento da mesma), o usuário será notificado através do frontend.

![image](https://user-images.githubusercontent.com/99191909/221442894-34149d9c-e346-44f5-b74a-b500e8c253a1.png)
Para a reposição de reserva de risco, entendemos primeiro no âmbito de negócios. Nessa prova de conceito, o usuário poderá repor uma vez que um cliente dentro do grupo do seguro for roubado e teve sua indenização aceita.
Nesse caso, o cliente poderá depositar dinheiro em sua metamask e logo em seguida transferir para o blockchain, atualizando assim seu montante financeiro dentro das regras do smart contract.
Após isso o front end irá informar ao cliente que o saldo foi atualizado.

![image](https://user-images.githubusercontent.com/99191909/221442908-b5061f90-6310-4b9c-8f57-f40b262708b1.png)
Para a criação de smart contract, entendemos primeiro no âmbito de negócios. Partiremos do princípio que será uma atividade administrativa e que nesse caso, a criadora seria a Coover.
O processo de criação começa com a criadora informando como será o seguro tanto de maneira técnica (ou seja criando o código do contrato) como também comercial, informando no front end como ela será, além de fazer a integração entre o smart contract específico e a página web.
Após isso, ela parte para encontrar e atrair usuários para o grupo de seguro, alocando eles para o contrato, conseguindo assim termos uma pré ativação do contrato, que é informado ao criador.
Depois desses pré-requisitos, o grupo P2P é confirmado pela seguradora que ativa o contrato, e logo em seguida faz o deploy na rede do ethereum, mas a fim de executar uma prova de conceito, será na test net.





## 🗃 Histórico de lançamentos

* 0.2.1 - 07/04/2023
    * Quinta entrega - Entrega Final
* 0.2.0 - 24/03/2023
    * Quarta entrega - 
* 0.1.1 - 10/03/2023
    * Terceira entrega - 
* 0.1.0 - 24/02/2023
    * Segunda entrega - Mockup e Smart Contract
* 0.0.1 - 10/02/2023
    * Primeira entrega - Modelo de negócios e arquitetura da solução

## 📋 Licença/License
<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2023M5T4-Inteli/Projeto4">P2Chain  <a> by </a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/InteliProjects/.github/blob/main/profile/README.md">Inteli, <a href="https://www.linkedin.com/in/gabriela-de-morais-da-silva-467b29238/">Gabriela de Morais da Silva	</a>, <a href="https://www.linkedin.com/in/lucas-britto-376665208/">Lucas de Britto Vieira	</a>, <a href="https://www.linkedin.com/in/gutopompeo/">Luiz Augusto Pompeo de Camargo Franco Ferreira	</a>, <a href="https://www.linkedin.com/in/raduanmuarrek/">Raduan Oliveira Galli Muarrek	</a>, <a href="https://www.linkedin.com/in/sophia-dias/">Sophia Mello Dias	</a>, <a href="https://www.linkedin.com/in/vitor-moura-de-oliveira/">Vitor Moura de Oliveira	</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
