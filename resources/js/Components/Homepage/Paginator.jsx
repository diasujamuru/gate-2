import { Link } from "@inertiajs/react";

export default function Paginator({ meta }) {
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div className="flex justify-center items-center">
            <div className="join">
                {prev && (
                    <Link href={prev} className="join-item btn">
                        «
                    </Link>
                )}
                <Link className="join-item btn">{current}</Link>
                {next && (
                    <Link href={next} className="join-item btn">
                        »
                    </Link>
                )}
            </div>
        </div>
    );
}