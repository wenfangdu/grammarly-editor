'use strict'

const textarea = document.querySelector('textarea')

const content = localStorage.getItem('content')
content && (textarea.value = content)

const setCaretPos = () => {
  let caretPos = +localStorage.getItem('caretPos')
  Number.isNaN(caretPos) && (caretPos = 0)

  textarea.setSelectionRange(caretPos, caretPos)
  textarea.focus()
}

setCaretPos()
onfocus = setCaretPos

const storeCaretPos = () =>
  requestAnimationFrame(() =>
    localStorage.setItem('caretPos', textarea.selectionStart),
  )

textarea.oninput = () => {
  localStorage.setItem('content', textarea.value)
  storeCaretPos()
}

textarea.onclick = textarea.oncontextmenu = storeCaretPos

textarea.onkeyup = ({ key }) => {
  if (['Arrow', 'Page', 'Home', 'End'].some(type => key.startsWith(type))) {
    storeCaretPos()
  }
}
