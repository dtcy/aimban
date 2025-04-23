'use client';

import { useState } from 'react';

export default function Home() {
  const [carName, setCarName] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult('');
    const res = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carName, year, type }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">콘솔쿠션 호환 테스트</h1>
      <input
        type="text"
        placeholder="차량명 (예: 쏘렌토)"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="text"
        placeholder="연식 (예: 2021)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="text"
        placeholder="차량 유형 (예: SUV, 세단)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <button onClick={handleCheck} className="btn btn-primary w-full mb-4" disabled={loading}>
        {loading ? '확인 중...' : '호환성 확인'}
      </button>
      {result && <div className="p-4 bg-base-200 rounded">{result}</div>}
    </main>
  );
}
