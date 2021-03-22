import LoadingContent from "./loading-content";
import ErrorContent from "./error-content";

export default function LoadableComponent({ children, loading, error }) {
  return loading ? (
    <LoadingContent />
  ) : error ? (
    <ErrorContent error={error} />
  ) : (
    children
  );
}
