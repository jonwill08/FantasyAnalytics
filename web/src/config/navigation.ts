export type NavItem = {
  name: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Players",
    href: "/players",
    description: "Grades, projections, and consistency trends for every player.",
  },
  {
    name: "Lineups",
    href: "/lineups",
    description: "Build optimized lineups and track injury or bye-week adjustments.",
  },
  {
    name: "Matchups",
    href: "/matchups",
    description: "Weekly opponent scouting reports and defensive matchup scores.",
  },
  {
    name: "Insights",
    href: "/insights",
    description: "League-wide trends, market movement, and waiver recommendations.",
  },
];

export const secondaryNav: NavItem[] = [
  {
    name: "Changelog",
    href: "/changelog",
  },
  {
    name: "Roadmap",
    href: "/roadmap",
  },
];

