export default function ExpenseApp(
    {
  children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    return(
        <div
         className="relative z-10 w-screen h-screen"
         >
            { children}
         </div>
    )
}