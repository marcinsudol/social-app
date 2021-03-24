import "./avatar.scss";
import tinycolor from "tinycolor2";

export default function Avatar({ user, fontSize }) {
  const initials = user.firstName[0] + user.lastName[0];
  const brightness = tinycolor(user.color).getBrightness();
  let fontColor = "black";
  if (brightness < 130) fontColor = "white";

  return (
    <div
      className="avatar"
      style={{ fontSize, backgroundColor: user.color, color: fontColor }}
    >
      <p>{initials}</p>
    </div>
  );
}
