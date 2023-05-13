const getAPIURL = idMatricula =>
    `https://exercicio-ppw.herokuapp.com/api/${idMatricula}`;

const getRecursos = idMatricula =>
    fetch(getAPIURL(idMatricula)).then(response => response.json());

const getRecurso = (idMatricula, idRecurso) =>
    fetch(`${getAPIURL(idMatricula)}/${idRecurso}`).then(response =>
        response.json()
    );

const postRecurso = (idMatricula, recurso) =>
    fetch(getAPIURL(idMatricula), {
        method: 'POST',
        body: JSON.stringify(recurso),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

const deleteRecurso = (idMatricula, idRecurso) =>
    fetch(`${getAPIURL(idMatricula)}/${idRecurso}`, {
        method: 'DELETE'
    }).then(response => response.json());

const tipos = {
    TOPICO: 'TOPICO',
    COMENTARIO: 'COMENTARIO'
};
