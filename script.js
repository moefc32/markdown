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

function savetoBrowser() {
  b = document.getElementById("editor").value;
  localStorage.setItem('myItem', b);
}