import { formatTzs } from '@/lib/format';
import type { Product } from '@/types/product';
import { Link } from '@inertiajs/react';

export default function ProductCard({ product }: { product: Product }) {
    const href = `/shop/${product.slug}`;

    return (
        <article className="group flex flex-col overflow-hidden rounded-3xl bg-cream">
            <Link href={href} className="relative block aspect-square bg-paper" tabIndex={-1} aria-hidden="true">
                {product.image && (
                    <img
                        src={product.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain p-7 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                )}
                {product.badge && (
                    <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1.5 text-[13px] font-semibold text-ink">
                        {product.badge}
                    </span>
                )}
                {!product.in_stock && (
                    <span className="absolute top-4 right-4 rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold text-paper">Sold out</span>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-2 p-6">
                <h2 className="font-display text-2xl font-medium">
                    <Link href={href} className="hover:text-honey">
                        {product.name}
                    </Link>
                </h2>
                {product.tagline && <p className="text-[15px] text-muted-ink">{product.tagline}</p>}

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <p className="flex items-baseline gap-2">
                        <span className="font-display text-[22px]">{formatTzs(product.price)}</span>
                        {product.compare_at_price && (
                            <s className="text-sm text-muted-ink">
                                <span className="sr-only">Was </span>
                                {formatTzs(product.compare_at_price)}
                            </s>
                        )}
                    </p>
                    <Link
                        href={href}
                        className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] font-semibold text-paper transition-colors hover:bg-honey"
                    >
                        View
                        <span className="sr-only"> {product.name}</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}