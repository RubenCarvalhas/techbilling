// Importando os pacotes necessários
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para ler JSON no corpo da requisição
app.use(bodyParser.json());

// Endpoint para salvar os requisitos
app.post('/api/save-requirements', (req, res) => {
  const requirements = req.body;

  // Verificar se os dados foram enviados
  if (!requirements || requirements.length === 0) {
    return res.status(400).send("Nenhum dado fornecido.");
  }

  // Salvar os dados em um arquivo JSON
  fs.writeFile('requirements.json', JSON.stringify(requirements, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Erro ao salvar os dados no arquivo.");
    }
    res.status(200).send("Dados salvos com sucesso.");
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
