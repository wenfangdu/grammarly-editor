const textarea = document.querySelector('textarea')

const demoDoc = `The basics
Mispellings and grammatical errors can effect your credibility. The same goes for misused commas, and other types of punctuation . Not only will Grammarly underline these issues in red, it will also showed you how to correctly write the sentence.
But wait...there's more?
Blue underlines mean a clarity issue has been spotted by Grammarly. You'll find suggestions that can possibly help you revise a wordy sentence in an effortless manner.

Grammarly will also inspect your vocabulary carefully and suggest the best word with green underlines to make sure you don't have to analyze your writing too much.

And when you wanna refine ur slang use and formality level, look for purple underlines. That's especially useful when writing for a broad audience ranging from businessmen to friends and family, don't you think?
So what's next?
Just follow these two steps:
Sign up for a Grammarly account by clicking the "Sign Up" button at the bottom of this screen.
Start writing!`

const restoreContent = () => {
  const content = localStorage.getItem('content')
  textarea.value = content ?? demoDoc
}

const restoreCaretPos = () => {
  let caretPos = +localStorage.getItem('caretPos')
  Number.isNaN(caretPos) && (caretPos = 0)

  textarea.setSelectionRange(caretPos, caretPos)
  // scroll to the bottom if it has long text
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
