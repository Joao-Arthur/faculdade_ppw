import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    res.send({
        routes: {
            [`${url}/healthcheck`]: ['GET'],
            [`${url}/band`]: ['GET', 'POST', 'PUT'],
            [`${url}/band/:id`]: ['GET', 'DELETE'],
            [`${url}/album`]: ['GET', 'POST', 'PUT'],
            [`${url}/album/:id`]: ['GET', 'DELETE'],
            [`${url}/user`]: ['POST'],
            [`${url}/user/login`]: ['POST']
        },
        API: {
            version: '1.0',
            github: 'https://github.com/Joao-Arthur/Faculdade-PPW2-ProjetoFinal',
            about: 'More details about the API on the README file'
        },
        author: {
            name: 'João Arthur',
            github: 'https://github.com/Joao-Arthur/'
        }
    });
});

export default router;
