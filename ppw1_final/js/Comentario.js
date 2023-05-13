const Comentario = (idUsuario, idTopico, idComentarioPai, conteudo) =>
    Object.freeze({
        tipoRecurso: tipos.COMENTARIO,
        idTopico,
        idComentario: new Date().valueOf(),
        idComentarioPai,
        idUsuario,
        conteudo
    });
