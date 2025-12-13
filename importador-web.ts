import { ImportadorInterface, LexadorInterface, ResultadoLexadorInterface } from "@designliquido/foles/interfaces";

/**
 * Por ora, este importador supõe que apenas um arquivo FolEs é aberto de cada vez
 * no editor web, então não há necessidade de implementar a lógica de importação real.
 */
export class ImportadorWeb implements ImportadorInterface{
    lexador: LexadorInterface;

    constructor(lexador: LexadorInterface) {
        this.lexador = lexador;
    }

    importar(caminhoRelativoArquivo: string, importacaoInicial: boolean): [string[], ResultadoLexadorInterface] {
        throw new Error("Método não implementado.");
    }
}