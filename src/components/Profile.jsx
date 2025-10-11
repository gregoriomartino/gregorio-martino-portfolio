export default function Profile({ t }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3">{t.profile}</h2>
      <p className="leading-relaxed">{t.profileText}</p>
    </section>
  )
}
