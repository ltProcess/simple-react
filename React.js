(() => {
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
    // 类组件
    if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
      let componet = new parentEle(props)
      return componet
      // 函数组件
    } else if(typeof parentEle === 'function' ) {
      return parentEle(props)
      // html标签组件
    } else {
      let parentElement = document.createElement(parentEle)
      if (props !== null) {
        let eventName
        Object.keys(props).forEach(key => {
          if(/^on.*$/.test(key)) {
            eventName = key.slice(2).toLowerCase()
            parentElement.addEventListener(eventName, props[key])
          }
        })
      }
      childEles.forEach(child => {
        if(typeof child === 'string') {
          parentElement.innerHTML += child
        } else if (Array.isArray(child)) {
          child.forEach(eleItem => parentElement.appendChild(eleItem))
        }
         else if (typeof child === 'object') {
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
  window.React = {
    createElement,
    Component
  }

  window.ReactDOM = {
    render
  }
})()