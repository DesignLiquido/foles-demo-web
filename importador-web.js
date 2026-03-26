"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportadorWeb = void 0;
/**
 * Por ora, este importador supõe que apenas um arquivo FolEs é aberto de cada vez
 * no editor web, então não há necessidade de implementar a lógica de importação real.
 */
class ImportadorWeb {
    constructor(lexador) {
        this.lexador = lexador;
    }
    importar(caminhoRelativoArquivo, importacaoInicial) {
        throw new Error("Método não implementado.");
    }
}
exports.ImportadorWeb = ImportadorWeb;
