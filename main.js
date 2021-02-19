'use strict'

const textarea = document.querySelector('textarea')

const content = localStorage.getItem('content')
content && (textarea.value = content)

let caretPos = +localStorage.getItem('caretPos')

if (Number.isNaN(caretPos)) {
  caretPos = 0
  localStorage.setItem('caretPos', caretPos)
}

textarea.setSelectionRange(caretPos, caretPos)
textarea.focus()

textarea.oninput = () => localStorage.setItem('content', textarea.value)

Array.of('onkeyup', 'onclick', 'oncontextmenu').forEach(listener => {
  textarea[listener] = () =>
    requestAnimationFrame(() =>
      localStorage.setItem('caretPos', textarea.selectionStart),
    )
})
