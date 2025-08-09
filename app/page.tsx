"use client";
export const runtime = "edge";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Flame,
  Rocket,
  Shield,
  Zap,
  Wand2,
  Star,
  Timer,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

/* ========================================================================
   DATA
   ===================================================================== */
const FEATURES = [
  {
    icon: Flame,
    title: "Результат за 60 минут",
    text: "Создаю и внедряю при вас — без недель ожидания и бесконечных согласований.",
  },
  {
    icon: Zap,
    title: "Цена 19.99$",
    text: "Минимум воды, максимум эффекта. Платите только за ощутимый результат.",
  },
  {
    icon: Shield,
    title: "Без фриланс-лотереи",
    text: "Никаких случайных подрядчиков — управляемые AI‑агенты закрывают задачу под ваш оффер.",
  },
];

const BULLETS = [
  "Секции и тексты, готовые к запуску",
  "10–30 визуалов/баннеров в рамках сессии",
  "A/B‑варианты и мини‑гайд по масштабированию",
];

const FAQS = [
  {
    q: "Почему AI‑агенты, а не обычные дизайнеры/креаторы?",
    a: "Цель — продажи и скорость. Связка промпт‑инженера и AI‑агентов генерирует десятки вариантов за минуты, мы отбираем сильные и сразу внедряем.",
  },
  {
    q: "Что я получу через 60 минут?",
    a: "Готовые тексты и визуалы, собранные блоки для лендинга, доступы к макетам и краткий гайд по дальнейшей генерации.",
  },
  {
    q: "Нужны доступы к моим системам?",
    a: "Нет. Работаем в песочнице/Figma/вашем предпросмотре. По желанию — прямое внедрение через Git PR.",
  },
];

const MARQUEE_ITEMS = [
  { label: "Гарантия рефанда", icon: Shield },
  { label: "AI‑агенты в продакшене", icon: Wand2 },
  { label: "Результат за 60 минут", icon: Timer },
  { label: "A/B сразу", icon: Zap },
  { label: "Цена 19.99$", icon: Flame },
];

const TESTIMONIALS = [
  {
    name: "Антон К.",
    role: "SaaS",
    text: "За 90 минут собрали геро‑секцию и 15 баннеров. Конверсия выросла в 2.1 раза.",
    stars: 5,
  },
  {
    name: "Мария Л.",
    role: "E‑com",
    text: "Сгенерили 20 креативов, уронили CPL на 37%. Быстро и по делу.",
    stars: 5,
  },
  {
    name: "Игорь П.",
    role: "Курс",
    text: "В онлайне сразу делали правки — без вечных согласований.",
    stars: 5,
  },
  {
    name: "София Р.",
    role: "Ивенты",
    text: "Первые лиды в тот же день. Рекомендую.",
    stars: 5,
  },
];

/* ========================================================================
   UTILS / SMALL ATOMS
   ===================================================================== */
function MetricCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-white/10 p-4 bg-black/30">
      <div className="text-2xl font-bold text-white">{k}</div>
      <div className="text-neutral-300">{v}</div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <Icon className="h-5 w-5 text-rose-500" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-neutral-300">{text}</CardContent>
    </Card>
  );
}

/* ========================================================================
   MARQUEE (fixed, seamless)
   ===================================================================== */
function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/5">
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul
          className="flex gap-8 px-6 py-2 text-sm text-neutral-200 will-change-transform"
          style={{
            animation: "marquee 24s linear infinite",
            width: "max-content",
          }}
        >
          {MARQUEE_ITEMS.map(({ label, icon: Icon }, i) => (
            <li key={`m1-${i}`} className="flex items-center gap-2">
              <Icon className="size-4 text-rose-400" /> {label}
              <span className="mx-4 h-1 w-1 rounded-full bg-white/30" />
            </li>
          ))}
          {MARQUEE_ITEMS.map(({ label, icon: Icon }, i) => (
            <li
              key={`m2-${i}`}
              className="flex items-center gap-2"
              aria-hidden="true"
            >
              <Icon className="size-4 text-rose-400" /> {label}
              <span className="mx-4 h-1 w-1 rounded-full bg-white/30" />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

/* ========================================================================
   TESTIMONIALS CAROUSEL (fixed version)
   ===================================================================== */
function AutoCarousel() {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  const count = TESTIMONIALS.length;
  const [paused, setPaused] = useState(false);

  if (count === 0) return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 3500);
    return () => clearInterval(id);
  }, [count, paused, prefersReduced]);

  useEffect(() => {
    controls.start({
      x: `-${index * (100 / count)}%`,
      transition: { type: "tween", duration: 0.6 },
    });
  }, [index, count, controls]);

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="text-white font-semibold flex items-center gap-2">
          <Star className="size-4 text-yellow-400" /> Отзывы
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-md px-2 py-1 text-xs text-neutral-300 hover:bg-white/10"
          >
            ←
          </button>
          <div className="text-xs text-neutral-400 hidden sm:block">
            {prefersReduced
              ? "Ручная прокрутка"
              : paused
              ? "Пауза"
              : "Автопрокрутка"}
          </div>
          <button
            onClick={next}
            className="rounded-md px-2 py-1 text-xs text-neutral-300 hover:bg-white/10"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div
          animate={controls}
          className="flex will-change-transform"
          style={{ width: `${count * 100}%`, transform: "translateZ(0)" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={`ts-${i}`}
              className="w-full shrink-0 p-5"
              style={{ width: `${100 / count}%` }}
            >
              <div className="rounded-xl border border-white/10 bg-black/30 p-5 h-full">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="size-4 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <div className="text-white text-base leading-relaxed">
                  {t.text}
                </div>
                <div className="mt-3 text-sm text-neutral-400">
                  {t.name} · {t.role}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center gap-1.5 py-3">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => goTo(i)}
            className={cn(
              "size-1.5 rounded-full",
              i === index ? "bg-white" : "bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ========================================================================
   NAVBAR
   ===================================================================== */
function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-rose-500" />
          <span className="font-bold tracking-tight text-white">
            MAGIC PROMPT
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white border-white/10"
          >
            LIVE
          </Badge>
          <Button
            size="sm"
            className="group bg-white text-black hover:bg-white/90"
          >
            Забронировать сессию{" "}
            <ArrowRight className="ml-1 h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
      <Separator className="bg-white/10" />
    </header>
  );
}

/* ========================================================================
   HERO
   ===================================================================== */
function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Badge className="mb-4 bg-rose-600 hover:bg-rose-500 text-white">
            Передовые технологии. Революционные AI‑агенты.
          </Badge>
          <h1 className="text-4xl/tight md:text-6xl/tight font-extrabold tracking-tight text-white">
            Продающий контент и лендинги{" "}
            <span className="text-rose-400">за 60 минут</span>
          </h1>
          <p className="mt-4 text-neutral-200 text-lg md:text-xl max-w-prose">
            Вы подключаете управляемых AI‑агентов и промпт‑инженера. Через 60
            минут получаете готовые материалы под ваш оффер.
          </p>
          <ul className="mt-6 grid gap-2 text-neutral-300">
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" /> Готовые блоки под
              ваш стек
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" /> Два A/B‑варианта в
              рамках сессии
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" /> Визуалы для рекламы
              сразу
            </li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="bg-rose-600 hover:bg-rose-500 text-white"
            >
              Забронировать на сегодня · 19.99${" "}
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Посмотреть кейсы <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 text-sm text-neutral-400">
            Свободные слоты: сегодня 19:00, 21:00
          </div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2 text-white">
              Что получите за 60 минут
            </CardTitle>
            <p className="text-sm text-neutral-300">
              Осязаемые артефакты, которые можно сразу пускать в трафик.
            </p>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {[
              { k: "Герой‑блок", v: "H1, подзаголовок, CTA" },
              { k: "3 УТП", v: "кратко и продающе" },
              { k: "10–20 баннеров", v: "для тестов в рекламе" },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-xl border border-white/10 p-4 bg-black/30"
              >
                <div className="text-lg font-bold text-white">{m.k}</div>
                <div className="text-neutral-300">{m.v}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ========================================================================
   FEATURES
   ===================================================================== */
function FeaturesSection() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 pb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <FeatureCard
            key={f.title}
            icon={f.icon}
            title={f.title}
            text={f.text}
          />
        ))}
      </div>
    </section>
  );
}

/* ========================================================================
   TESTIMONIALS SECTION
   ===================================================================== */
function TestimonialsSection() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <AutoCarousel />
      </div>
    </section>
  );
}

/* ========================================================================
   OFFER
   ===================================================================== */
function OfferSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-16 grid lg:grid-cols-2 gap-8 items-start">
        <Card className="bg-gradient-to-b from-white/5 to-transparent border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-white">
              <Rocket className="h-5 w-5 text-rose-500" /> LIVE‑сессия:
              результат за 60 минут
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="grid gap-2 text-neutral-200">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500" /> {b}
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-white/10 p-4 bg-black/30">
              <div className="text-sm text-neutral-400">
                Пакет "LIVE 60 MIN"
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1 text-white">
                19.99$ / 60 минут
              </div>
              <div className="text-neutral-300">
                Рефанд — если нет видимого результата к концу первой сессии.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="bg-white/10 text-white">AI‑агенты</Badge>
                <Badge className="bg-white/10 text-white">Исходники</Badge>
                <Badge className="bg-white/10 text-white">2 A/B‑варианта</Badge>
                <Badge className="bg-white/10 text-white">Дорожная карта</Badge>
              </div>
              <Button
                size="lg"
                className="mt-4 w-full bg-white text-black hover:bg-white/90"
              >
                Забронировать слот · 19.99$
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-rose-500" /> Кейс‑метрики
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              {[
                { k: "+68%", v: "CTR баннеров" },
                { k: "-37%", v: "CPL в таргете" },
                { k: "x2.1", v: "Конверсия лендинга" },
              ].map((m) => (
                <MetricCard key={m.v} k={m.k} v={m.v} />
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wand2 className="h-5 w-5 text-rose-500" /> FAQ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div
                  key={q}
                  className="border-b border-white/10 pb-4 last:border-0"
                >
                  <div className="font-semibold text-white">{q}</div>
                  <div className="text-neutral-300 mt-1">{a}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================
   FOOTER CTA
   ===================================================================== */
function FooterCTA() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="text-2xl font-bold tracking-tight text-white">
            19.99$ · 60 минут · результат сегодня
          </div>
          <div className="text-neutral-300">
            Один созвон. Управляемые AI‑агенты. Осязаемые артефакты и метрики.
          </div>
        </div>
        <div className="flex gap-3 md:justify-end">
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-500 text-white"
          >
            Забронировать · 19.99$
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Портфолио
          </Button>
        </div>
      </div>
    </footer>
  );
}

/* ========================================================================
   STICKY BAR (mobile CTA)
   ===================================================================== */
function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur p-3 flex items-center justify-between">
          <div className="text-sm text-neutral-200">
            Свободно сегодня:{" "}
            <span className="text-white font-semibold">19:00, 21:00</span>
          </div>
          <Button className="bg-rose-600 hover:bg-rose-500 text-white">
            19.99$ · Забронировать
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   ROOT PAGE
   ===================================================================== */
export default function AggressivePromoLanding() {
  return (
    <div className="min-h-dvh w-full bg-black text-white relative overflow-hidden font-sans">
      {/* Background blobs & grid */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_10%,#f43f5e_0%,transparent_35%),radial-gradient(circle_at_80%_0%,#22c55e_0%,transparent_20%),radial-gradient(circle_at_50%_100%,#3b82f6_0%,transparent_22%)] opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

      <Navbar />
      <MarqueeStrip />
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <OfferSection />
      <FooterCTA />
      <StickyBar />
    </div>
  );
}
