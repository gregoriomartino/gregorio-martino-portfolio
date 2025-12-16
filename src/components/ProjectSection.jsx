export default function ProjectsSection() {
  return (
    <section id="projects" className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-white">Progetti</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Progetto 1 – ELT Group */}
        <article className="border border-gray-800 rounded-xl p-5 bg-black/60 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-white">
            Anti‑Drone Video Object Tracking
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            Consulente Computer Vision · ELT Group
          </p>
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>
              Gestione end‑to‑end di un modello semi‑supervisionato per video object tracking Anti‑Drone, dalla preparazione dei dati alla valutazione in scenari realistici.
            </li>
            <li>
              Sviluppo di un framework per segmentazione e tracking automatico basato su SAM2, con pipeline di preprocessing, inferenza e post‑processing per flussi video ad alta frequenza.
            </li>
          </ul>
        </article>

        {/* Progetto 2 – MOVYON */}
        <article className="border border-gray-800 rounded-xl p-5 bg-black/60 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-white">
            Traffic Intelligence & AID
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            Consulente Java · MOVYON (Gruppo Autostrade per l’Italia)
          </p>
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>
              Manutenzione e sviluppo di servizi Java per sistemi di monitoraggio del traffico e pedaggio in contesti mission‑critical.
            </li>
            <li>
              Migrazione dei sistemi AID delle telecamere verso tecnologia SprinxAI, con integrazione, bug fixing e ottimizzazione delle prestazioni per il rilevamento automatico di incidenti.
            </li>
          </ul>
        </article>

        {/* Progetto 3 – Sogei */}
        <article className="border border-gray-800 rounded-xl p-5 bg-black/60 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-white">
            Tracciamento esportazioni UE
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            Consulente Java · Sogei
          </p>
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>
              Reingegnerizzazione di un applicativo enterprise per il tracciamento elettronico delle esportazioni UE, parte dell’ecosistema informativo fiscale nazionale.
            </li>
            <li>
              Refactoring architetturale e miglioramento delle integrazioni per garantire affidabilità e performance in ambienti ad alto volume di dati.
            </li>
          </ul>
        </article>

        {/* Progetto 4 – Autenticator */}
        <article className="border border-gray-800 rounded-xl p-5 bg-black/60 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-white">
            Autenticator – Auth Service
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            Progetto personale · Java / Spring Boot
          </p>
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>
              Servizio di autenticazione e autorizzazione in Java/Spring Boot, pensato come componente centrale in un’architettura a microservizi.
            </li>
            <li>
              Integrazione con Keycloak come Identity Provider centralizzato e utilizzo di MySQL/PostgreSQL come storage intercambiabile, con API REST per utenti, ruoli e permessi.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
