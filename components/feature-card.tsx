import { Layout, Search, BarChart, Globe, FileText, Headphones, Shield, Zap, RefreshCw } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-10 w-10 mb-3 text-primary" }

    switch (iconName) {
      case "layout":
        return <Layout {...iconProps} />
      case "search":
        return <Search {...iconProps} />
      case "bar-chart":
        return <BarChart {...iconProps} />
      case "globe":
        return <Globe {...iconProps} />
      case "file-text":
        return <FileText {...iconProps} />
      case "headphones":
        return <Headphones {...iconProps} />
      case "shield":
        return <Shield {...iconProps} />
      case "zap":
        return <Zap {...iconProps} />
      case "refresh-cw":
        return <RefreshCw {...iconProps} />
      default:
        return <Layout {...iconProps} />
    }
  }

  return (
    <div className="flex flex-col items-center text-center p-6 space-y-2 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      {getIcon(icon)}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
