type Props = { title: string };

export default function PageHeader({ title }: Props) {
  return <h1 className="text-black m-2 text-2xl font-bold">{title}</h1>;
}
