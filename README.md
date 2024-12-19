<h1 align="center"> Testes E2E com Cypress - Sauce demo</h1>
Este repositório contém os testes automatizados em cypress do e-commerce SAUCE DEMO, contemplando parte dos conhecimentos adquiridos nos últimos meses, e também utilização de boas práticas. 

<h2>Setup</h2>
<h3>Pré-requisitos</h3>
> Node.js instalado (Utilizei a versão `v20.11.1` )<br/>
> IDE instalada (utilizei o Visual Studio Code)<br/>

<h3>Instalação</h3>
> Instalar as dependências configuradas do package.json, usando o comando: 

```bash
npm install
```
<h3>Execução dos testes</h3>
Para execução dos testes no modo iterativo:

```bash
npm run cy:open
```
Para execução dos testes no modo headless:

```bash
npm run cy:run
```
Para execução dos testes em modo mobile:

```bash
cy:open:mobile
```
<h2>Conhecimentos aplicados</h2>
- Design de testes e boas práticas <br>
- Comandos customizados <br>
- Configuração do github actions <br>
- Configuração de report do Cypress cloud <br>
- Configuração de viewPortHeigth e viewportWidth<br>
- Uso de hook (beforeEach) <br>
- Seletores CSS <br>
- Configuração de dados sensíveis (Não adicionamos no gitignore )<br>



<h2>Report:</h2> 

[Cypress Cloud](https://cloud.cypress.io/projects/2n1o8a/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&tagsMatch=ANY&timeRange=%7B%22startDate%22%3A%222023-12-20%22%2C%22endDate%22%3A%222024-12-19%22%7D)
 

 Este projeto foi criado por [Renan Dias](https://www.linkedin.com/in/diasrenan1994/).