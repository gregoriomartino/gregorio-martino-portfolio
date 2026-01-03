import '../Profile.css';

export default function Profile({ t }) {
  return (
    <section className="profile-section max-w-4xl mx-auto px-4 md:px-0 py-6">
      {/* Flip Card stile terminale */}
      <div className="profile-card">
        <div className="profile-card-inner">
          {/* Front: testo profilo (titolo o intro breve) */}
          <div className="profile-card-face">
            <div className="profile-line-numbers">
              <div>01</div><div>02</div><div>03</div>
            </div>
            <div className="profile-face-content">
              <p className="profile-title">
                {t.profileText}
              </p>
            </div>
          </div>

          {/* Back: codice aboutMe */}
          <div className="profile-card-face profile-card-back">
            <div className="profile-line-numbers">
              <div>01</div><div>02</div><div>03</div><div>04</div><div>05</div>
              <div>06</div><div>07</div><div>08</div><div>09</div>
            </div>
            <pre className="profile-code">{`const aboutMe = {
  name: 'Gregorio',
  title: 'Full-Stack Developer',
  contact: {
    email: 'martinogregorio2@gmail.com'
  }
};`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
