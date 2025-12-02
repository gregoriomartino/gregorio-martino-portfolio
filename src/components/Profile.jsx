import '../Profile.css'

export default function Profile({ t }) {
  return (
  <section className="profile-section max-w-4xl mx-auto px-4 md:px-0 py-6">
    <h2 className="profile-title text-3xl md:text-4xl font-bold text-white mb-4">
      {t.profile}
    </h2>
    <p className="profile-text text-lg md:text-xl leading-relaxed text-white">
      {t.profileText}
    </p>
  </section>
  )
}
