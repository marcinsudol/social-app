import "./profile-status.scss";

export default function ProfileStatus({ status }) {
  return <p className={"profile-status " + status}>{status}</p>;
}
