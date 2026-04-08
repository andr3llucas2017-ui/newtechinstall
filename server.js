const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/gerar-instalador', (req, res) => {
    const { ids } = req.body;

    let script = "@echo off\nTITLE Instalador NEW TECH\n";
    script += "echo ==========================================\n";
    script += "echo    INICIANDO INSTALACAO AUTOMATIZADA     \n";
    script += "echo ==========================================\n\n";

    ids.forEach(id => {
        script += `echo [INSTALANDO]: ${id}...\n`;
        // Comando Winget Silencioso
        script += `winget install -e --id ${id} --silent --accept-source-agreements --accept-package-agreements || echo Erro ao instalar ${id}\n\n`;
    });

    script += "echo ==========================================\n";
    script += "echo    PROCESSO CONCLUIDO COM SUCESSO!       \n";
    script += "echo ==========================================\n";
    script += "pause\n";

    res.setHeader('Content-Type', 'application/x-bat');
    res.setHeader('Content-Disposition', 'attachment; filename=new_tech_install.bat');
    res.send(script);
});

app.listen(3000, () => console.log('Servidor NEW TECH na porta 3000'));