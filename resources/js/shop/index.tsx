import ProductCard from '@/components/site/product-card';
import SiteLayout from '@/layouts/site-layout';
import type { Product, ProductType } from '@/types/product';
import { Head } from '@inertiajs/react';
import { Gift, Smartphone, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';

type Filter = 'all' | ProductType;
type Sort = 'featured' | 'price-asc' | 'price-desc';

const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'single', label: 'Single bars' },
    { value: 'pack', label: 'Value packs' },
    { value: 'gift', label: 'Gift sets' },
];

const perks = [
    { icon: Truck, title: 'Fast delivery', text: 'Dar es Salaam in [X] days, other regions in [X] days.' },
    { icon: Smartphone, title: 'Pay your way', text: 'M-Pesa, Tigo Pesa, Airtel Money or card.' },
    { icon: Gift, title: 'Gift wrapping', text: "Add a note at checkout and we'll wrap it for you." },
];

export default function ShopIndex({ products }: { products: Product[] }) {
    const [filter, setFilter] = useState<Filter>('all');
    const [sort, setSort] = useState<Sort>('featured');

    const visible = useMemo(() => {
        const list = filter === 'all' ? products : products.filter((p) => p.type === filter);
        if (sort === 'featured') return list;
        return [...list].sort((a, b) => (sort === 'price-asc' ? a.price - b.price : b.price - a.price));
    }, [products, filter, sort]);

    return (
        <SiteLayout>
            <Head title="Shop" />

            <section className="bg-cream">
                <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-16 text-center">
                    <h1 className="font-display text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.05] font-medium">
                        Shop <span className="font-script text-[clamp(3.25rem,7vw,5.25rem)] font-normal text-honey">Sally Dew</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-ink">
                        Our golden turmeric bar, on its own, in a value pack or wrapped as a gift.
                    </p>
                </div>
            </section>

            <section className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 pt-10">
                <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter products">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            type="button"
                            onClick={() => setFilter(f.value)}
                            aria-pressed={filter === f.value}
                            className={`min-h-11 rounded-full border px-5 font-medium transition-colors ${
                                filter === f.value ? 'border-ink bg-ink text-paper' : 'border-sand bg-paper hover:border-ink'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2.5">
                    <label htmlFor="sort" className="text-[15px] text-muted-ink">
                        Sort by
                    </label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as Sort)}
                        className="min-h-11 rounded-full border border-sand bg-paper px-4"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                    </select>
                </div>
            </section>

            <section className="mx-auto max-w-[1240px] px-6 pt-10 pb-24">
                {visible.length > 0 ? (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {visible.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-sand px-6 py-16 text-center">
                        <p className="text-lg text-muted-ink">No products in this category yet.</p>
                        <button
                            type="button"
                            onClick={() => setFilter('all')}
                            className="mt-5 inline-flex min-h-11 items-center rounded-full border border-ink px-5 font-medium hover:bg-ink hover:text-paper"
                        >
                            Show all products
                        </button>
                    </div>
                )}
            </section>

            <section className="bg-ink text-cream">
                <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-14 md:grid-cols-3">
                    {perks.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="flex items-start gap-4">
                            <Icon className="size-8 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                            <div>
                                <p className="mb-1 font-display text-xl text-paper">{title}</p>
                                <p className="text-[15px]">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </SiteLayout>
    );
}