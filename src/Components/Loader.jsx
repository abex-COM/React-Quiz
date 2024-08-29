export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3">
      <img
        src="/src/assets/loading.svg"
        className="w-6 h-6 animate-spin"
        alt="laoding"
      />
      <p>Loading questions...</p>
    </div>
  );
}
