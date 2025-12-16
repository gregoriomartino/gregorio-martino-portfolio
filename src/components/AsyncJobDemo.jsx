import React from 'react'
import '../AsyncJobDemo.css'

export default function AsyncJobDemo() {
  return (
    <div className="async-demo-root">
      <div className="pipeline">
        {/* API / Gateway / Edge */}
        <div className="stage-wrapper">
          <div className="stage-title">API / Gateway</div>
          <div className="stage-desc">
            Punto di ingresso esterno: riceve la richiesta, fa i controlli base e inoltra nel sistema.
          </div>
          <div className="stage stage-api">
            <div className="stage-label">
              <span className="stage-icon">🌐</span>
              <span>API / Edge</span>
            </div>
          </div>
        </div>

        {/* Service */}
        <div className="stage-wrapper">
          <div className="stage-title">Service / Business logic</div>
          <div className="stage-desc">
            Applica le regole di dominio, parla con DB e prepara il job asincrono.
          </div>
          <div className="stage stage-service">
            <div className="stage-label">
              <span className="stage-icon">⚙️</span>
              <span>Service</span>
            </div>
          </div>
        </div>

        {/* Queue */}
        <div className="stage-wrapper">
          <div className="stage-title">Queue / Event bus</div>
          <div className="stage-desc">
            Coda di messaggi: disaccoppia chi genera lavoro da chi lo esegue.
          </div>
          <div className="stage stage-queue">
            <div className="stage-label">
              <span className="stage-icon">🧾</span>
              <span>Queue</span>
            </div>
          </div>
        </div>

        {/* Worker */}
        <div className="stage-wrapper">
          <div className="stage-title">Worker / Encoder</div>
          <div className="stage-desc">
            Esegue il lavoro pesante (encoding) e pubblica lo stato finale / risultato.
          </div>
          <div className="stage stage-worker">
            <div className="stage-label">
              <span className="stage-icon">⚡</span>
              <span>Worker</span>
            </div>
          </div>
        </div>

        {/* Job come “pacchetti” */}
        <div className="job-token job-token-request">
          <span className="job-token-icon">📦</span>
        </div>
        <div className="job-token job-token-response">
          <span className="job-token-icon">📨</span>
        </div>
      </div>
    </div>
  )
}
