'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Breadcrumbs from "./Breadcrumbs";

function Header() {

    const { user } = useUser()

    const firstName = user?.firstName
  ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
  : '';
  return (
    <div className="flex items-center justify-between p-5">
        {
            user && (
                <h1 className="text-3xl font-medium">{firstName}{`'s`} Space</h1>
            )
        }

        <div>
            <Breadcrumbs />
        </div>

        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}
export default Header