import React from 'react'

export default function VisitsPage({ stats }) {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Stato Visite</h2>

      {!stats ? (
        <p className="text-center">Caricamento in corso...</p>
      ) : (
        <ul className="space-y-3">
          <li>
            <strong>Visite totali:</strong> {stats.totalVisits}
          </li>
          <li>
            <strong>Visite oggi:</strong> {stats.visitsToday}
          </li>
          <li>
            <strong>Utenti unici:</strong> {stats.uniqueUsers}
          </li>
          <li>
            <strong>Ultime pagine visitate:</strong>
            <ul className="list-disc ml-5 mt-1">
              {stats.lastPages?.map((page, idx) => (
                <li key={idx}>{page}</li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </div>
  )
}
