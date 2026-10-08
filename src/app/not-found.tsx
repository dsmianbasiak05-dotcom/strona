import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-28 pb-20">
      <p className="label text-navy-500">Error 404</p>
      <h1 className="display mt-4 text-[26vw] leading-[0.82] md:text-[16rem]">Lost?</h1>
      <p className="mt-6 max-w-[40ch] text-lg">Tej strony nie ma. Ale Twoja fryzura wciąż może wyglądać dobrze.</p>
      <ButtonLink href="/shop" size="lg" className="mt-10" arrow>
        Shop products
      </ButtonLink>
    </div>
  );
}
