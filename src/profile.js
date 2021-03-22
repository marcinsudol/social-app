import LoadingContent from "./loading-content";
import { useFetchJson } from "./use-fetch-json";

export default function Profile({ userId }) {
  const [users, loaded, error] = useFetchJson("./data/users.json");

  return (
    <div>
      {!loaded && !error ? (
        <LoadingContent />
      ) : loaded ? (
        <p>Profile loaded</p>
      ) : (
        <p>Error loading</p>
      )}
    </div>
  );
}
