import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  image?: string
}

export function TestimonialCard({ quote, author, role, company, image }: TestimonialCardProps) {
  return (
    <div className="flex flex-col p-6 space-y-4 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <div className="flex-1">
        <p className="italic text-gray-600 dark:text-gray-300">"{quote}"</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image src={image || "/placeholder.svg?height=48&width=48"} alt={author} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  )
}
