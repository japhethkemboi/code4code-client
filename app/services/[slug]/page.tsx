import { ServiceContent } from "./service_content";
import { getService, getServiceSlugs } from "../utils";
import services from "../services.json";

export async function generateStaticParams() {
  const res = await getServiceSlugs();
  return res.slugs ? res.slugs.map((slug: string) => ({ slug })) : [];
}

export default async function ServiceView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

//  const res = await getService(slug);
  const service = services.find((service) => service.slug == slug);

  if (service) {
    return (
      <div className="flex flex-col items-center w-full">
        <ServiceContent service={service} />
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p>Couldn't fetch service.</p>
      </div>
    );
}
