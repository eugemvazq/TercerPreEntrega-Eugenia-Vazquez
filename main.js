// Definir datos de destinos turísticos
const destinations = [
  {
    name: "Playa en Cancún",
    climate: "cálido",
    landscapes: ["playa"],
    budget: 1000,
  },
  {
    name: "Esquiar en Suiza",
    climate: "frío",
    landscapes: ["montaña"],
    budget: 1500,
  },
  {
    name: "Explorar Nueva York",
    climate: "frío",
    landscapes: ["ciudad"],
    budget: 1200,
  },
  {
    name: "Playa Turística en Argentina",
    climate: "cálido",
    landscapes: ["playa"],
    budget: 800,
  },
  {
    name: "Mendoza, Argentina",
    climate: "cálido",
    landscapes: ["montaña"],
    budget: 900,
  },
  {
    name: "Bariloche, Argentina",
    climate: "frío",
    landscapes: ["montaña"],
    budget: 1100,
  },
  {
    name: "Norte de Argentina",
    climate: "cálido",
    landscapes: ["montaña"],
    budget: 750,
  },
];

// Variables para seguir el progreso del usuario
let currentQuestion = 0;
let userChoices = {};

// Obtener elementos del DOM
const ageButton = document.getElementById("ageButton");
const climateButton = document.getElementById("climateButton");
const landscapeButton = document.getElementById("landscapeButton");
const budgetButton = document.getElementById("budgetButton");
const destinationElement = document.getElementById("destination");

// Funciones para mostrar y ocultar preguntas
function showQuestion(questionId) {
  const questions = [
    "ageQuestion",
    "climateQuestion",
    "landscapeQuestion",
    "budgetQuestion",
  ];
  questions.forEach((question) => {
    document.getElementById(question).style.display = "none";
  });
  document.getElementById(questions[questionId]).style.display = "block";
}

// Mostrar la primera pregunta
showQuestion(currentQuestion);

// Evento para la pregunta de edad
ageButton.addEventListener("click", () => {
  const ageInput = document.getElementById("ageInput");
  userChoices.age = parseInt(ageInput.value);
  currentQuestion++;
  showQuestion(currentQuestion);
});

// Evento para la pregunta de preferencia de clima
climateButton.addEventListener("click", () => {
  const selectedClimate = document.querySelector(
    'input[name="climate"]:checked'
  ).value;
  userChoices.climate = selectedClimate;
  currentQuestion++;
  showQuestion(currentQuestion);
});

// Evento para la pregunta de paisaje
landscapeButton.addEventListener("click", () => {
  const selectedLandscapes = Array.from(
    document.querySelectorAll('input[name="landscape"]:checked')
  ).map((el) => el.value);
  userChoices.landscapes = selectedLandscapes;
  currentQuestion++;
  showQuestion(currentQuestion);
});

// Evento para la pregunta de presupuesto
budgetButton.addEventListener("click", () => {
  const budgetInput = document.getElementById("budgetInput");
  userChoices.budget = parseInt(budgetInput.value);
  currentQuestion++;
  const destination = findDestination(userChoices);
  displayResult(destination);
});

// Función para encontrar un destino basado en las elecciones del usuario
function findDestination(userChoices) {
  const matchedDestinations = destinations.filter((destination) => {
    return (
      userChoices.age >= 18 && 
      destination.climate === userChoices.climate &&
      userChoices.landscapes.every((choice) =>
        destination.landscapes.includes(choice)
      ) &&
      destination.budget <= userChoices.budget
    );
  });
  return matchedDestinations[0];
}

// Función para mostrar el resultado en el DOM
function displayResult(destination) {
  if (destination) {
    destinationElement.textContent = `Te recomendamos viajar a ${destination.name}. ¡Disfruta tu viaje!`;
  } else {
    destinationElement.textContent =
      "Lo sentimos, no pudimos encontrar un destino que coincida con tus preferencias.";
  }
  document.getElementById("result").style.display = "block";
}
