
import Link from "next/link"
import SignIn from "@/components/sign-in";
import SignOut from "@/components/signout-button";
import { auth } from "@/auth";
import Image from "next/image";

export async function Header() {
    const session = await auth()
    return (
        <div className="bg-gray-200 py-2">
            <div className="container flex justify-between items-center">
                <div className="flex item-center gap-12">
                    <Link href="/" className="hover:underline flex items-center gap-1">
                       <Image src="/logo.png" alt="logo" width={50} height={50} />
                        auction.com
                    </Link>
                    <div className="flex items-center gap-8">
                        <Link href="/" className="hover:underline flex items-center gap-1">
                            All Auctions
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {session?.user?.name}
                    {session ? <SignOut /> : <SignIn />}
                </div>
            </div>
        </div>
    )
}