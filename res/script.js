'use strict';

function alpineData() {
    const toMarkdown = new TurndownService({ headingStyle: 'atx' });
    let editorInstance;

    return {
        input: '',
        fontSize: localStorage.getItem('fontSize') || 16,
        wysiwyg: (localStorage.getItem('wysiwyg') === 'true') || false,
        fileSaveName: 'markdown.md',
        compiledMarkdown: function () {
            return marked.parse(this.input, { sanitize: true });
        },
        editorToggle: function () {
            if (editorInstance) editorInstance.setContent(this.compiledMarkdown());
            this.wysiwyg = !this.wysiwyg;
            localStorage.setItem('wysiwyg', this.wysiwyg);
        },
        downloadFile: function () {
            const a = document.createElement('a');
            const file = new Blob([this.input], { type: 'text/plain' });

            a.href = URL.createObjectURL(file);
            a.download = this.fileSaveName;
            a.click();

            URL.revokeObjectURL(a.href);
            a.remove();
        },
        alpineInit: function () {
            tinymce.init({
                selector: 'textarea#wysiwyg',
                menubar: false,
                plugins: 'lists link media table',
                toolbar:
                    'undo redo | h1 h2 h3 h4 h5 h6 | bold italic backcolor bullist numlist ' +
                    '| table outdent indent | link openlink unlink removeformat ',
                toolbar_mode: 'wrap',
                height: '100%',
                resize: false,
                setup: (editor) => {
                    editor.on('init', () => {
                        editorInstance = editor;
                        editor.setContent(this.compiledMarkdown());
                    });

                    editor.on('change', () => {
                        const htmlContent = editor.getContent();
                        this.input = toMarkdown.turndown(htmlContent);
                        localStorage.setItem('savedStrings', this.input.toString());
                    });
                },
            });

            if (localStorage.getItem('savedStrings')) {
                this.input = localStorage.getItem('savedStrings');
            } else {
                this.input = '# Hello there!';
            }
        },
    }
}
