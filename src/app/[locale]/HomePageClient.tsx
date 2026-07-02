"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Sparkles,
  Ticket,
  Tag,
  Gift,
  Coins,
  Crown,
  Star,
  Shield,
  Target,
  Zap,
  Heart,
  Camera,
  Speaker,
  Tv,
  Bot,
  Skull,
  Swords,
  Gamepad2,
  TrendingUp,
  Globe,
  MessageCircle,
  Play,
  ExternalLink,
  Users,
  AlertTriangle,
  ClipboardList,
  LogIn,
  Flame,
  Rocket,
  Package,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Tools Grid 卡片 -> 对应模块 section 锚点（顺序与 en.json tools.cards 一一对应）
const SECTION_IDS = [
  "codes",
  "beginner-guide",
  "character-tier-list",
  "units-and-titans",
  "zombie-mode",
  "game-modes",
  "cens-mastery",
  "official-links",
] as const;

// 兑换码一键复制按钮（每个卡片独立 copied 状态）
function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy code ${code}`}
      className="inline-flex items-center gap-1.5 rounded-md border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.1)] px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-[hsl(var(--nav-theme)/0.2)]"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-[hsl(var(--nav-theme-light))]" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-[hsl(var(--nav-theme-light))]" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.st-blockade-battlefront.wiki";

  // 模块导航锚点点击：阻止默认跳转，使用平滑滚动
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "ST Blockade Battlefront Wiki",
        description:
          "Complete ST Blockade Battlefront Wiki covering Roblox codes, units, Titans, skins, mastery, modes, and base defense guides.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "ST Blockade Battlefront - Roblox Wave Defense Shooter",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "ST Blockade Battlefront Wiki",
        alternateName: "ST Blockade Battlefront",
        url: siteUrl,
        description:
          "Complete ST Blockade Battlefront Wiki resource hub for Roblox codes, units, Titans, skins, mastery, modes, and base defense guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "ST Blockade Battlefront Wiki - Roblox Wave Defense Shooter",
        },
        sameAs: [
          "https://www.roblox.com/games/18816315817/ST-Blockade-Battlefront",
          "https://discord.com/invite/blockade",
          "https://trello.com/b/APrD3TTL/official-skibidi-toilet-blockade-battlefront",
        ],
      },
      {
        "@type": "VideoGame",
        name: "ST Blockade Battlefront",
        gamePlatform: ["PC", "Mac", "Mobile", "Roblox"],
        applicationCategory: "Game",
        genre: ["Tower Defense", "Survival", "Action", "Battlegrounds"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 6,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "0",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/18816315817/ST-Blockade-Battlefront",
        },
      },
      {
        "@type": "VideoObject",
        name: "TRAILER OFICIAL DE ST: BLOCKADE BATTLEFRONT",
        description:
          "Blockade Battlefront trailer showcasing the Roblox wave defense shooter — deploy units and Titans to defend your base against enemy waves.",
        uploadDate: "2024-01-01",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/mTRgKQB59tk",
        url: "https://www.youtube.com/watch?v=mTRgKQB59tk",
      },
    ],
  };

  // tier list 每个 tier 的视觉强度（仅用主题色透明度，不硬编码颜色）
  const tierStyles: Record<string, { icon: any; box: string; badge: string }> = {
    S: {
      icon: Crown,
      box: "border-[hsl(var(--nav-theme)/0.6)] bg-[hsl(var(--nav-theme)/0.16)]",
      badge: "bg-[hsl(var(--nav-theme))] text-black",
    },
    A: {
      icon: Star,
      box: "border-[hsl(var(--nav-theme)/0.45)] bg-[hsl(var(--nav-theme)/0.12)]",
      badge: "bg-[hsl(var(--nav-theme)/0.9)] text-black",
    },
    B: {
      icon: Shield,
      box: "border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.09)]",
      badge: "border border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] text-[hsl(var(--nav-theme-light))]",
    },
    C: {
      icon: Target,
      box: "border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.06)]",
      badge: "border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]",
    },
    D: {
      icon: Heart,
      box: "border-border bg-white/[0.03]",
      badge: "border border-border bg-white/5 text-muted-foreground",
    },
  };

  // units 阵营图标
  const factionIcons: any[] = [Camera, Speaker, Tv, Bot, Zap];

  // zombie mode 指南卡片图标（每卡不同）
  const zombieIcons: any[] = [LogIn, Target, Users, TrendingUp, AlertTriangle];

  // game modes 模式卡片图标（每卡不同）
  const modeIcons: any[] = [Shield, Flame, Swords, Skull, Bot];

  // cens & mastery 资源图标（每资源不同）
  const censIcons: any[] = [Coins, Star, Crown, Tag, Rocket, Package];

  // official links 卡片图标（每卡不同）
  const linkIcons: any[] = [Gamepad2, Building2, MessageCircle, ClipboardList, Play];

  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-black rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/18816315817/ST-Blockade-Battlefront"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域之后（IntersectionObserver 进入视口自动播放） */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="mTRgKQB59tk"
              title="TRAILER OFICIAL DE ST: BLOCKADE BATTLEFRONT"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（位于视频区之后、Latest Updates 之前） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = SECTION_IDS[index];
              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  onClick={(e) => handleNavClick(e, sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] block"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                bg-[hsl(var(--nav-theme)/0.1)]
                                flex items-center justify-center
                                group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: ST Blockade Battlefront Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4">
              <Ticket className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                {t.modules.codes.activeLabel}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.codes.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.codes.intro}
            </p>
          </div>

          {/* Active Codes */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
            {t.modules.codes.activeCodes.map((c: any, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-4 md:p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Ticket className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                    <code className="font-mono text-sm md:text-base font-semibold break-all">
                      {c.code}
                    </code>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                      {c.reward}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.05)]">
                      {c.status}
                    </span>
                  </div>
                </div>
                <CodeCopyButton code={c.code} />
              </div>
            ))}
          </div>

          {/* Redeem Steps + Reward Types */}
          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 md:mb-10">
            <div className="p-5 md:p-6 bg-white/5 border border-border rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-base md:text-lg">
                  {t.modules.codes.redeemLabel}
                </h3>
              </div>
              <ol className="space-y-3">
                {t.modules.codes.redeemSteps.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.2)] text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-5 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-base md:text-lg">
                  {t.modules.codes.rewardLabel}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {t.modules.codes.rewardTypes.map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expired Codes */}
          <div className="scroll-reveal p-5 md:p-6 bg-white/[0.02] border border-border rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold text-base md:text-lg text-muted-foreground">
                {t.modules.codes.expiredLabel}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.modules.codes.expiredCodes.map((code: string, i: number) => (
                <code
                  key={i}
                  className="font-mono text-xs px-2.5 py-1.5 rounded-md bg-white/5 border border-border text-muted-foreground line-through decoration-muted-foreground/50"
                >
                  {code}
                </code>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: ST Blockade Battlefront Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.beginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.beginnerGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.beginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.beginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 3: ST Blockade Battlefront Character Tier List */}
      <section id="character-tier-list" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.characterTierList.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.characterTierList.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-5 md:space-y-6">
            {t.modules.characterTierList.tiers.map((tier: any, ti: number) => {
              const style = tierStyles[tier.tier] || tierStyles.D;
              const TierIcon = style.icon;
              return (
                <div
                  key={ti}
                  className={`rounded-xl border ${style.box} overflow-hidden`}
                >
                  <div className="flex flex-col gap-3 p-4 md:p-5 sm:flex-row sm:items-center sm:justify-between border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold ${style.badge}`}
                      >
                        {tier.tier}
                      </span>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">
                          {tier.label}
                        </h3>
                      </div>
                    </div>
                    <TierIcon className="w-6 h-6 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 md:p-5">
                    {tier.characters.map((ch: any, ci: number) => (
                      <div
                        key={ci}
                        className="p-4 bg-white/5 border border-border rounded-lg hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-sm md:text-base">
                            {ch.name}
                          </h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] whitespace-nowrap">
                            {ch.role}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {ch.bestUse}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 4: ST Blockade Battlefront Units and Titans */}
      <section id="units-and-titans" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.unitsAndTitans.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.unitsAndTitans.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.unitsAndTitans.factions.map((f: any, index: number) => {
              const FactionIcon = factionIcons[index] || Bot;
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <FactionIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <h3 className="font-bold text-base md:text-lg">{f.category}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{f.role}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {f.examples.map((ex: string, ei: number) => (
                      <span
                        key={ei}
                        className="text-xs px-2 py-1 rounded-md bg-white/5 border border-border"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {f.bestFor.map((b: string, bi: number) => (
                      <span
                        key={bi}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]"
                      >
                        <Check className="w-3 h-3" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 5: ST Blockade Battlefront Zombie Mode */}
      <section id="zombie-mode" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4">
              <Skull className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                {t.modules.zombieMode.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.zombieMode.title}
            </h2>
            <p className="text-base md:text-lg text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-2">
              {t.modules.zombieMode.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              {t.modules.zombieMode.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.zombieMode.cards.map((c: any, index: number) => {
              const ZombieIcon = zombieIcons[index] || Skull;
              return (
                <div
                  key={index}
                  className="flex flex-col p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ZombieIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <h3 className="font-bold">{c.name}</h3>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] whitespace-nowrap">
                      {c.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{c.description}</p>
                  <div className="mt-auto flex items-start gap-2 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)] p-3">
                    <Target className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{c.playerTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 6: ST Blockade Battlefront Game Modes and Waves */}
      <section id="game-modes" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4">
              <Swords className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                {t.modules.gameModes.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.gameModes.title}
            </h2>
            <p className="text-base md:text-lg text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-2">
              {t.modules.gameModes.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              {t.modules.gameModes.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.gameModes.modes.map((m: any, index: number) => {
              const ModeIcon = modeIcons[index] || Gamepad2;
              return (
                <div
                  key={index}
                  className="flex flex-col p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ModeIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <h3 className="font-bold text-base md:text-lg">{m.name}</h3>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] whitespace-nowrap">
                      {m.modeType}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{m.focus}</p>
                  <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.25)] text-[hsl(var(--nav-theme-light))] mb-3 self-start">
                    <Target className="w-3.5 h-3.5" />
                    {m.bestFor}
                  </div>
                  <p className="mt-auto text-xs text-muted-foreground/80 italic border-l-2 border-[hsl(var(--nav-theme)/0.3)] pl-3">
                    {m.waveNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 7: ST Blockade Battlefront Cens and Mastery */}
      <section id="cens-mastery" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4">
              <Coins className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                {t.modules.censMastery.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.censMastery.title}
            </h2>
            <p className="text-base md:text-lg text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-2">
              {t.modules.censMastery.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              {t.modules.censMastery.intro}
            </p>
          </div>

          {/* Resource table */}
          <div className="scroll-reveal overflow-hidden rounded-xl border border-border">
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-white/5 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-3">Resource</div>
              <div className="col-span-3">Used For</div>
              <div className="col-span-4">How to Get</div>
              <div className="col-span-2">Priority</div>
            </div>
            {t.modules.censMastery.resources.map((r: any, index: number) => {
              const CensIcon = censIcons[index] || Coins;
              return (
                <div
                  key={index}
                  className={`px-5 py-4 ${
                    index !== t.modules.censMastery.resources.length - 1
                      ? "border-b border-border"
                      : ""
                  } bg-white/[0.02]`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
                    <div className="col-span-3 flex items-center gap-2">
                      <CensIcon className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <span className="font-semibold text-sm md:text-base">{r.resource}</span>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground md:pl-0 pl-6">
                      {r.usedFor}
                    </div>
                    <div className="col-span-4 text-sm text-muted-foreground md:pl-0 pl-6">
                      {r.howToGet}
                    </div>
                    <div className="col-span-2 md:pl-0 pl-6">
                      <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                        {r.priority}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)] p-2.5">
                    <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{r.playerTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 8: ST Blockade Battlefront Official Links and Updates */}
      <section id="official-links" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4">
              <Globe className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                {t.modules.officialLinks.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.officialLinks.title}
            </h2>
            <p className="text-base md:text-lg text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-2">
              {t.modules.officialLinks.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              {t.modules.officialLinks.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.officialLinks.links.map((l: any, index: number) => {
              const LinkIcon = linkIcons[index] || Globe;
              return (
                <a
                  key={index}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <LinkIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <h3 className="font-bold text-base md:text-lg truncate">
                        {l.name}
                      </h3>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-[hsl(var(--nav-theme-light))] transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{l.useFor}</p>
                  <p className="mt-auto text-xs text-muted-foreground/80 italic border-l-2 border-[hsl(var(--nav-theme)/0.3)] pl-3">
                    {l.note}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section（位于模块导航与各模块之后，模板1 保留不删） */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner bottom */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/blockade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/games/18816315817/ST-Blockade-Battlefront"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.roblox}
                  </a>
                </li>
                <li>
                  <a
                    href="https://trello.com/b/APrD3TTL/official-skibidi-toilet-blockade-battlefront"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.trello}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={locale === "en" ? "/about" : `/${locale}/about`}
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? "/privacy-policy"
                        : `/${locale}/privacy-policy`
                    }
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? "/terms-of-service"
                        : `/${locale}/terms-of-service`
                    }
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "en" ? "/copyright" : `/${locale}/copyright`}
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
