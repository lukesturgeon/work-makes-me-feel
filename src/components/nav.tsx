import Link from "next/link"

export default function Nav() {
    return (
        <nav className="w-full gap-6 font-medium flex flex-row text-sm justify-between">

            <div className="flex gap-6">

                <Link
                    href="/"
                    className="text-foreground transition-colors font-bold"
                >
                    Work Makes Me Feel
                </Link>

            </div>

            <a
                href="/login"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Login
            </a>

        </nav>
    );
}
