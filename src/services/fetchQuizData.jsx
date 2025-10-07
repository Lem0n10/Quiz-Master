export default async function fetchQuizData(amount = 10, category = null, difficulty = null, type = null) {
  const params = new URLSearchParams({ amount });

  if (category) params.append("category", category);
  if (difficulty) params.append("difficulty", difficulty);
  if (type) params.append("type", type);

  const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
  return response.json();
}
