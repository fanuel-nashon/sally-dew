import HeroSlider from '@/components/site/hero-slider';
import SiteLayout from '@/layouts/site-layout';
import { Head, Link } from '@inertiajs/react';
import { Droplet, Leaf, Sun, Video } from 'lucide-react';

const benefits = ['Turmeric glow', 'Rosemary oil', 'Vitamin E care', 'Mobile money accepted'];

const ingredients = [
    {
        icon: Sun,
        name: 'Turmeric',
        text: 'The golden root long loved in beauty rituals for a bright, radiant-looking complexion.',
    },
    {
        icon: Leaf,
        name: 'Rosemary oil',
        text: 'A fresh, herbal botanical oil that gives every wash a clean, uplifting scent.',
    },
    {
        icon: Droplet,
        name: 'Vitamin E',
        text: 'A skin-loving antioxidant that helps your skin feel soft and moisturised after washing.',
    },
];

const ritual = [
    'Wet your skin and the bar with warm water.',
    'Work up a creamy lather and massage gently in circles.',
    'Rinse well, pat dry and keep the bar on a draining dish.',
];

export default function Home() {
    return (
        <SiteLayout>
            <Head title="Golden turmeric bar soap">
                <meta
                    name="description"
                    content="Sally Dew bar soap with turmeric, rosemary oil and vitamin E. Delivered across Tanzania. Pay with M-Pesa, Tigo Pesa, Airtel Money or card."
                />
            </Head>

            <HeroSlider />

            {/* Benefit strip */}
            <section className="bg-gold">
                <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-4 px-6 py-5 text-center font-display tracking-wider text-ink uppercase md:grid-cols-4 md:text-[17px]">
                    {benefits.map((b) => (
                        <li key={b}>{b}</li>
                    ))}
                </ul>
            </section>

            {/* Featured product */}
            <section className="bg-cream">
                <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-14 px-6 py-20 md:flex-row md:gap-18 md:py-28">
                    <div className="flex w-full justify-center md:flex-1">
                        <div className="flex aspect-square w-full max-w-[480px] items-center justify-center overflow-hidden rounded-full bg-paper shadow-[0_30px_60px_rgba(138,95,0,0.14)]">
                            <img
                                src="/images/sally-dew-label.png"
                                alt="Sally Dew Bar Soap label: turmeric, rosemary oils and vitamin E"
                                className="h-[92%] w-[92%] rounded-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="md:flex-1">
                        <p className="mb-3 text-sm tracking-[0.2em] text-honey uppercase">Our signature bar</p>
                        <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] font-medium">
                            Turmeric &amp; Rosemary
                            <span className="-mt-1 block font-script text-[clamp(3rem,6vw,4rem)] leading-none font-normal text-honey">Bar Soap</span>
                        </h2>
                        <p className="my-6 max-w-[480px] text-lg leading-relaxed text-muted-ink">
                            A golden everyday bar with turmeric, rosemary oil and vitamin E. Rich lather, a fresh herbal scent and skin that feels
                            soft and clean.
                        </p>
                        <div className="mb-8 flex items-baseline gap-4">
                            <span className="font-display text-4xl font-medium">[PRICE] TZS</span>
                            <span className="text-[15px] text-muted-ink">Net wt [NET WT] g</span>
                        </div>
                        <div className="flex flex-wrap gap-3.5">
                            <Link
                                href="/cart"
                                className="inline-flex min-h-13 items-center rounded-full bg-ink px-8 font-semibold text-paper transition-colors hover:bg-honey"
                            >
                                Add to cart
                            </Link>
                            <Link
                                href="/shop"
                                className="inline-flex min-h-13 items-center rounded-full border border-ink px-8 font-medium transition-colors hover:bg-ink hover:text-paper"
                            >
                                View details
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ingredients */}
            <section className="mx-auto max-w-[1240px] px-6 py-20 md:py-28">
                <div className="mb-14 text-center">
                    <p className="mb-2.5 text-sm tracking-[0.2em] text-honey uppercase">What's inside</p>
                    <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-medium">
                        Three ingredients.{' '}
                        <span className="font-script text-[clamp(2.75rem,5.5vw,4.1rem)] font-normal text-honey">Pure gold.</span>
                    </h2>
                </div>
                <div className="grid gap-7 md:grid-cols-3">
                    {ingredients.map(({ icon: Icon, name, text }) => (
                        <article key={name} className="rounded-3xl bg-cream px-8 py-10">
                            <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-gold">
                                <Icon className="size-7 text-ink" strokeWidth={1.6} aria-hidden="true" />
                            </div>
                            <h3 className="mb-3 font-display text-[28px] font-medium">{name}</h3>
                            <p className="text-[17px] leading-relaxed text-muted-ink">{text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Daily ritual */}
            <section className="bg-ink text-paper">
                <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-14 px-6 py-20 md:flex-row md:gap-16 md:py-28">
                    <div className="w-full md:flex-1">
                        {/* Replace this placeholder with a <video> once you have the close-up clip */}
                        <div className="flex aspect-[16/11] flex-col items-center justify-center gap-3.5 rounded-3xl border border-dashed border-paper/40 p-6 text-center">
                            <Video className="size-11 text-gold" strokeWidth={1.4} aria-hidden="true" />
                            <p className="text-cream">[Video: close-up of hands lathering the bar under running water]</p>
                        </div>
                    </div>
                    <div className="md:flex-1">
                        <p className="mb-2.5 text-sm tracking-[0.2em] text-gold uppercase">The daily ritual</p>
                        <h2 className="mb-9 font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-medium">
                            Wet. Lather. <span className="font-script text-[clamp(2.75rem,5.5vw,4rem)] font-normal text-gold">Glow.</span>
                        </h2>
                        <ol className="flex flex-col gap-6">
                            {ritual.map((step, i) => (
                                <li key={step} className="flex gap-5">
                                    <span className="font-display text-[34px] leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-lg leading-relaxed text-cream">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}