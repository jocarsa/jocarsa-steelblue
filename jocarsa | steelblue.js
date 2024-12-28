// js/markdownToHtml.js

(function(global) {
    // Crear el namespace jocarsa si no existe
    var jocarsa = global.jocarsa || {};
    jocarsa.steelblue = jocarsa.steelblue || {};

    /**
     * Clase MarkdownToHtml para convertir Markdown a HTML
     */
    class MarkdownToHtml {
        constructor() {
            // Definir las reglas de reemplazo para diferentes sintaxis de Markdown
            this.rules = [
                { regex: /^###### (.*$)/gim, replace: '<h6>$1</h6>' },
                { regex: /^##### (.*$)/gim, replace: '<h5>$1</h5>' },
                { regex: /^#### (.*$)/gim, replace: '<h4>$1</h4>' },
                { regex: /^### (.*$)/gim, replace: '<h3>$1</h3>' },
                { regex: /^## (.*$)/gim, replace: '<h2>$1</h2>' },
                { regex: /^# (.*$)/gim, replace: '<h1>$1</h1>' },
                { regex: /\*\*(.*?)\*\*/gim, replace: '<strong>$1</strong>' },
                { regex: /\*(.*?)\*/gim, replace: '<em>$1</em>' },
                { regex: /!\[(.*?)\]\((.*?)\)/gim, replace: '<img alt="$1" src="$2" />' },
                { regex: /\[(.*?)\]\((.*?)\)/gim, replace: '<a href="$2">$1</a>' },
                { regex: /^\> (.*$)/gim, replace: '<blockquote>$1</blockquote>' },
                { regex: /^\- (.*$)/gim, replace: '<li>$1</li>' },
                { regex: /\n$/gim, replace: '<br />' }
            ];
        }

        /**
         * Convierte texto Markdown a HTML
         * @param {string} markdownText - Texto en formato Markdown
         * @returns {string} - Texto convertido a HTML
         */
        convert(markdownText) {
            let htmlText = markdownText;

            this.rules.forEach(rule => {
                htmlText = htmlText.replace(rule.regex, rule.replace);
            });

            // Manejar listas
            htmlText = htmlText.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

            // Manejar párrafos
            htmlText = htmlText.replace(/^(?!<h\d>|<ul>|<blockquote>|<img|<a|<p>|<\/ul>|<\/blockquote>|<\/p>).+$/gim, '<p>$&</p>');

            return htmlText.trim();
        }
    }

    // Asignar la clase al namespace
    jocarsa.steelblue.MarkdownToHtml = MarkdownToHtml;

    // Exportar el namespace al entorno global
    global.jocarsa = jocarsa;
})(typeof window !== 'undefined' ? window : this);

