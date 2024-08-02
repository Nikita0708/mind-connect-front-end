export default function DoctorsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex'>
			<div className='bg-[#111] w-full h-full'>{children}</div>
		</div>
	)
}
