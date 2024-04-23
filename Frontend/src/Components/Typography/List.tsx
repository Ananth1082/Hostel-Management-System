export default function List({ listitems }: { listitems: string[] }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {listitems.map((item: string) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
