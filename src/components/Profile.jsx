import '../Profile.css'

export default function Profile({ t }) {
  return (
    <section className="profile-section max-w-4xl mx-auto px-4 md:px-0 py-6">


      <div className="card mx-auto">
  <div className="card-inner">
    {/* Front: titolo profilo */}
    <div className="card-face">
      <div className="line-numbers">
        <div>01</div><div>02</div><div>03</div>
      </div>
      <div className="profile-content">
        <h2 className="profile-title text-3xl md:text-4xl font-bold text-white mb-4">
            {t.profileText}
        </h2>
      </div>
    </div>

    {/* Back: codice aboutMe */}
    <div className="card-face back">
      <div className="line-numbers">
        <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
        <div>6</div><div>7</div><div>8</div><div>9</div>
      </div>
      <pre className="code-back">{`const aboutMe = {
  name: 'Gregorio',
  title: 'Full-Stack Developer',
  contact: {
    email: 'gregorio@eltgroup.it',
    website: 'gregorio.is-a.dev'
  }
};`}</pre>
    </div>
  </div>
</div>

    </section>
  )
}
