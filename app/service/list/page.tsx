import { ServiceTile } from "./service_tile";
import { getServices } from "../utils";

export default async function Services() {
  const res = await getServices();

  return (
    <div className="flex flex-col justify-center items-center w-full bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col justify-center items-center w-full gap-8 max-w-7xl p-4">
        <div className="flex flex-col gap-4 pt-28 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
          <h1 className="text-6xl font-extralight">Our Services</h1>
          <p className="font-extralight opacity-80">
            Our services are designed to make technology work for you. From custom software to seamless integrations, we
            build solutions that keep your business running smoothly and efficiently. Browse the list below to see how
            we can help.
          </p>
        </div>
        <div className="flex flex-col grow gap-12 w-full">
          {res.services ? (
            res.services.items.map((service) => <ServiceTile key={service.slug} service={service} />)
          ) : (
            <div className="flex w-full gap-2">
              <p className="font-extralight opacity-80">No service posted. Inquire service at</p>
              <a className="hover:underline cursor-pointer" href="mailto:contact@code4code.dev">
                contact@code4code.dev
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
