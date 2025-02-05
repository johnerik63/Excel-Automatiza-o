const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configuração do armazenamento do multer
const storage = multer.memoryStorage(); // Armazenamento na memória, sem salvar no disco
const upload = multer({ storage: storage });

// Serve a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para processar os arquivos e preparar para o download
app.post('/upload', upload.array('files', 2), (req, res) => {
  if (req.files && req.files.length === 2) {
    const file1 = req.files[0]; // Primeiro arquivo (Connectly)
    const file2 = req.files[1]; // Segundo arquivo (Pintado)

    // Aqui você pode processar os arquivos como antes, mas agora, vamos preparar o download
    // Salvar temporariamente os arquivos no servidor para enviar para o cliente
    const resultadoFileName = 'resultado.xlsx';
    
    // Processamento dos arquivos - substitua esta parte pela lógica que você precisa
    // No seu caso, você vai aplicar a lógica de comparação e formatação

    // Para o exemplo, vamos simular que criamos o arquivo "resultado.xlsx"
    fs.writeFileSync(resultadoFileName, 'Conteúdo simulado do arquivo Excel'); // Simula a criação do arquivo Excel

    // Agora, o arquivo é enviado para o navegador
    res.download(resultadoFileName, (err) => {
      if (err) {
        console.log('Erro ao enviar arquivo para download', err);
      }

      // Remover o arquivo temporário após o download
      fs.unlinkSync(resultadoFileName);
    });
  } else {
    res.status(400).send('Por favor, envie dois arquivos.');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
