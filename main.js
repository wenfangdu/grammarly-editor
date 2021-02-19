'use strict'

const textarea = document.querySelector('textarea')

const content = localStorage.getItem('content')
content && (textarea.value = content)

let caretPos = +localStorage.getItem('caretPos')
Number.isNaN(caretPos) && (caretPos = 0)

textarea.setSelectionRange(caretPos, caretPos)
textarea.focus()

textarea.oninput = () => localStorage.setItem('content', textarea.value)

const storeCaretPos = () =>
  requestAnimationFrame(() =>
    localStorage.setItem('caretPos', textarea.selectionStart),
  )

Array.of('oninput', 'onclick', 'oncontextmenu').forEach(
  listener => (textarea[listener] = storeCaretPos),
)

textarea.onkeyup = ({ key }) => {
  if (['Arrow', 'Page', 'Home', 'End'].some(type => key.startsWith(type))) {
    storeCaretPos()
  }
}
