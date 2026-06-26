"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analisarFoles = analisarFoles;
exports.lmhtParaHTML = lmhtParaHTML;
const foles_1 = require("@designliquido/foles");
const tradutor_1 = require("@designliquido/foles/tradutores/tradutor");
const tradutor_reverso_1 = require("@designliquido/foles/tradutores/tradutor-reverso");
const lista_modificadores_1 = __importDefault(require("@designliquido/foles/extensao/lista-modificadores"));
const importador_web_1 = require("./importador-web");
const lexador_lmht_1 = require("@designliquido/lmht-js/fontes/lexador/lexador-lmht");
const avaliador_sintatico_lmht_1 = require("@designliquido/lmht-js/fontes/avaliador-sintatico/avaliador-sintatico-lmht");
const tradutor_html_1 = require("@designliquido/lmht-js/fontes/tradutores/tradutor-html");
const mapeamento_tags_1 = require("@designliquido/lmht-js/fontes/tradutores/mapeamento-tags");
const lexador = new foles_1.Lexador();
const importador = new importador_web_1.ImportadorWeb(lexador);
const avaliadorSintatico = new foles_1.AvaliadorSintatico(importador);
const tradutor = new tradutor_1.Tradutor();
const resolvedor = new foles_1.Resolvedor();
const lexadorLmht = new lexador_lmht_1.LexadorLmht();
const avaliadorSintaticoLmht = new avaliador_sintatico_lmht_1.AvaliadorSintaticoLmht();
const tradutorHtml = new tradutor_html_1.TradutorHtml();
window.lexador = lexador;
window.importador = importador;
window.avaliadorSintatico = avaliadorSintatico;
window.tradutor = tradutor;
window.tradutorReverso = new tradutor_reverso_1.TradutorReverso();
window.resolvedor = resolvedor;
function analisarFoles(foles) {
    try {
        const resultadoLexador = lexador.mapear(foles.split('\n'));
        const declaracoes = avaliadorSintatico.analisar(resultadoLexador.simbolos);
        if (avaliadorSintatico.erros.length > 0) {
            return { css: null, erros: avaliadorSintatico.erros };
        }
        const blocos = tradutor.traduzir(declaracoes);
        const css = resolvedor.resolver(blocos);
        return { css, erros: [] };
    }
    catch (erro) {
        return { css: null, erros: [erro] };
    }
}
function lmhtParaHTML(lmht) {
    const { tokens } = lexadorLmht.mapear(lmht);
    const { arvore } = avaliadorSintaticoLmht.analisar(tokens);
    return tradutorHtml.traduzir(arvore);
}
window.analisarFoles = analisarFoles;
window.lmhtParaHTML = lmhtParaHTML;
window.listaModificadoresFoles = lista_modificadores_1.default;
window.mapeamentoTagsLmht = mapeamento_tags_1.MAPEAMENTO_TAGS;
