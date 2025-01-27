import { Service } from "@/app/interface";
import { fetchConfig } from "@/app/fetchConfig";
import { ServiceContent } from "./service_content";

export async function generateStaticParams() {
  const res = await fetchConfig(`/service/slugs/`);
  if (res.data) {
    const slugs: string[] = (res.data as string[]) || [];
    return slugs.map((slug) => ({ params: { slug } }));
  } else {
    return [];
  }
}

export default async function ServiceView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetchConfig(`/service/manage/${slug}/`);

  if (res.data) {
    const service: Service = res.data as Service;

    return (
      <div className="flex flex-col items-center w-full">
        <ServiceContent service={service} />
      </div>
    );
  } else {
    return <p>OOps! Something went wrong.</p>;
  }
}
