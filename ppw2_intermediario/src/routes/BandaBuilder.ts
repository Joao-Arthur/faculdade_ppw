export default class BandaBuilder {
    private nome?: string;
    private ranking?: number;
    private cidadeDeOrigem?: string;
    private regiaoDeOrigem?: string;
    private anoDeOrigem?: number;
    private albumMaisPopular?: string;
    private discosVendidosNosEUA?: number;
    private visualizacoesAnuaisNaWikipedia?: number;

    setNome(nome: string) {
        this.nome = nome;
        return this;
    }

    setRanking(ranking: number) {
        this.ranking = ranking;
        return this;
    }

    setOrigem(origem: string) {
        const [cidadeDeOrigem, regiaoDeOrigem, anoDeOrigem] = origem
            .replace('early', '')
            .split(/, | in /);
        this.cidadeDeOrigem = cidadeDeOrigem;
        this.regiaoDeOrigem = regiaoDeOrigem;
        this.anoDeOrigem = parseInt(anoDeOrigem, 10);
        return this;
    }

    setDiscosVendidosNosEUA(discosVendidosNosEUA: string) {
        this.discosVendidosNosEUA = parseFloat(discosVendidosNosEUA) * 1000000;
        return this;
    }

    setAlbumMaisPopular(albumMaisPopular: string) {
        this.albumMaisPopular = albumMaisPopular;
        return this;
    }

    setVisualizacoesAnuaisNaWikipedia(visualizacoesAnuaisNaWikipedia: string) {
        this.visualizacoesAnuaisNaWikipedia = Number(
            visualizacoesAnuaisNaWikipedia.replace(/,/g, '')
        );
        return this;
    }

    build() {
        return {
            nome: this.nome,
            ranking: this.ranking,
            cidadeDeOrigem: this.cidadeDeOrigem,
            regiaoDeOrigem: this.regiaoDeOrigem,
            anoDeOrigem: this.anoDeOrigem,
            discosVendidosNosEUA: this.discosVendidosNosEUA,
            albumMaisPopular: this.albumMaisPopular,
            visualizacoesAnuaisNaWikipedia: this.visualizacoesAnuaisNaWikipedia,
            timestamp: Date.now()
        };
    }
}
