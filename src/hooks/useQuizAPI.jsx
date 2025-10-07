import { useEffect, useState, useCallback } from "react";
import fetchQuizData from "../services/fetchQuizData";

export default function useQuizAPI(amount = 10, category = null, difficulty = null, type = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchQuizData(amount, category, difficulty, type);
      setData(response.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [amount, category, difficulty, type]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, reload: loadData };
}
