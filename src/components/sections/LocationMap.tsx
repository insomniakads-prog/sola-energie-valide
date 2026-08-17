export function LocationMap({
  query,
  zoom = 8,
  title,
}: {
  query: string;
  zoom?: number;
  title: string;
}) {
  return (
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`}
      title={title}
      loading="lazy"
      allowFullScreen
      className="size-full border-0"
    />
  );
}
