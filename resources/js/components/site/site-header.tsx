import { Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Our story', href: '/our-story' },
    { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    // Close the mobile menu whenever the page changes.
    useEffect(() => setOpen(false), [url]);

    const isActive = (href: string) => (href === '/' ? url === '/' : url.startsWith(href));

    return (
        <>
            <div className="bg-ink px-4 py-2.5 text-center text-sm tracking-wide text-cream">
                Free delivery in Dar es Salaam on orders over [AMOUNT] TZS. Pay with M-Pesa, Tigo Pesa, Airtel Money or card.
            </div>

            <header className="sticky top-0 z-40 border-b border-sand bg-paper/95 backdrop-blur">
                <nav aria-label="Main" className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-4">
                    <Link href="/" className="flex items-baseline gap-1.5">
                        <span className="font-display text-[28px] font-medium text-ink">Sally Dew</span>
                        <span className="font-script text-[34px] text-honey">Soap</span>
                    </Link>

                    <ul className="hidden items-center gap-8 font-medium md:flex">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    aria-current={isActive(link.href) ? 'page' : undefined}
                                    className={`border-b-2 pb-0.5 transition-colors hover:text-honey ${
                                        isActive(link.href) ? 'border-gold' : 'border-transparent'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/cart"
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-4 font-medium transition-colors hover:bg-ink hover:text-paper"
                        >
                            <ShoppingBag className="size-5" aria-hidden="true" />
                            <span>Cart (0)</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setOpen((o) => !o)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
                        >
                            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                        </button>
                    </div>
                </nav>

                {open && (
                    <ul id="mobile-menu" className="border-t border-sand px-6 pt-2 pb-6 md:hidden">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    aria-current={isActive(link.href) ? 'page' : undefined}
                                    className={`block py-3 font-display text-2xl ${isActive(link.href) ? 'text-honey' : 'text-ink'}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </header>
        </>
    );
}