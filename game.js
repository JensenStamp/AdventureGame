const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
  state = {
    inputs: []
  }
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  console.log(state)
  const textNode = textNodes().find((textNode) => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      if (!option.type) {
        const button = document.createElement("button")
        button.innerText = option.text
        button.classList.add("btn")
        button.addEventListener("click", () => selectOption(option))
        optionButtonsElement.appendChild(button)
      } else if (option.type === "input") {
        const input = document.createElement("input")
        input.innerText = option.text
        input.classList.add("input")
        input.setAttribute("placeholder", option.text)
        input.addEventListener(
          "change",
          () => (state.inputs[option.value] = input.value)
        )
        optionButtonsElement.appendChild(input)
      }
    }
  })
}

function showOption(option) {
  return !option.requiredState || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  state = Object.assign(state, option.setState)

  showTextNode(nextTextNodeId)
}

function textNodes() {
  return [
    {
      id: 1,
      text: "You're a 15 year old manga reader looking for a new story",
      options: [
        {
          text: "Name: ",
          type: "input",
          value: "name",
          nextText: 2
        },
        {
          text: "Continue",
          nextText: 2
        }
      ]
    },
    {
      id: 2,
      text: "You go into a library and find a black and tattered book ",
      options: [
        {
          text: "Read it",
          setState: { bookRead: true },
          nextText: 3
        },
        {
          text: "Find a different book",
          setState: { noRead: true },
          nextText: 2.5
        }
      ]
    },
    {
      id: 3,
      text: "You go to read the book and realise you can't read the language\n\nYou're sucked into the book and transported into a new world",
      options: [
        {
          text: "Go north",
          requiredState: (currentState) => currentState.bookRead,
          setState: { bookRead: false, north: true },
          nextText: 3
        },
        {
          text: "Go south",
          requiredState: (currentState) => currentState.bookRead,
          setState: { bookRead: false, south: true },
          nextText: 3
        }
      ]
    },
    {
      id: 2.5,
      text: "The book whispers to you and draws you back to it",
      options: [
        {
          text: "Read it",
          setState: { bookRead: true },
          nextText: 3
        }
      ]
    }
  ]
}

//+ state.inputs.name

startGame()
