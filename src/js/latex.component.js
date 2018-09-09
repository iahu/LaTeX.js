(() => {

// path of this script
let path = document.currentScript.src

// define the <latex-js> tag
customElements.define('latex-js',
  class extends HTMLElement {
    constructor() {
      super()

      // wait for some LaTeX source to appear in the upgrade-case
      if (!this.textContent) {
        var observer = new MutationObserver(mutationList => {
          if (this.textContent) {
            // no longer need to watch for change
            // TODO: actually, we could keep watching to support editing!
            observer.disconnect();
            this.onContentReady();
          }
        })
        observer.observe(this, {
          childList: true
        })
      }

      this.shadow =  this.attachShadow({mode: 'open'})
    }

    onContentReady() {
      while (this.shadow.lastChild) {
        this.shadow.lastChild.remove()
      }

      var generator = latexjs.parse(this.textContent, { generator: new latexjs.HtmlGenerator({ hyphenate: false }) })

      let page = document.createElement("div")
      page.setAttribute("class", "page")

      generator.applyLengthsAndGeometryToDom(page)
      page.appendChild(generator.domFragment())

      this.shadow.appendChild(generator.stylesAndScripts(new URL("..", path)))
      this.shadow.appendChild(page)
    }

    connectedCallback() {
        console.log("connected")
    }
  }
);

})()