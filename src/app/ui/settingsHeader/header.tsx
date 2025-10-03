type Prop = {
  title: string;
};
export default function SettingsHeader({ title }: Prop) {
  return (
    <h1
      className="flex flex-col items-center m-2 bg-green-400 p-1 md:p-2 rounded-sm text-sm md:text-md text-white font-semibold text-center"
      style={{
        boxShadow: "1px 1px 5px black",
        textShadow: "0px 0px 3px black",
      }}
    >
      {title.toUpperCase()}
    </h1>
  );
}
