Vimport { useState, useEffect } from 'react';

// 'use' ile başlayan bir fonksiyon tanımlıyoruz.
// Bu hook, hangi URL'den veri çekeceğini parametre olarak alacak.
function useFetch(url) {
  // Bu hook'un kendi iç state'leri var.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Veri çekme işlemini başlat.
    setLoading(true);
    setData(null);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Veri alınamadı.');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]); // Bağımlılık dizisine 'url'i koyuyoruz. URL her değiştiğinde bu efekt yeniden çalışacak.

  // Bu hook, component'in kullanabilmesi için state'lerini bir nesne olarak dışarıya döndürür.
  return { data, loading, error };
}

export default useFetch;