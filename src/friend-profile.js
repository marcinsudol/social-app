import Profile from "./profile";
import { useParams } from "react-router-dom";

export default function FriendProfile() {
  const { friendId } = useParams();

  return <Profile userId={Number(friendId)} />;
}
