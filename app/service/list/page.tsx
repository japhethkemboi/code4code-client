import { ServiceSkeleton } from "./skeleton";
import { getServices } from "@/app/utils";
import { ServiceTile } from "./service_tile";

export default async function Services() {
  const res = await getServices({});

  let services = null;

  if (res.services) {
    services = res.services || [];
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col max-w-7xl gap-4 pt-28 p-4 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h1 className="text-6xl font-extralight">Our Services</h1>
        <p className="font-extralight opacity-80">
          At CODE4CODE, we offer tailor-made software solutions designed to empower your business. Our expert team
          crafts custom experiences that help your company thrive. Explore our services below and let&apos;s create
          something extraordinary together.
        </p>
      </div>
      <div className="flex flex-col grow gap-12 w-full max-w-7xl p-4">
        {services ? (
          services.length > 1 ? (
            services.map((service) => <ServiceTile key={service.slug} service={service} />)
          ) : (
            <p>No service posted at the moment</p>
          )
        ) : (
          <>
            {Array.from({ length: parseInt("5") }).map((_, index) => (
              <ServiceSkeleton key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
