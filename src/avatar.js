import "./avatar.scss";
import tinycolor from "tinycolor2";

export default function Avatar({ user, fontSize, displayStatus }) {
  const initials = user.firstName[0] + user.lastName[0];
  const brightness = tinycolor(user.color).getBrightness();
  let fontColor = "black";
  if (brightness < 160) fontColor = "white";

  return (
    <div className="avatar-wrapper" style={{ fontSize }}>
      <div
        className="avatar"
        style={{ backgroundColor: user.color, color: fontColor }}
      >
        <p>{initials}</p>
      </div>
      {displayStatus && user.status === "online" && (
        <div className="profile-status online"></div>
      )}
      {displayStatus && user.status === "offline" && (
        <div className="profile-status offline"></div>
      )}
    </div>
  );
}
