import "./profile-statistic-card.scss";

export default function ProfileStatisticCard({ label, value }) {
  return (
    <div className="profile-statistic-card">
      <h2 className="card-label">{label}:</h2>
      <p className="card-value">{value}</p>
    </div>
  );
}
