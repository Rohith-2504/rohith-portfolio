export default function SectionHeading({ eyebrow, title, description, variant = 'red' }) {
  const isRed = variant === 'red';

  return (
    <div className="mb-14 max-w-2xl">
      <p className={`mb-4 ${isRed ? 'eyebrow-red' : 'eyebrow-dark'}`}>{eyebrow}</p>
      <h2
        className={`font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-[2.75rem] ${
          isRed ? 'heading-on-red' : 'heading-on-chiffon'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-8 sm:text-[1.05rem] ${isRed ? 'text-on-red' : 'text-on-chiffon'}`}>
          {description}
        </p>
      )}
      <div className={`mt-8 ${isRed ? 'divider-wave' : 'h-px w-24 bg-milano-red/25'}`} />
    </div>
  );
}
