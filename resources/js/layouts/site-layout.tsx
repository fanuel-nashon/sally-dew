import SiteFooter from '@/components/site/site-footer';
import SiteHeader from '@/components/site/site-header';
import type { ReactNode } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-paper font-body text-ink antialiased">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
        </div>
    );
}