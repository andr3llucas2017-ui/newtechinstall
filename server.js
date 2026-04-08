const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/gerar-instalador', (req, res) => {
    const { ids } = req.body;

    // Script profissional otimizado para o Winget
    let script = "@echo off\n";
    script += "TITLE INSTALADOR AUTOMATICO - NEW TECH\n";
    script += "COLOR 0B\n"; // Cor azul claro para um visual tech
    script += "echo ==================================================\n";
    script += "echo        NEW TECH - SOLUCOES EM TECNOLOGIA         \n";
    script += "echo      Instalando pacotes selecionados...          \n";
    script += "echo ==================================================\n\n";

    ids.forEach(id => {
        script += `echo [+] Instalando: ${id}...\n`;
        // --silent: sem janelas de confirmação | --accept-source-agreements: aceita termos da MS
        script += `winget install -e --id ${id} --silent --accept-source-agreements --accept-package-agreements\n`;
    });

    script += "\necho ==================================================\n";
    script += "echo    PROCESSO CONCLUIDO! REINICIE SE NECESSARIO.   \n";
    script += "echo ==================================================\n";
    script += "pause\n";

    // Headers de Download
    res.setHeader('Content-Type', 'application/x-bat');
    res.setHeader('Content-Disposition', 'attachment; filename=NEW_TECH_Installer.bat');
    res.send(script);
});

// Porta dinâmica para o Render (fundamental para não dar erro de deploy)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend NEW TECH rodando na porta ${PORT}`);
});