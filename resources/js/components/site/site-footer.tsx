import { Link } from '@inertiajs/react';

// Change these to your own details.
const DEVELOPER = { name: '[Your Name]', url: 'https://your-portfolio.com' };

const columns = [
    {
        heading: 'Shop',
        links: [
            { label: 'All products', href: '/shop' },
            { label: 'Turmeric & Rosemary Bar', href: '/shop' },
            { label: 'Cart', href: '/cart' },
        ],
    },
    {
        heading: 'Help',
        links: [
            { label: 'Contact us', href: '/contact' },
            { label: 'Delivery & returns', href: '/contact' },
            { label: 'Our story', href: '/our-story' },
        ],
    },
];

const social = [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'TikTok', href: 'https://tiktok.com/' },
    { label: 'WhatsApp', href: 'https://wa.me/' },
];

export default function SiteFooter() {
    return (
        <footer className="bg-ink text-cream">
            <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 pt-18 pb-10 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="flex items-baseline gap-1.5">
                        <span className="font-display text-[28px] text-paper">Sally Dew</span>
                        <span className="font-script text-[34px] text-gold">Soap</span>
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed">Golden turmeric bar soap, made with care in Tanzania.</p>
                </div>

                {columns.map((col) => (
                    <div key={col.heading} className="flex flex-col gap-2.5 text-[15px]">
                        <h2 className="font-display tracking-widest text-gold uppercase">{col.heading}</h2>
                        {col.links.map((link) => (
                            <Link key={link.label} href={link.href} className="hover:text-gold">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                ))}

                <div className="flex flex-col gap-2.5 text-[15px]">
                    <h2 className="font-display tracking-widest text-gold uppercase">Follow</h2>
                    {social.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>

            <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-white/15 px-6 pt-6 pb-9 text-sm text-cream/80">
                <span>© {new Date().getFullYear()} Sally Dew Bar Soap. We accept M-Pesa, Tigo Pesa, Airtel Money, Visa and Mastercard.</span>
                <span>
                    Need a website like this? Designed and developed by{' '}
                    <a href={DEVELOPER.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:underline">
                        {DEVELOPER.name}
                    </a>
                </span>
            </div>
        </footer>
    );
}