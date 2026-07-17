import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-chiffon/15 bg-milano-red-dark px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-display text-2xl text-chiffon">{profile.brandName}</p>
        <p className="text-sm text-chiffon/65">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
