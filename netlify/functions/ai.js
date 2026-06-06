exports.handler = async (event) => {
  const { streak } = JSON.parse(event.body || '{}');
  const key = process.env.GEMINI_API_KEY;

  const prompt = `Sen "Yangi Hayot" ilovasining AI yordamchisisan. Foydalanuvchi yomon odatlardan xalos bo'lishga harakat qilmoqda va bugun ${streak || 0}-kun. Bugun uchun qisqa, samimiy motivatsion maslahat ber: O'zbek tilida, 2-3 jumladan iborat, Islomiy qadriyatlarga mos, ${streak || 0} kunlik streakni tilga ol. Faqat maslahatni yoz.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Bugun ham kuchli bo'l!";

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ text })
  };
};
