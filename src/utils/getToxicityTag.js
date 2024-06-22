function formatArray(arr) {
  if (arr.length === 0) return ""; // Si el arreglo está vacío
  if (arr.length === 1) return arr[0]; // Si el arreglo tiene un solo elemento
  if (arr.length === 2) return arr.join(" y "); // Si el arreglo tiene dos elementos

  // Si el arreglo tiene más de dos elementos
  return arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1];
}

export const toxicityTags = {
  toxicity: "Toxic",
  severe_toxicity: "Severe Toxic",
  obscene: "Obscene",
  identity_attack: "Identity Attack",
  insult: "Insult",
  threat: "Threat",
  sexual_explicit: "Sexual Explicit",
};

export default function getToxicityTags(tags) {
  return formatArray(tags.map((tag) => toxicityTags[tag]));
}
