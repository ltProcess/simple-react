let rootElement
let rootReactElement
class Component {
  constructor(props) {
    this.props = props
  }
  setState(state) {
    this.state = state
    reRender()
  }
}

function createElement(parentEle, props, ...childEles) {
  if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
    let componet = new parentEle(props)
    return componet
  } else if(typeof parentEle === 'function' ) {
    return parentEle(props)
  } else {
    let parentElement = document.createElement(parentEle)
    if (props !== null) {
      Object.keys(props).forEach(key => {
        switch(key) {
          case 'onClick':
            parentElement.addEventListener('click', props[key])
            break
          default:
            break
        }
      })
    }
    childEles.forEach(child => {
      if(typeof child === 'string') {
        parentElement.innerHTML += child
      } else if (typeof child === 'object') {
        parentElement.appendChild(child)
      }
    })
  
    return parentElement
  }
}

function render(insertEle, rootEle) {
  rootElement = rootEle
  rootReactElement = insertEle
  if (typeof insertEle.render === 'function') {
    rootEle.appendChild(insertEle.render())
  } else {
    rootEle.appendChild(insertEle)
  }
}
function reRender() {
  while(rootElement.hasChildNodes()) {
    rootElement.removeChild(rootElement.lastChild)
  }
  ReactDOM.render(rootReactElement, rootElement)
}
React = {
  createElement,
  Component
}

ReactDOM = {
  render
}