const Topico = (idUsuario, conteudo) =>
    Object.freeze({
        tipoRecurso: tipos.TOPICO,
        idTopico: new Date().valueOf(),
        idUsuario,
        conteudo
    });
