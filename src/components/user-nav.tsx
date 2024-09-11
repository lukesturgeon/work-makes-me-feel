import Link from "next/link"

export default function UserNav() {
    return (
        <nav className="w-full gap-6 font-medium flex flex-row text-sm justify-between">

            <div className="flex gap-6">

                <Link
                    href="/chat"
                    className="text-foreground transition-colors font-bold"
                >
                    Work Makes Me Feel
                </Link>

            </div>

            <a
                href="/auth/logout"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Logout
            </a>

        </nav>
    );
}
