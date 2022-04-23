# Curriculum Vitae em PDF usando o NodeJS 
## Este projeto nasceu devido a três motivos:

|<ul> <li align="justify">Preciso desenvolver projetos que tenham sentido para mim, vi a criação de um PDF de um curriculum vitae(CV) uma boa oportunidade de criar um layout e implementar os conhecimentos em HTML, CSS e NodeJs.</li><li align="justify">Poder criar um modelo para quem quiser usar ou se basear para fazer seu própio CV.</li><li align="justify"> Poder de fato usar esse CV para me candidatar em alguma  vaga de interesse. O layout deste CV foi feito em HTML e CSS, você pode ver na pasta public os arquivos index.html e style.css.</li></ul>|<img src="./CV-resultado.png" width=1300><br><sub>Resultado desta aplicação</sub>| 
| :---: | :---: | 

---

## Gerando o arquivo PDF do CV

Para geração do PDF foi usado o NodeJs com as bibliotecas: 
- express (https://www.npmjs.com/package/express)
- puppeteer-core (https://www.npmjs.com/package/puppeteer)

Para gerar o PDF do CV, vá na pasta do projeto e rode os comandos
~~~bash
cd ./src
node server.js
~~~
Com isso o servidor já está ligado, abra o navegador e acesse a porta 3000 por meio de http://localhost:3000. Se tudo tiver ocorrido bem, você conseguirar ver o CV em seu navegador. Para gerar o PDF do CV vá para  http://localhost:3000/pdf e baixe.

---
## Perspectivas Futuras

Futuramente pretendo fazer um formulário para que a pessoa possa preencher com os dados dela o PDF com o CV seja gerado para download.

---
## Detalhes de implementação
O arquivo server.js é responsável pela aplicação, abaixo segue o que cada parte deste código faz:

Chama as bibliotecas:
~~~js
const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer-core")

const app = express();
~~~

Gerar a página estática em '/' com os arquivos da pasta /src/public:

~~~js

app.use(express.static(path.join(__dirname+'/public')))
~~~

Gerar a rota '/pdf' para download do pdf (puppeteer é usado para que consigamos o PDF com o estilo aplicado via CSS):

~~~js
app.get('/pdf', async(request,response)=>{

    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()

    await page.goto("http://localhost:3000/",{
        waitUntil:'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground:true,
        format:"letter",
        margin:{
            top:"5px",
            bottom:"5px",
            left:"5px",
            right:"5px"
        }
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)
})
~~~

Coloca o servidor na porta 3000:
~~~js
app.listen(3000);
~~~

---
### Espero que este projeto seja útil para você, que você possa modificar e utilizar ele do melhor modo possível. Qualquer dúvida ou dica fale comigo via icarodiasdev@gmail.com 


