import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Brand</h3>
            <p className="max-w-xs text-gray-500 dark:text-gray-400">
              Transforming digital experiences for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Website Builder
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  SEO Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Brand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
