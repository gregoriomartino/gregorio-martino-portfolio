import '../Profile.css'

export default function Profile({ t }) {
  return (
    <section className="profile-section">
      <h2 className="profile-title ">{t.profile}</h2>
      <p className="profile-text">{t.profileText}</p>
    </section>
  )
}
