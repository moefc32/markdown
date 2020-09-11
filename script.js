if (localStorage.getItem('myItem')) {
  a = localStorage.getItem('myItem');
} else {
  a = "# Hello there!";
}

new Vue({
  el: "#main",
  data: {
    input: a
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, {
        sanitize: true
      });
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value;
    }, 300)
  }
});

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
};

function saveToBrowser() {
  b = document.getElementById("editor").value;
  localStorage.setItem('myItem', b);
}

function clickToDownload() {
  const textArea = document.getElementById('editor');
  downloadToFile(textArea.value, 'markdown.md', 'text/plain');
};