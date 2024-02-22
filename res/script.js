'use strict';

function alpineData() {
    return {
        input: '',
        compiledMarkdown: function () {
            return marked.parse(this.input, { sanitize: true });
        },
        downloadFile: function () {
            const a = document.createElement('a');
            const file = new Blob([this.input], {
                type: 'text/plain'
            });

            a.href = URL.createObjectURL(file);
            a.download = 'markdown.md';
            a.click();

            URL.revokeObjectURL(a.href);
            a.remove();
        },
        alpineInit: function () {
            if (localStorage.getItem('savedStrings')) {
                this.input = localStorage.getItem('savedStrings');
            } else {
                this.input = '# Hello there!';
            }
        },
    }
}
