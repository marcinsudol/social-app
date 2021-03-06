import Avatar from "./avatar";
import "./friend-card.scss";
import { Link } from "react-router-dom";

export default function FriendCard({ user }) {
  return (
    <Link to={`/app/friends/${user.id}`}>
      <div className="friend-card">
        <div className="friend-avatar">
          <Avatar user={user} fontSize={"2em"} displayStatus={true} />
        </div>

        <div className="friend-info">
          <p>{user.firstName + " " + user.lastName}</p>
        </div>
      </div>
    </Link>
  );
}
