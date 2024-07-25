export default function DocumentLayout({children}: {children: React.ReactNode}) {
  return <div className='flex h-full w-full flex-col gap-2 p-4'>{children}</div>;
}
