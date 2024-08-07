import React from 'react'

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex h-screen'>
			<div className='bg-[#111] w-full'>{children}</div>
		</div>
	)
}
