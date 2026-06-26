import { Lexador, AvaliadorSintatico, Resolvedor } from "@designliquido/foles";
import { Tradutor } from "@designliquido/foles/tradutores/tradutor";
import { TradutorReverso } from "@designliquido/foles/tradutores/tradutor-reverso";
import listaModificadoresFoles from "@designliquido/foles/extensao/lista-modificadores";
import { ImportadorWeb } from "./importador-web";
import { LexadorLmht } from "@designliquido/lmht-js/fontes/lexador/lexador-lmht";
import { AvaliadorSintaticoLmht } from "@designliquido/lmht-js/fontes/avaliador-sintatico/avaliador-sintatico-lmht";
import { TradutorHtml } from "@designliquido/lmht-js/fontes/tradutores/tradutor-html";
import { MAPEAMENTO_TAGS } from "@designliquido/lmht-js/fontes/tradutores/mapeamento-tags";

const lexador = new Lexador();
const importador = new ImportadorWeb(lexador);
const avaliadorSintatico = new AvaliadorSintatico(importador);
const tradutor = new Tradutor();
const resolvedor = new Resolvedor();

const lexadorLmht = new LexadorLmht();
const avaliadorSintaticoLmht = new AvaliadorSintaticoLmht();
const tradutorHtml = new TradutorHtml();

(window as any).lexador = lexador;
(window as any).importador = importador;
(window as any).avaliadorSintatico = avaliadorSintatico;
(window as any).tradutor = tradutor;
(window as any).tradutorReverso = new TradutorReverso();
(window as any).resolvedor = resolvedor;

export function analisarFoles(foles: string): { css: string | null, erros: any[] } {
  try {
    const resultadoLexador = lexador.mapear(foles.split('\n'));
    const declaracoes = avaliadorSintatico.analisar(resultadoLexador.simbolos);
    if (avaliadorSintatico.erros.length > 0) {
      return { css: null, erros: avaliadorSintatico.erros };
    }
    const blocos = tradutor.traduzir(declaracoes);
    const css = resolvedor.resolver(blocos);
    return { css, erros: [] };
  } catch (erro: any) {
    return { css: null, erros: [erro] };
  }
}

export function lmhtParaHTML(lmht: string): string {
  const { tokens } = lexadorLmht.mapear(lmht);
  const { arvore } = avaliadorSintaticoLmht.analisar(tokens);
  return tradutorHtml.traduzir(arvore);
}

(window as any).analisarFoles = analisarFoles;
(window as any).lmhtParaHTML = lmhtParaHTML;
(window as any).listaModificadoresFoles = listaModificadoresFoles;
(window as any).mapeamentoTagsLmht = MAPEAMENTO_TAGS;
