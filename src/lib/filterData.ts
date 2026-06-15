/* ----------------------------------------------------------------------------
   AI SIDE HUSTLE FILTER — content + matching data
   ----------------------------------------------------------------------------
   This module is the SOURCE OF TRUTH for the filter's content. It is authored
   editorially (the ratings are honest judgments, not fabricated stats). Sonnet:
   build the UI + scoring around this data, do not regenerate the copy.

   Rating scales (all 1-5, documented so the UI can render legends):
     difficulty:        1 = anyone can start        5 = needs real skill
     startupCost:       1 = ~$0  2 = <$100  3 = $100-1k  4 = $1k-5k  5 = $5k+
     timeToFirstDollar: 1 = days  2 = ~2 wks  3 = ~1 mo  4 = 2-3 mo  5 = 6 mo+
     bsFactor:          1 = legit & durable         5 = mostly hype / saturated / grift

   The bsFactor is the whole point of the brand: we show it honestly on every
   result. High-bsFactor paths are NOT hidden, they are labeled.
---------------------------------------------------------------------------- */

export type Rating = 1 | 2 | 3 | 4 | 5;

export type TimeBucket = 'lt5' | '5to15' | '15to30' | '30plus';
export type BudgetBucket = 'zero' | 'lt100' | '100to1k' | '1kplus';
export type Edge = 'write' | 'code' | 'sell' | 'audience' | 'cold';
export type Speed = 'week' | 'month' | 'quarter' | 'long';
export type Goal = 'cash' | 'asset' | 'replace' | 'learn';

export interface Path {
  id: string;
  name: string;
  blurb: string;        // one honest line describing the path
  difficulty: Rating;
  startupCost: Rating;
  timeToFirstDollar: Rating;
  bsFactor: Rating;
  bestFor: string;      // who this actually fits
  realTalk: string;     // the catch nobody tells beginners
  firstStep: string;    // one concrete action
  hype: boolean;        // commonly pushed by gurus -> eligible for the "Skip these" reality check
  // matching: which answer buckets this path is a GOOD fit for
  timeFit: TimeBucket[];
  budgetFit: BudgetBucket[];
  edgeFit: Edge[];
  speedFit: Speed[];
  goalFit: Goal[];
}

/* -------------------------------------------------------------------------- */
/*  QUESTIONS                                                                  */
/*  Q3 (edge) is multi-select; the rest are single-select.                     */
/* -------------------------------------------------------------------------- */

export interface Question {
  id: 'time' | 'budget' | 'edge' | 'speed' | 'goal';
  prompt: string;
  multi: boolean;
  options: { value: string; label: string; sub?: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'time',
    prompt: 'How much time can you realistically put in each week?',
    multi: false,
    options: [
      { value: 'lt5', label: 'Under 5 hours', sub: 'Nights and weekends, barely' },
      { value: '5to15', label: '5 to 15 hours', sub: 'A real side hustle' },
      { value: '15to30', label: '15 to 30 hours', sub: 'Part-time serious' },
      { value: '30plus', label: '30+ hours', sub: 'This is the main thing' },
    ],
  },
  {
    id: 'budget',
    prompt: 'What can you put in to start, without it hurting?',
    multi: false,
    options: [
      { value: 'zero', label: '$0', sub: 'Sweat equity only' },
      { value: 'lt100', label: 'Under $100', sub: 'A few tools' },
      { value: '100to1k', label: '$100 to $1,000', sub: 'Tools plus some ad testing' },
      { value: '1kplus', label: '$1,000+', sub: 'I can fund a real test' },
    ],
  },
  {
    id: 'edge',
    prompt: 'What is your actual edge? Pick all that fit.',
    multi: true,
    options: [
      { value: 'write', label: 'I can write / make content' },
      { value: 'code', label: 'I can build / code' },
      { value: 'sell', label: 'I can talk to people / sell' },
      { value: 'audience', label: 'I already have an audience' },
      { value: 'cold', label: 'None of these yet, starting cold' },
    ],
  },
  {
    id: 'speed',
    prompt: 'How fast do you need the first dollar?',
    multi: false,
    options: [
      { value: 'week', label: 'This week', sub: 'I need cash now' },
      { value: 'month', label: 'This month' },
      { value: 'quarter', label: '1 to 3 months' },
      { value: 'long', label: 'Playing the long game', sub: 'Building an asset' },
    ],
  },
  {
    id: 'goal',
    prompt: 'What do you actually want out of this?',
    multi: false,
    options: [
      { value: 'cash', label: 'Quick cash now' },
      { value: 'asset', label: 'An asset that compounds' },
      { value: 'replace', label: 'Replace my job income' },
      { value: 'learn', label: 'Learn and experiment' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  PATHS                                                                      */
/* -------------------------------------------------------------------------- */

export const PATHS: Path[] = [
  {
    id: 'ai-automation-services',
    name: 'AI automation services',
    blurb: 'Build automations and AI workflows for small businesses still running on spreadsheets and copy-paste.',
    difficulty: 3, startupCost: 1, timeToFirstDollar: 2, bsFactor: 2,
    bestFor: 'Builders who can also send a cold DM.',
    realTalk: 'Selling the work is harder than building it. Your first three clients come from people who already know you, not from ads.',
    firstStep: 'List 10 local businesses with an obvious manual process. Offer one a free automation to earn a case study.',
    hype: false,
    timeFit: ['5to15', '15to30', '30plus'], budgetFit: ['zero', 'lt100', '100to1k'],
    edgeFit: ['code', 'sell'], speedFit: ['month', 'quarter'], goalFit: ['cash', 'replace', 'asset'],
  },
  {
    id: 'productized-ai-audit',
    name: 'Productized AI / workflow audit',
    blurb: 'Charge a flat fee to analyze someone’s workflow, content process, or automation stack and hand back a custom action plan.',
    difficulty: 3, startupCost: 1, timeToFirstDollar: 1, bsFactor: 2,
    bestFor: 'Anyone with a real result or a sharp eye and a couple of proof pieces.',
    realTalk: 'You need one piece of credible proof before strangers pay. A free audit for a known name buys the testimonial that unlocks the paid ones.',
    firstStep: 'Write a one-page offer. DM five people you can genuinely help and lead with a free mini-audit.',
    hype: false,
    timeFit: ['lt5', '5to15', '15to30'], budgetFit: ['zero', 'lt100'],
    edgeFit: ['sell', 'code', 'audience'], speedFit: ['week', 'month'], goalFit: ['cash', 'replace'],
  },
  {
    id: 'faceless-ai-content',
    name: 'Faceless AI content channels',
    blurb: 'AI voiceover plus stock or generated visuals, posted daily to YouTube, TikTok, and Reels.',
    difficulty: 3, startupCost: 2, timeToFirstDollar: 4, bsFactor: 4,
    bestFor: 'People who can stomach posting into the void for months.',
    realTalk: 'The algorithm and monetization thresholds mean most quit before dollar one. It is a volume game dressed up as a passive one.',
    firstStep: 'Pick one narrow niche and commit to 30 posts before you judge whether it works.',
    hype: true,
    timeFit: ['5to15', '15to30', '30plus'], budgetFit: ['lt100', '100to1k'],
    edgeFit: ['write', 'cold'], speedFit: ['long'], goalFit: ['asset', 'learn'],
  },
  {
    id: 'ai-info-product-no-proof',
    name: 'Selling an AI course with no track record',
    blurb: 'Selling a course or guide on making money with AI before you have actually done it yourself.',
    difficulty: 2, startupCost: 1, timeToFirstDollar: 3, bsFactor: 5,
    bestFor: 'Nobody. This is the trap the whole filter exists to flag.',
    realTalk: 'If you have not gotten the result yourself, you are selling hype, and it attaches to your name permanently. Earn the result first, then teach it.',
    firstStep: 'Do not. Go get a real, documented result, then revisit teaching it.',
    hype: true,
    timeFit: ['lt5', '5to15'], budgetFit: ['zero', 'lt100'],
    edgeFit: ['write', 'audience', 'cold'], speedFit: ['week', 'month'], goalFit: ['cash'],
  },
  {
    id: 'ai-freelance-writing',
    name: 'AI-assisted freelance writing',
    blurb: 'Offer copy, blog, or editing work, using AI to move faster than manual writers.',
    difficulty: 2, startupCost: 1, timeToFirstDollar: 2, bsFactor: 3,
    bestFor: 'Strong writers who can edit AI output into something that does not read like AI.',
    realTalk: 'Raw AI writing is a race to the bottom on price. Your edge is taste and a niche, not raw speed, because everyone has the speed now.',
    firstStep: 'Pick one industry, write three sample pieces, and pitch 10 businesses in it.',
    hype: false,
    timeFit: ['5to15', '15to30'], budgetFit: ['zero', 'lt100'],
    edgeFit: ['write'], speedFit: ['month'], goalFit: ['cash', 'replace'],
  },
  {
    id: 'micro-saas-ai-tool',
    name: 'Micro-SaaS AI tool',
    blurb: 'Build a small, focused AI tool people pay a monthly fee to use.',
    difficulty: 4, startupCost: 2, timeToFirstDollar: 4, bsFactor: 2,
    bestFor: 'Developers who can also do marketing, or are willing to learn it.',
    realTalk: 'Building it is the easy 20 percent. Distribution is the other 80 and where most die. Solve a problem for buyers you can actually reach.',
    firstStep: 'Find a painful, boring problem inside a community you are already in, and build the smallest thing that fixes it.',
    hype: false,
    timeFit: ['15to30', '30plus'], budgetFit: ['lt100', '100to1k'],
    edgeFit: ['code'], speedFit: ['quarter', 'long'], goalFit: ['asset', 'replace'],
  },
  {
    id: 'niche-newsletter',
    name: 'Niche AI-curated newsletter',
    blurb: 'Curate and write a newsletter for a specific audience, using AI to research and draft faster.',
    difficulty: 2, startupCost: 1, timeToFirstDollar: 5, bsFactor: 2,
    bestFor: 'People who want a compounding asset and can write consistently.',
    realTalk: 'It pays nothing until it has scale, which takes months of unpaid consistency. The list is the asset, not any single issue.',
    firstStep: 'Pick a topic you will still care about in a year, then publish weekly for eight weeks before judging it.',
    hype: false,
    timeFit: ['lt5', '5to15'], budgetFit: ['zero', 'lt100'],
    edgeFit: ['write', 'audience'], speedFit: ['long'], goalFit: ['asset', 'learn'],
  },
  {
    id: 'ai-chatbot-rag-consulting',
    name: 'AI chatbot / RAG consulting',
    blurb: 'Build custom chatbots or RAG assistants over a business’s own docs and data.',
    difficulty: 4, startupCost: 1, timeToFirstDollar: 2, bsFactor: 2,
    bestFor: 'Technical people who can talk to non-technical owners.',
    realTalk: 'Demand is real, but you compete on trust and maintenance, not the demo. Scope tightly or you will drown in support tickets.',
    firstStep: 'Build one over a public dataset as a portfolio piece, then pitch a business with messy internal docs.',
    hype: false,
    timeFit: ['15to30', '30plus'], budgetFit: ['zero', 'lt100'],
    edgeFit: ['code', 'sell'], speedFit: ['month', 'quarter'], goalFit: ['cash', 'replace', 'asset'],
  },
  {
    id: 'ai-dropshipping',
    name: 'AI-powered dropshipping',
    blurb: 'Use AI for product research and ad creative, sell physical goods you never touch.',
    difficulty: 3, startupCost: 3, timeToFirstDollar: 3, bsFactor: 4,
    bestFor: 'People with an ad budget and a high tolerance for losing it.',
    realTalk: 'Ad spend eats beginners alive and margins are thin. The AI angle is not the edge the gurus selling courses say it is.',
    firstStep: 'If you must, validate one product with a tiny ad budget before scaling anything.',
    hype: true,
    timeFit: ['5to15', '15to30'], budgetFit: ['100to1k', '1kplus'],
    edgeFit: ['sell', 'cold'], speedFit: ['month', 'quarter'], goalFit: ['cash'],
  },
  {
    id: 'selling-prompts',
    name: 'Selling prompt packs',
    blurb: 'List prompt packs on marketplaces or your own store.',
    difficulty: 1, startupCost: 1, timeToFirstDollar: 3, bsFactor: 5,
    bestFor: 'Almost nobody now.',
    realTalk: 'The market is near dead and prices are pennies. Prompts are not defensible and models keep getting better at not needing them. Skip it.',
    firstStep: 'Spend the energy on a path with a real moat instead.',
    hype: true,
    timeFit: ['lt5'], budgetFit: ['zero'],
    edgeFit: ['write'], speedFit: ['month'], goalFit: ['cash'],
  },
  {
    id: 'ai-cold-outreach-service',
    name: 'AI cold-outreach / lead-gen service',
    blurb: 'Run AI-assisted lead-gen and cold outreach campaigns for B2B clients.',
    difficulty: 3, startupCost: 2, timeToFirstDollar: 2, bsFactor: 3,
    bestFor: 'People comfortable with sales mechanics and email compliance.',
    realTalk: 'Deliverability and spam law are real landmines. Burn a domain or break a rule and the whole system stops cold. Go slow and warm.',
    firstStep: 'Set up one warmed domain, build a 50-lead list by hand, and book one meeting before you automate anything.',
    hype: false,
    timeFit: ['5to15', '15to30'], budgetFit: ['lt100', '100to1k'],
    edgeFit: ['sell', 'code'], speedFit: ['month'], goalFit: ['cash', 'replace'],
  },
  {
    id: 'ai-mobile-app',
    name: 'AI-powered mobile app',
    blurb: 'Ship an AI-powered app on the App Store or Play Store.',
    difficulty: 4, startupCost: 3, timeToFirstDollar: 4, bsFactor: 3,
    bestFor: 'Builders who treat marketing as half the job.',
    realTalk: 'Store discovery and churn are brutal. A few win big, most get buried. Your ability to get installs matters more than the idea.',
    firstStep: 'Validate demand with a landing page and a waitlist before you write a line of the app.',
    hype: false,
    timeFit: ['30plus'], budgetFit: ['100to1k', '1kplus'],
    edgeFit: ['code'], speedFit: ['long'], goalFit: ['asset'],
  },
  {
    id: 'cohort-coaching-with-proof',
    name: 'Cohort or coaching (with real proof)',
    blurb: 'Teach a skill or run a cohort, but only after you have a real, documented result.',
    difficulty: 3, startupCost: 1, timeToFirstDollar: 4, bsFactor: 3,
    bestFor: 'People who already did the thing and can show the receipts.',
    realTalk: 'This is the legit cousin of the course trap. The only difference is proof. No proof, no business, just risk to your name.',
    firstStep: 'Document a result you already have, in public, then offer to walk a few people through exactly how.',
    hype: false,
    timeFit: ['5to15', '15to30'], budgetFit: ['zero', 'lt100'],
    edgeFit: ['audience', 'sell', 'write'], speedFit: ['quarter'], goalFit: ['asset', 'replace'],
  },
  {
    id: 'ai-for-local-trade',
    name: 'AI for an existing local trade',
    blurb: 'Bolt AI and automation onto a boring local service business that has almost no online competition.',
    difficulty: 3, startupCost: 2, timeToFirstDollar: 2, bsFactor: 1,
    bestFor: 'People near an industry that still runs on phone calls and paper.',
    realTalk: 'The least sexy path on this list and one of the most reliable. Low competition precisely because nobody posts about it.',
    firstStep: 'Find one local business drowning in admin and offer to automate the single worst part of their week.',
    hype: false,
    timeFit: ['5to15', '15to30', '30plus'], budgetFit: ['lt100', '100to1k'],
    edgeFit: ['code', 'sell', 'cold'], speedFit: ['month', 'quarter'], goalFit: ['cash', 'replace', 'asset'],
  },
  {
    id: 'ai-seo-affiliate',
    name: 'AI SEO / affiliate content sites',
    blurb: 'Build content sites that rank and earn from ads or affiliate links, drafted with AI.',
    difficulty: 3, startupCost: 2, timeToFirstDollar: 5, bsFactor: 4,
    bestFor: 'Patient people who understand SEO is now a moving target.',
    realTalk: 'Google’s updates have wiped out mass AI content sites. Slow, risky, and nothing like the layup it was a few years ago.',
    firstStep: 'If you try it, build genuine first-hand expertise into the content, or do not bother.',
    hype: true,
    timeFit: ['5to15', '15to30'], budgetFit: ['lt100', '100to1k'],
    edgeFit: ['write'], speedFit: ['long'], goalFit: ['asset'],
  },
  {
    id: 'ai-training-gig-work',
    name: 'AI training / RLHF gig work',
    blurb: 'Paid work reviewing and rating AI outputs on training and data-labeling platforms.',
    difficulty: 1, startupCost: 1, timeToFirstDollar: 1, bsFactor: 2,
    bestFor: 'Anyone who needs real money this week with zero startup cost.',
    realTalk: 'It is a job, not a business, and the ceiling is low. But it pays fast and teaches you how models actually behave, which is worth something.',
    firstStep: 'Apply to a couple of reputable platforms today and treat it as cash plus education, not a future.',
    hype: false,
    timeFit: ['lt5', '5to15'], budgetFit: ['zero'],
    edgeFit: ['cold', 'write'], speedFit: ['week'], goalFit: ['cash', 'learn'],
  },
];

/* -------------------------------------------------------------------------- */
/*  SCORING SPEC (implement in the page; see AI_SIDE_HUSTLE_FILTER_PLAN.md)     */
/*  Weights are data so they can be tuned without touching logic.              */
/* -------------------------------------------------------------------------- */

export const WEIGHTS = {
  time: 2,
  budget: 2,
  edgePerMatch: 3, // edge is the strongest signal; multiply by count of overlapping edges
  speed: 2,
  goal: 2,
} as const;

export const RATING_LEGEND = {
  difficulty: ['', 'Anyone can start', 'Easy', 'Moderate', 'Hard', 'Needs real skill'],
  startupCost: ['', '~$0', 'Under $100', '$100 to $1k', '$1k to $5k', '$5k+'],
  timeToFirstDollar: ['', 'Days', '~2 weeks', '~1 month', '2 to 3 months', '6 months+'],
  bsFactor: ['', 'Legit and durable', 'Mostly real', 'Mixed', 'Lots of hype', 'Mostly grift'],
} as const;
