import { Lexador, AvaliadorSintatico } from "@designliquido/foles";
import { Tradutor } from "@designliquido/foles/tradutores/tradutor";
import { TradutorReverso } from "@designliquido/foles/tradutores/tradutor-reverso";
import { ImportadorWeb } from "./importador-web";

(window as any).lexador = new Lexador();
(window as any).importador = new ImportadorWeb((window as any).lexador);
(window as any).avaliadorSintatico = new AvaliadorSintatico((window as any).importador);
(window as any).tradutor = new Tradutor();
(window as any).tradutorReverso = new TradutorReverso();

export function folesParaCSS(foles: string): string {
  const traducoes = {
    // Propriedades
    "tamanho-fonte": "font-size",
    margem: "margin",
    preenchimento: "padding",
    fundo: "background",
    cor: "color",
    borda: "border",
    "borda-arredondamento": "border-radius",
    "margem-inferior": "margin-bottom",
    "margem-superior": "margin-top",
    "familia-fonte": "font-family",
    exibição: "display",
    espaçamento: "gap",
    "decoração-texto": "text-decoration",
    "peso-fonte": "font-weight",
    transição: "transition",
    opacidade: "opacity",
    "sombra-caixa": "box-shadow",
    "altura-linha": "line-height",
    cursor: "cursor",
    "alinhamento-texto": "text-align",

    // Valores
    nenhum: "none",
    negrito: "bold",
    ponteiro: "pointer",
    centro: "center",

    // Tags
    lmht: "html",
    corpo: "body",
    cabeçalho: "header",
    navegação: "nav",
    ligacao: "a",
    principal: "main",
    seção: "section",
    botao: "button",
    rodape: "footer",
  };

  let css = foles;
  for (const [pt, en] of Object.entries(traducoes)) {
    const regex = new RegExp("\\b" + pt + "\\b", "g");
    css = css.replace(regex, en);
  }

  return css;
}

export function lmhtParaHTML(lmht: string): string {
  const traducoes = {
    "<lmht>": "<html>",
    "</lmht>": "</html>",
    "<cabeça>": "<head>",
    "</cabeça>": "</head>",
    "<corpo>": "<body>",
    "</corpo>": "</body>",
    "<cabeçalho": "<header",
    "</cabeçalho>": "</header>",
    "<titulo>": "<title>",
    "</titulo>": "</title>",
    "<titulo1": "<h1",
    "</titulo1>": "</h1>",
    "<titulo2": "<h2",
    "</titulo2>": "</h2>",
    "<navegação": "<nav",
    "</navegação>": "</nav>",
    "<ligacao": "<a",
    "</ligacao>": "</a>",
    "<principal": "<main",
    "</principal>": "</main>",
    "<seção": "<section",
    "</seção>": "</section>",
    "<botao": "<button",
    "</botao>": "</button>",
    "<rodape": "<footer",
    "</rodape>": "</footer>",
    "classe=": "class=",
    "destino=": "href=",
  };

  let html = lmht;
  for (const [pt, en] of Object.entries(traducoes)) {
    html = html.split(pt).join(en);
  }

  return html;
}
