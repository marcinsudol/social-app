import "./avatar.scss";

export default function Avatar({ user, fontSize }) {
  const initials = user.firstName[0] + user.lastName[0];

  return (
    <div className="avatar" style={{ fontSize, backgroundColor: user.color }}>
      <p>{initials}</p>
    </div>
  );
}
