// ArchitectureFlow.jsx
import React from "react";
import "../ArchitectureFlow.css";

const ArchitectureFlow = () => {
  return (
    <div className="arch-flow">
      <h2>AES-2 - Flusso REST → DB</h2>
      <pre className="arch-diagram">
        {`Client (REST)
   |
   v
[JAX-RS Resource]  (aes-2-rest)
   - Valida input
   - Mappa JSON <-> DTO
   |
   v
[IEMessageService]  (Service Layer - EJB)
   - Dispatch per msgType (es. "CD501C")
   - beforeSend / afterReceive
   |
   v
[IE501Manager]  (Manager)
   - Recupera/aggiorna dati export
   - Orchestrazione business
   |
   v
[IAesExportOperationDao]  (DAO MyBatis)
   - SELECT / UPDATE tramite Mapper
   |
   v
[Database]`}

      </pre>

      <h2>AES-2 - Costruzione XML (Builder)</h2>
      <pre className="arch-diagram">
        {`[IE501Manager]
   - Prepara bean con i dati necessari
   |
   v
[BuilderService / CommonIEMessageBuilder]
   - Bean -> XML (XSD compliant)
   |
   v
[IEMessageService]
   - Aggiorna stato
   - Traccia tramite HistoryService
   |
   v
[Sistema esterno]
   - Invio XML (JMS / HTTP)`}

      </pre>

      <h2>AES-2 - Ricezione Messaggio</h2>
      <pre className="arch-diagram">
        {`[Sistema esterno]
   - Invia XML
   |
   v
[JMS Listener / REST Endpoint]
   - Riceve XML grezzo
   |
   v
[Parser / Builder inverso]
   - XML -> Bean / DTO
   |
   v
[IE501Manager.afterReceive(...)]
   - Logica di dominio
   - Aggiorna stato, scrive history
   |
   v
[DAO MyBatis]
   - Persistenza su DB`}

      </pre>

      <h2>AES-2 - Visione Macro a Strati</h2>
      <pre className="arch-diagram">
        {`Client (REST / Sistemi esterni)
   |
   v
[REST Layer]      - JAX-RS, DTO
   |
   v
[Service Layer]   - EJB, IEMessageService (facade)
   |
   v
[Manager Layer]   - IE500Manager, IE501Manager, ...
   |
   v
[DAO Layer]       - MyBatis DAO + Mapper
   |
   v
[Database / JMS / Sistemi esterni]`}
      </pre>
    </div>
  );
};

export default ArchitectureFlow;
