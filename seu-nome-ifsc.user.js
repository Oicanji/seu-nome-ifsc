// ==UserScript==
// @name         seu-nome-ifsc
// @namespace    https://ifsc.edu.br/aulas
// @version      1.1.0
// @description  Exibe no SIGAA o nome pelo qual a pessoa é reconhecida (apenas na sua tela)
// @author       Ignacio
// @match        https://sig.ifsc.edu.br/sigaa/*
// @icon         https://sig.ifsc.edu.br/sigaa/favicon.ico
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  const SUBSTITUICOES = [
    { de: "ARTHUR FRANCO DOS SANTOS", para: "FERNANDA CRISTINA FRANCO" },
    { de: "KAUE MARTINS FARIAS", para: "KAMI MARTINS FARIAS" },
  ];

  const DEBOUNCE_MS = 300;
  const ATTRS_TEXTO = ["title", "alt", "value", "placeholder", "aria-label"];

  let debounceTimer = null;
  let aplicando = false;

  function contemAlgumNome(texto) {
    if (typeof texto !== "string") return false;
    return SUBSTITUICOES.some((s) => texto.includes(s.de));
  }

  function trocarTexto(texto) {
    if (!contemAlgumNome(texto)) return texto;
    let resultado = texto;
    for (const { de, para } of SUBSTITUICOES) {
      if (resultado.includes(de)) {
        resultado = resultado.split(de).join(para);
      }
    }
    return resultado;
  }

  function substituirNosDeTexto(raiz) {
    if (!raiz) return;

    const walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const pai = node.parentElement;
        if (!pai) return NodeFilter.FILTER_REJECT;
        const tag = pai.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
          return NodeFilter.FILTER_REJECT;
        }
        return contemAlgumNome(node.nodeValue)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });

    let no;
    while ((no = walker.nextNode())) {
      no.nodeValue = trocarTexto(no.nodeValue);
    }
  }

  function substituirAtributos(raiz) {
    if (!raiz || !raiz.querySelectorAll) return;

    for (const el of raiz.querySelectorAll("*")) {
      for (const attr of ATTRS_TEXTO) {
        if (!el.hasAttribute(attr)) continue;
        const valor = el.getAttribute(attr);
        if (!contemAlgumNome(valor)) continue;
        el.setAttribute(attr, trocarTexto(valor));
      }
    }
  }

  function substituirCamposFormulario(raiz) {
    if (!raiz || !raiz.querySelectorAll) return;

    raiz.querySelectorAll("input, textarea").forEach((el) => {
      if (contemAlgumNome(el.value)) {
        el.value = trocarTexto(el.value);
      }
    });
  }

  function aplicarSubstituicao() {
    if (aplicando || !document.body) return;

    aplicando = true;
    try {
      substituirNosDeTexto(document.body);
      substituirAtributos(document.body);
      substituirCamposFormulario(document.body);
    } finally {
      aplicando = false;
    }
  }

  function agendarSubstituicao() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      aplicarSubstituicao();
    }, DEBOUNCE_MS);
  }

  function iniciarObserver() {
    if (!document.body) return;

    aplicarSubstituicao();

    const observer = new MutationObserver(() => {
      if (aplicando) return;
      agendarSubstituicao();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarObserver, { once: true });
  } else {
    iniciarObserver();
  }
})();
