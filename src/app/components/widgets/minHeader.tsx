
type Props = {
    title: string;
}
export default function MiniHeader({ title }: Props) {
    return(
        <h2 className="text-md text-black font-bold m-2">
            { title }
        </h2>
    )
}