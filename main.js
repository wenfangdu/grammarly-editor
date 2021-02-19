'use strict'

const textarea = document.querySelector('textarea')

const restoreContent = () => {
  const content = localStorage.getItem('content')
  content && (textarea.value = content)
}

const restoreCaretPos = () => {
  let caretPos = +localStorage.getItem('caretPos')
  Number.isNaN(caretPos) && (caretPos = 0)

  textarea.setSelectionRange(caretPos, caretPos)
  textarea.focus()
}

onfocus = () => {
  restoreContent()
  restoreCaretPos()
}

onfocus()

const saveCaretPos = () =>
  requestAnimationFrame(() =>
    localStorage.setItem('caretPos', textarea.selectionStart),
  )

textarea.oninput = () => {
  localStorage.setItem('content', textarea.value)
  saveCaretPos()
}

textarea.onclick = textarea.oncontextmenu = saveCaretPos

textarea.onkeyup = ({ key }) => {
  if (['Arrow', 'Page', 'Home', 'End'].some(type => key.startsWith(type))) {
    saveCaretPos()
  }
}
