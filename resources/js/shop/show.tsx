import ProductCard from '@/components/site/product-card';
import SiteLayout from '@/layouts/site-layout';
import { formatTzs } from '@/lib/format';
import { whatsappOrderLink } from '@/lib/store';
import type { Product } from '@/types/product';
import { Head, Link } from '@inertiajs/react';
import { MessageCircle, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type Tab = 'description' | 'ingredients' | 'how_to_use' | 'delivery';

const MAX_QTY = 20;

export default function ProductShow({ product, related }: { product: Product; related: Product[] }) {
    const [qty, setQty] = useState(1);
    const [tab, setTab] = useState<Tab>('description');

    // Reset when moving to another product via "You may also love".
    useEffect(() => {
        setQty(1);
        setTab('description');
    }, [product.id]);

    const tabs: { value: Tab; label: string; body: string | null }[] = [
        { value: 'description', label: 'Description', body: product.description },
        { value: 'ingredients', label: 'Ingredients', body: product.ingredients },
        { value: 'how_to_use', label: 'How to use', body: product.how_to_use },
        {
            value: 'delivery',
            label: 'Delivery',
            body: 'Dar es Salaam: [X] days, [FEE] TZS (free over [AMOUNT] TZS). Other regions: [X] days via [COURIER]. Pay with M-Pesa, Tigo Pesa, Airtel Money or card.',
        },
    ];
    const activeTab = tabs.find((t) => t.value === tab)!;

    const orderMessage = `Hello Sally Dew! I'd like to order ${qty} × ${product.name} (${formatTzs(product.price * qty)}).`;

    return (
        <SiteLayout>
            <Head title={product.name}>
                {product.description && <meta name="description" content={product.description} />}
            </Head>

            <nav aria-label="Breadcrumb" className="mx-auto max-w-[1240px] px-6 pt-6 text-sm text-muted-ink">
                <Link href="/" className="hover:text-honey">
                    Home
                </Link>
                {' / '}
                <Link href="/shop" className="hover:text-honey">
                    Shop
                </Link>
                {' / '}
                <span className="text-ink" aria-current="page">
                    {product.name}
                </span>
            </nav>

            <section className="mx-auto flex max-w-[1240px] flex-col gap-12 px-6 pt-8 pb-20 md:flex-row md:gap-16">
                {/* Image */}
                <div className="md:flex-1">
                    <div className="flex aspect-square items-center justify-center rounded-[28px] bg-cream">
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-[82%] w-[82%] rounded-full object-contain shadow-[0_30px_60px_rgba(138,95,0,0.16)]"
                            />
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="md:flex-1">
                    {product.badge && (
                        <span className="mb-4 inline-block rounded-full bg-gold px-3 py-1.5 text-[13px] font-semibold text-ink">{product.badge}</span>
                    )}
                    <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] font-medium">{product.name}</h1>
                    {product.tagline && <p className="mt-1 font-script text-[clamp(2.25rem,4vw,3rem)] leading-tight text-honey">{product.tagline}</p>}

                    <p className="mt-6 flex items-baseline gap-3">
                        <span className="font-display text-4xl font-medium">{formatTzs(product.price)}</span>
                        {product.compare_at_price && (
                            <s className="text-lg text-muted-ink">
                                <span className="sr-only">Was </span>
                                {formatTzs(product.compare_at_price)}
                            </s>
                        )}
                    </p>
                    {product.net_weight_g && <p className="mt-1 text-[15px] text-muted-ink">Net wt {product.net_weight_g} g</p>}

                    {product.description && <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-muted-ink">{product.description}</p>}

                    {product.in_stock ? (
                        <>
                            <div className="mt-8 flex flex-wrap items-center gap-3.5">
                                <div className="flex items-center rounded-full border border-ink">
                                    <button
                                        type="button"
                                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                                        disabled={qty <= 1}
                                        aria-label="Decrease quantity"
                                        className="flex size-13 items-center justify-center disabled:opacity-40"
                                    >
                                        <Minus className="size-4" aria-hidden="true" />
                                    </button>
                                    <span className="min-w-9 text-center text-lg font-semibold" aria-live="polite">
                                        <span className="sr-only">Quantity </span>
                                        {qty}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                                        disabled={qty >= MAX_QTY}
                                        aria-label="Increase quantity"
                                        className="flex size-13 items-center justify-center disabled:opacity-40"
                                    >
                                        <Plus className="size-4" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Wired up to the cart in the next step */}
                                <button
                                    type="button"
                                    className="min-h-13 flex-1 basis-56 rounded-full bg-ink px-8 font-semibold text-paper transition-colors hover:bg-honey"
                                >
                                    Add to cart · {formatTzs(product.price * qty)}
                                </button>
                            </div>

                            <a
                                href={whatsappOrderLink(orderMessage)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3.5 flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-gold font-semibold text-ink transition-transform hover:-translate-y-0.5"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Order on WhatsApp
                            </a>
                        </>
                    ) : (
                        <p className="mt-8 rounded-2xl bg-cream px-5 py-4 text-muted-ink">
                            Sold out for now. Message us on WhatsApp and we'll tell you when the next batch is ready.
                        </p>
                    )}

                    <ul className="mt-7 grid grid-cols-1 gap-3 text-sm text-muted-ink sm:grid-cols-2">
                        <li className="rounded-2xl bg-cream px-4 py-3.5">Delivery in Dar: [X] days</li>
                        <li className="rounded-2xl bg-cream px-4 py-3.5">M-Pesa, Tigo Pesa, Airtel Money or card</li>
                    </ul>
                </div>
            </section>

            {/* Info tabs */}
            <section className="bg-cream">
                <div className="mx-auto max-w-[960px] px-6 py-20">
                    <div role="tablist" aria-label="Product information" className="mb-9 flex flex-wrap gap-2 border-b border-sand">
                        {tabs.map((t) => (
                            <button
                                key={t.value}
                                id={`tab-${t.value}`}
                                type="button"
                                role="tab"
                                aria-selected={tab === t.value}
                                aria-controls="tab-panel"
                                onClick={() => setTab(t.value)}
                                className={`-mb-px min-h-12 border-b-[3px] px-5 font-display text-lg tracking-wide uppercase ${
                                    tab === t.value ? 'border-gold' : 'border-transparent hover:border-sand'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="text-lg leading-[1.8] text-ink/85">
                        {activeTab.body ?? 'Details coming soon.'}
                    </div>
                </div>
            </section>

            {related.length > 0 && (
                <section className="mx-auto max-w-[1240px] px-6 py-20">
                    <h2 className="mb-9 font-display text-[clamp(2rem,4vw,2.5rem)] font-medium">
                        You may also <span className="font-script text-[clamp(2.5rem,5vw,3.25rem)] font-normal text-honey">love</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </SiteLayout>
    );
}