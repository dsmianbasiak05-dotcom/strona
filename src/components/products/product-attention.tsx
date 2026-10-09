/**
 * Small pack-style note after the "ATTENTION!" panel printed on the jar —
 * a brand joke, not product info.
 */
export function ProductAttention() {
  return (
    <aside aria-label="Attention!" className="container-x mt-16 md:mt-24">
      <div lang="en" className="flex flex-col gap-2 bg-product px-6 py-5 text-product-secondary md:flex-row md:items-baseline md:gap-6 md:px-8">
        <p className="display text-3xl leading-none md:text-4xl">Attention!</p>
        <p className="text-[15px] font-bold">Your hair might turn heads.</p>
      </div>
    </aside>
  );
}
