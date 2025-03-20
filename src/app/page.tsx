'use client';

import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center">Bari's Calculator</h1>
      <Calculator />
    </div>
  );
}
