import Link from "next/link";
import React from "react";
import Image from "next/image";
export function AppFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10  flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="NIL"
                className="object-cover rounded-full"
                width={70}
                height={70}
              />
            </div>
            <span className="font-bold text-gray-900">Saarthi-Learn</span>
          </div>
          <p className="text-sm text-gray-600">
            Empowering rural students with AI-powered education in their native
            language.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Learning</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/courses" className="hover:text-brand-1">
                Browse Courses
              </Link>
            </li>
            <li>
              <Link href="/my-learning" className="hover:text-brand-1">
                My Learning
              </Link>
            </li>
            <li>
              <Link href="/certificates" className="hover:text-brand-1">
                Certificates
              </Link>
            </li>
            <li>
              <Link href="/progress" className="hover:text-brand-1">
                Progress Tracking
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/help" className="hover:text-brand-1">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/saarthi-buddy" className="hover:text-brand-1">
                AI Assistant
              </Link>
            </li>
            <li>
              <Link href="/community" className="hover:text-brand-1">
                Community
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-1">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/about" className="hover:text-brand-1">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-brand-1">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand-1">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-brand-1">
                Careers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>&copy; 2024 Saarthi-Learn. All rights reserved</p>
      </div>
    </footer>
  );
}
