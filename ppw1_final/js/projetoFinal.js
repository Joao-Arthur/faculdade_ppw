const MATRICULA = 110683;
let totalRecursos = -1;

function topicoToDom(topico) {
    appendElementsContainer(
        document.getElementById('publicacoes'),
        createDOMElement('section'),
        [
            appendElements(createDOMElement('article'), [
                createDOMElement('p', { textContent: topico.conteudo }),
                createDOMElement('button', {
                    textContent: '\u00D7',
                    className: 'deletarTopico',
                    onclick: e =>
                        confirm('tem certeza?') &&
                        deletarTopico(e, topico.idUsuario, topico.index)
                })
            ]),
            appendElements(createDOMElement('form'), [
                createDOMElement('input', {
                    placeholder: 'Adicione um comentário...'
                }),
                createDOMElement('button', {
                    textContent: 'enviar',
                    onclick: e =>
                        adicionarComentario(
                            e,
                            topico.idUsuario,
                            topico.idTopico
                        )
                })
            ]),
            appendElements(
                createDOMElement('div', { id: topico.idTopico }),
                topico.comentarios
                    ? comentariosToTopico(topico.comentarios).flat()
                    : []
            )
        ].filter(Boolean)
    );
}

const comentariosToTopico = comentarios => {
    const comentariosPai = comentarios.filter(
        comentario => comentario.idComentarioPai === 0
    );
    const comentariosFilho = comentarios.filter(
        comentario => comentario.idComentarioPai !== 0
    );

    const appendChildren = (comentarioPai, comentarios) => {
        const filhos = comentarios.filter(
            comentario =>
                comentario.idComentarioPai === comentarioPai.idComentario
        );
        return filhos.length
            ? filhos.map(filho => {
                  const children = appendChildren(filho, comentarios);

                  console.log(children);
                  return appendElements(
                      comentariosToDom([comentarioPai])[0],
                      Array.isArray(children) ? children : [children]
                  );
              })
            : comentariosToDom([comentarioPai])[0];
    };

    return comentariosPai.map(comentarioPai =>
        appendChildren(comentarioPai, comentariosFilho)
    );
};

const comentariosToDom = comentarios =>
    comentarios.map(comentario =>
        appendElements(
            createDOMElement('section', {
                className: 'comentario',
                id: comentario.idComentario
            }),
            [
                createDOMElement('p', {
                    textContent: new Date(
                        comentario.idComentario
                    ).toLocaleString(),
                    className: 'informacoes'
                }),
                createDOMElement('p', {
                    textContent: comentario.conteudo
                }),
                appendElements(
                    createDOMElement('form', {
                        onsubmit: e =>
                            adicionarComentario(
                                e,
                                comentario.idUsuario,
                                comentario.idTopico,
                                comentario.idComentario
                            )
                    }),
                    [
                        createDOMElement('input', {
                            placeholder: 'responder'
                        }),
                        createDOMElement('button', {
                            textContent: 'responder'
                        })
                    ]
                )
            ]
        )
    );

const adicionarTopico = e => {
    e && e.preventDefault();
    const topicoDOM = document.getElementById('topico');
    const topicoValue = topicoDOM.value;
    topicoDOM.value = '';
    if (!topicoValue.trim()) return;
    const topico = Topico(110683, topicoValue);
    postRecurso(110683, topico).then(() => {
        totalRecursos++;
        topico.index = totalRecursos;
        topicoToDom(topico);
    });
};

const adicionarComentario = (e, idUsuario, idRecurso, idComentarioPai = 0) => {
    e && e.preventDefault();
    const comentarioDOM = e.target.parentNode.getElementsByTagName('input')[0];
    const comentarioValue = comentarioDOM.value;
    comentarioDOM.value = '';
    if (!comentarioValue.trim()) return;
    const comentario = Comentario(
        idUsuario,
        idRecurso,
        idComentarioPai,
        comentarioValue
    );
    postRecurso(idUsuario, comentario).then(() => {
        totalRecursos++;
        comentario.index = totalRecursos;
        idComentarioPai
            ? appendElements(
                  document.getElementById(comentario.idComentarioPai),
                  comentariosToDom([comentario])
              )
            : appendElements(
                  document.getElementById(comentario.idTopico),
                  comentariosToDom([comentario])
              );
    });
};

const deletarTopico = (e, idUsuario, idRecurso) => {
    const topicoDeletado = e.target.parentNode.parentNode;
    deleteRecurso(idUsuario, idRecurso).then(() => topicoDeletado.remove());
};

function listaRecursos() {
    getRecursos(110683).then(recursos => {
        recursos = recursos.map((recurso, index) => {
            recurso.index = index;
            return recurso;
        });
        totalRecursos = recursos.length - 1;
        const topicos = recursos.filter(
            recurso => recurso.tipoRecurso === tipos.TOPICO
        );
        const comentarios = recursos.filter(
            recurso => recurso.tipoRecurso === tipos.COMENTARIO
        );
        topicos
            .map(topico => {
                topico.comentarios = comentarios.filter(
                    comentario => comentario.idTopico === topico.idTopico
                );
                return topico;
            })
            .forEach(topicoToDom);
    });
}

listaRecursos();

document
    .getElementById('formulario')
    .addEventListener('submit', adicionarTopico);

let scrollTimeout;

window.onscroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const headerDOM = document.querySelector('header');
        if (headerDOM.className === 'headerScroll') {
            if (
                document.body.scrollTop + 45 < 70 &&
                document.documentElement.scrollTop + 45 < 70
            )
                headerDOM.className = '';
        } else {
            if (
                document.body.scrollTop - 45 >= 70 ||
                document.documentElement.scrollTop - 45 >= 70
            )
                headerDOM.className = 'headerScroll';
        }
    }, 100);
};
