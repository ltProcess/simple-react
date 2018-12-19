class Component {
  constructor(props) {
    this.props = props
  }
}

function createElement(parentEle, props, ...childEles) {
  if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
    let componet = new parentEle(props)
    return componet.render()
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
  rootEle.appendChild(insertEle)
}

React = {
  createElement,
  Component
}

ReactDOM = {
  render
}