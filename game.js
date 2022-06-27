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
      text:
        "You're a 15 year old manga reader, you go to the local library to find a book to read.\n" +
        "\nWhat is your name?",
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
      text:
        "You go to pull a book off the shelf when you hear ominous whispers coming from a black " +
        "and tattered book behind it",
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
      id: 2.5,
      text: "The book whispers to you and draws you back to it",
      options: [
        {
          text: "Read it",
          setState: { noRead: false, bookRead: true },
          nextText: 3
        }
      ]
    },
    {
      id: 3,
      text:
        "You go to read the book and realise you can't read the language\n" +
        "\nYou're sucked into the book and start falling, you hit the ground and are unharmed",
      options: [
        {
          text: "Go north",
          requiredState: (currentState) => currentState.bookRead,
          setState: { bookRead: false, north: true },
          nextText: 4
        },
        {
          text: "Go south",
          requiredState: (currentState) => currentState.bookRead,
          setState: { bookRead: false, south: true },
          nextText: 4
        }
      ]
    },
    {
      id: 4,
      text: "",
      options: [
        {
          text: "",
          setState: {},
          nextText: 5
        }
      ]
    }
  ]
}

//code for getting the name: + state.inputs.name

startGame()
