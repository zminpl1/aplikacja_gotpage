import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-pink-500">Got</span>
              <span className="text-2xl font-bold text-white">page</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Connecting users and businesses through a dynamic listing and business directory platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-pink-500">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-500">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-500">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-500">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-gray-400 hover:text-pink-500">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="text-gray-400 hover:text-pink-500">
                  Find Businesses
                </Link>
              </li>
              <li>
                <Link href="/create-listing" className="text-gray-400 hover:text-pink-500">
                  Create a Listing
                </Link>
              </li>
              <li>
                <Link href="/user-account" className="text-gray-400 hover:text-pink-500">
                  User Account
                </Link>
              </li>
              <li>
                <Link href="/messages" className="text-gray-400 hover:text-pink-500">
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/business-registration" className="text-gray-400 hover:text-pink-500">
                  Register Business
                </Link>
              </li>
              <li>
                <Link href="/business-dashboard" className="text-gray-400 hover:text-pink-500">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link href="/promote" className="text-gray-400 hover:text-pink-500">
                  Promote Your Business
                </Link>
              </li>
              <li>
                <Link href="/business-listings" className="text-gray-400 hover:text-pink-500">
                  Manage Listings
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-gray-400 hover:text-pink-500">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Help & Info</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-pink-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-pink-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-pink-500">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Gotpage. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/contact" className="flex items-center text-sm text-gray-500 hover:text-pink-500">
              <Mail className="h-4 w-4 mr-2" />
              contact@gotpage.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

