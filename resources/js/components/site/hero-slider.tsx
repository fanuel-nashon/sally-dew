import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { type ReactNode, useCallback, useEffect, useState } from 'react';

type Slide = {
    video: string;
    poster: string;
    eyebrow: string;
    title: string;
    script: string;
    body: string;
};

// Put your videos in public/videos and poster images in public/images.
// Keep each video 6–10 seconds, compressed to roughly 3–5 MB (MP4, H.264).
const slides: Slide[] = [
    {
        video: '/videos/hero-1.mp4',
        poster: '/images/hero-1.jpg',
        eyebrow: 'Turmeric, rosemary and vitamin E',
        title: 'Wake up to',
        script: 'golden skin',
        body: 'A handcrafted bar that turns your daily wash into a little ritual of glow.',
    },
    {
        video: '/videos/hero-2.mp4',
        poster: '/images/hero-2.jpg',
        eyebrow: 'Made for everyday',
        title: 'Rich lather,',
        script: 'fresh herbs',
        body: 'Rosemary oil gives every wash a clean, uplifting scent you will look forward to.',
    },
    {
        video: '/videos/hero-3.mp4',
        poster: '/images/hero-3.jpg',
        eyebrow: 'Feel the difference',
        title: 'Soft, clean,',
        script: 'radiant',
        body: 'Vitamin E helps your skin feel moisturised and smooth, wash after wash.',
    },
];

const INTERVAL_MS = 6000;

export default function HeroSlider() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [hovering, setHovering] = useState(false);
    const reduceMotion = useReducedMotion() ?? false;

    const goTo = useCallback((i: number) => {
        setIndex((i + slides.length) % slides.length);
    }, []);

    // Auto-advance, unless the visitor paused, is hovering, or prefers reduced motion.
    useEffect(() => {
        if (paused || hovering || reduceMotion) return;
        const id = window.setTimeout(() => goTo(index + 1), INTERVAL_MS);
        return () => window.clearTimeout(id);
    }, [index, paused, hovering, reduceMotion, goTo]);

    const slide = slides[index];
    const fade = { duration: reduceMotion ? 0 : 1 };

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Sally Dew soap in use"
            className="relative isolate overflow-hidden bg-ink text-paper"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* Video layer: cross-fades between slides */}
            <AnimatePresence initial={false}>
                <motion.video
                    key={slide.video}
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                    src={slide.video}
                    poster={slide.poster}
                    autoPlay={!reduceMotion}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fade}
                />
            </AnimatePresence>

            {/* Even dark tint so the white text stays readable over any video */}
            <div className="absolute inset-0 -z-10 bg-ink/55" aria-hidden="true" />

            <div className="mx-auto flex min-h-[85svh] max-w-[1240px] items-center px-6 pt-16 pb-32 md:min-h-[720px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        className="max-w-xl"
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        aria-live={paused ? 'polite' : 'off'}
                    >
                        <p className="mb-4 text-sm tracking-[0.2em] text-gold uppercase">{slide.eyebrow}</p>
                        <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[1.02] font-medium">
                            {slide.title}
                            <span className="-mt-1 block font-script text-[clamp(3.4rem,8vw,5.25rem)] leading-none font-normal text-gold">
                                {slide.script}
                            </span>
                        </h1>
                        <p className="mt-6 mb-9 max-w-md text-lg leading-relaxed text-cream">{slide.body}</p>
                        <div className="flex flex-wrap gap-3.5">
                            <Link
                                href="/shop"
                                className="inline-flex min-h-13 items-center rounded-full bg-gold px-8 font-semibold tracking-wide text-ink transition-transform hover:-translate-y-0.5"
                            >
                                Shop the bar
                            </Link>
                            <Link
                                href="/our-story"
                                className="inline-flex min-h-13 items-center rounded-full border border-paper px-8 font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
                            >
                                Our story
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute inset-x-0 bottom-7">
                <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-6">
                    <ControlButton label="Previous slide" onClick={() => goTo(index - 1)}>
                        <ChevronLeft className="size-5" aria-hidden="true" />
                    </ControlButton>

                    <div className="flex items-center">
                        {slides.map((s, i) => (
                            <button
                                key={s.video}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index ? 'true' : undefined}
                                className="flex size-11 items-center justify-center"
                            >
                                <span
                                    className={`block h-1 rounded-full transition-all duration-500 ${
                                        i === index ? 'w-10 bg-gold' : 'w-4 bg-paper/50'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <ControlButton label="Next slide" onClick={() => goTo(index + 1)}>
                        <ChevronRight className="size-5" aria-hidden="true" />
                    </ControlButton>

                    <ControlButton label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused((p) => !p)}>
                        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                    </ControlButton>

                    <span className="ml-2 font-display text-sm tracking-widest text-cream">
                        {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
}

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="flex size-12 items-center justify-center rounded-full border border-paper/60 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
            {children}
        </button>
    );
}