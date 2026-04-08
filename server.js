const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/gerar-instalador', (req, res) => {
    const { ids } = req.body;

    let script = "@echo off\n";
    script += "TITLE NEW TECH - INSTALADOR AUTOMATICO\n";
    script += "COLOR 0B\n";
    script += "echo ==================================================\n";
    script += "echo        NEW TECH - SOLUCOES EM TECNOLOGIA         \n";
    script += "echo      Instalando pacotes selecionados...          \n";
    script += "echo ==================================================\n\n";

    ids.forEach(id => {
        script += `echo [PROCESSO]: Baixando e Instalando ${id}...\n`;
        script += `winget install -e --id ${id} --silent --accept-source-agreements --accept-package-agreements\n`;
    });

    script += "\necho ==================================================\n";
    script += "echo    INSTALACAO CONCLUIDA COM SUCESSO!             \n";
    script += "echo ==================================================\n";
    script += "pause\n";

    res.setHeader('Content-Type', 'application/x-bat');
    res.setHeader('Content-Disposition', 'attachment; filename=Instalador_NEW_TECH.bat');
    res.send(script);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor NEW TECH rodando na porta ${PORT}`);
});