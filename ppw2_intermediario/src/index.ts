import express from 'express';
import bandas from './routes/bandas';
import cursos from './routes/cursos';
import healthcheck from './routes/healthcheck';
const PORT = process.env.PORT || 8080;
const app = express();

app.use('/healthcheck', healthcheck);
app.use('/rankingbandasderock', bandas);
app.use('/cursos', cursos);
app.use('/', (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    res.send({
        rotas: {
            healthcheck: {
                queryParams: [],
                url: `${url}/healthcheck`
            },
            rankingbandasderock: {
                queryParams: ['ranking', 'cidade', 'regiao', 'ano'],
                url: `${url}/rankingbandasderock`
            },
            cursos: {
                queryParams: ['curso'],
                url: `${url}/cursos`
            }
        },
        api: {
            versao: '1.0',
            url: 'https://github.com/Joao-Arthur/Projeto_PPW2'
        },
        autor: {
            nome: 'João Arthur',
            url: 'https://github.com/Joao-Arthur/'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
