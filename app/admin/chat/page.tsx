'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      setResponse('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">아임반 테스트</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="예: 2020년식 아반떼는 콘솔쿠션이 맞을까요?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 bg-black text-white rounded"
          disabled={loading}
        >
          {loading ? '답변 중...' : '질문'}
        </button>
      </form>

      {response && (
        <div className="p-4 bg-gray-100 rounded whitespace-pre-line">{response}</div>
      )}
    </main>
  );
}
