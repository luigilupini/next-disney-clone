import { clsx, type ClassValue } from "clsx"
import moment from "moment"
import { twMerge as tw } from "tailwind-merge"

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), time)
  })
}

/* ⭐️ Using twMerge and clsx together
// This allows us to use Tailwind classes and conditional logic together
// 1) twMerge is a utility function that merges Tailwind classes
// 2) clsx is a utility function that merges conditional logic

<Link
	href={href}
	className={cn( // 👈🏻 Utils function takes 3 arguments (twMerge and clsx)
		'link no-underline opacity-70 hover:opacity-100', // 👈🏻 Merge with twMerge
		className, // 👈🏻 Incoming props applied by twMerge
		{ 'opacity-100': currentPath === href } // 👈🏻 Conditional logic applied by clsx
	)}
>
	{label}
</Link>
*/
export const cn = (...inputs: ClassValue[]) => tw(clsx(inputs))

export const lastSeen = (time: Date) => {
  return moment(time, "YYYY-MM-DD HH:mm:ss").fromNow()
}
