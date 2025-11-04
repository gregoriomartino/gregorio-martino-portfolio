import { Button } from '@/components/ui/Button'
import '../Profile.css'

export default function Profile({ t, darkMode }) {
  return (
    <section className="profile">
      <div className="profile-container">
        <h2 className="profile-title">{t.profileTitle}</h2>
        <p className="profile-description">{t.profileDescription}</p>

        <div className="profile-actions">
          <Button className="button">{t.contactMe}</Button>
          <Button className="button secondary">{t.downloadCV}</Button>
        </div>
      </div>
    </section>
  )
}
