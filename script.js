const targetNumber = Math.floor(Math.random() * 10) + 1;
let attemptsLeft = 3;
const previousAttempts = [];

function updateMessage(message, emojiClass) {
  const messageElement = document.getElementById("message");
  const emojiElement = document.getElementById("emoji");

  messageElement.textContent = message;

  emojiElement.classList.remove("win", "lose");
  if (emojiClass) {
    emojiElement.classList.add(emojiClass);
  }
}

function updateAttemptsList(guess, isWinner) {
  const attemptsList = document.getElementById("attempts-list");
  const listItem = document.createElement("li");

  let emoji = "🔍"; // Emoji por defecto para intentos fallidos
  if (isWinner) {
    emoji = "🎉 ¡bien hecho!"; // Emoji para intentos exitosos
  }

  listItem.textContent = `Intento ${3 - attemptsLeft + 1}: ${guess} ${emoji}`;
  attemptsList.appendChild(listItem);

  previousAttempts.push({ guess, emoji });
}

function endGame(isWinner) {
  document.getElementById("check").setAttribute("disabled", true);
  document.getElementById("guess").setAttribute("disabled", true);

  if (isWinner) {
    updateMessage("¡Felicidades! ¡Has adivinado el número!", "win");
  } else {
    updateMessage(
      `¡Se acabaron los intentos! El número era ${targetNumber}.`,
      "lose"
    );
  }
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guess").value, 10);

  if (isNaN(guess) || guess < 1 || guess > 50) {
    updateMessage("Por favor, ingresa un número válido (1-50).");
  } else if (guess === targetNumber) {
    updateAttemptsList(guess, true);
    endGame(true);
  } else {
    attemptsLeft--;
    document.getElementById("attempts").textContent = attemptsLeft;

    updateAttemptsList(guess, false);

    if (attemptsLeft === 0) {
      endGame(false);
    } else {
      const message =
        guess < targetNumber ? "El número es mayor." : "El número es menor.";
      updateMessage(message);
    }
  }
}

document.getElementById("check").addEventListener("click", checkGuess);
