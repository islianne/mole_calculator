const elementMass = {
  H: 1.008, C: 12.01, O: 16.00, N: 14.01,
  Na: 22.99, Cl: 35.45, Fe: 55.85, K: 39.10,
  Ca: 40.08, Mg: 24.31, S: 32.07, P: 30.97,
  Zn: 65.38, Al: 26.98, Cu: 63.55,
};

const AVOGADRO = 6.022e23;

function parseFormula(formula) {
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let match;
  let totalMass = 0;

  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = parseInt(match[2]) || 1;
    const mass = elementMass[element];

    if (!mass) {
      showError(`Unknown element: "${element}"`);
      return null;
    }

    totalMass += mass * count;
  }

  return totalMass;
}

function showError(message) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
}

function calculate() {
  const formula = document.getElementById("formula").value.trim();
  const massInput = parseFloat(document.getElementById("mass").value);
  const molesInput = parseFloat(document.getElementById("moles").value);
  const resultsDiv = document.getElementById("results");

  if (!formula) {
    showError("Please enter a chemical formula.");
    return;
  }

  const molarMass = parseFormula(formula);
  if (molarMass === null) return;

  let output = `<p><strong>Molar Mass of ${formula}:</strong> ${molarMass.toFixed(2)} g/mol</p>`;

  if (!isNaN(massInput) && massInput > 0) {
    const moles = massInput / molarMass;
    const particles = moles * AVOGADRO;

    output += `<p><strong>${massInput} g</strong> = ${moles.toFixed(4)} mol</p>`;
    output += `<p>Particles: ${particles.toExponential(3)} molecules</p>`;
  } else if (!isNaN(molesInput) && molesInput > 0) {
    const grams = molesInput * molarMass;
    const particles = molesInput * AVOGADRO;

    output += `<p><strong>${molesInput} mol</strong> = ${grams.toFixed(2)} g</p>`;
    output += `<p>Particles: ${particles.toExponential(3)} molecules</p>`;
  } else {
    showError("Please enter either mass or moles.");
    return;
  }

  resultsDiv.innerHTML = output;
}
