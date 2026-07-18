import { profile } from "@/data/portfolio";

export type GitHubProfile = {
  public_repos: number;
  followers: number;
  avatar_url: string;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

export type GitHubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: { message: string }[] };
};

export async function fetchGitHubData(username: string) {
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
      next: { revalidate: 1800 },
    }),
  ]);

  if (!userRes.ok) throw new Error("GitHub user fetch failed");

  const user = (await userRes.json()) as GitHubProfile;
  const repos = reposRes.ok ? ((await reposRes.json()) as GitHubRepo[]) : [];
  const events = eventsRes.ok ? ((await eventsRes.json()) as GitHubEvent[]) : [];

  return { user, repos: repos.filter((r) => !r.fork).slice(0, 3), events };
}

export function buildContributionGrid() {
  const weeks = 26;
  const days = 7;
  return Array.from({ length: weeks * days }, (_, i) => ({
    id: i,
    level: (i * 7 + (i % 5)) % 5,
  }));
}

export function getLatestCommitMessage(events: GitHubEvent[]) {
  const push = events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length);
  return push?.payload?.commits?.[0]?.message ?? "Active development across AI and web projects";
}

export const githubUsername = profile.githubUsername;
