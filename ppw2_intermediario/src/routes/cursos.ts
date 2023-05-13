import express from 'express';
import parser from 'node-html-parser';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', (req, res) => {
    const curso = req.query.curso?.toString();

    fetch('http://matriculas.unesc.net/graduacao')
        .then(resposta => resposta.text())
        .then(resposta => {
            const DOMCursos = parser(resposta).querySelectorAll('.curso__item');
            const timestamp = Date.now();

            const cursos = DOMCursos.map(DOMCurso => ({
                nome: DOMCurso['_attrs']['data-title'],
                tipo: DOMCurso['_attrs']['data-type'],
                timestamp
            })).filter(
                ({ nome }) =>
                    !curso || nome.toLowerCase().includes(curso.toLowerCase())
            );

            res.send(cursos);
        });
});

export default router;
