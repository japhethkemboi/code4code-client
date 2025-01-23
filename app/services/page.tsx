import { Button } from "../components/button";
import services from "./services.json";

export default function Services() {
  return (
    <div className="flex flex-col gap-8 pt-36 bg-black">
      <div className="flex flex-col sm:items-center sm:text-center gap-4 p-4 items-start">
        <h1 className="text-6xl font-extralight">Our Services</h1>
        <p className="font-extralight opacity-80 text-lg max-w-3xl mx-auto">
          At CODE4CODE, we offer tailor-made software solutions designed to empower your business. Our expert team
          crafts custom experiences that help your company thrive. Explore our services below and let&apos;s create
          something extraordinary together.
        </p>
      </div>

      <div className="bg-white text-black flex flex-col gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col sm:items-center items-start gap-4 p-4 border-b ${1 % 2 === 0 && "bg-gray-100"}`}
          >
            <h2 className="text-2xl sm:text-4xl font-semibold">{service.name}</h2>
            <p className="sm:text-lg opacity-80 font-extralight max-w-3xl">{service.description}</p>
            <a href={`/service/${service.slug}`} className="text-black/60 hover:underline hover:text-teal-400">
              Learn more
            </a>
            <div className="flex flex-col w-full gap-4 justify-center sm:flex-row">
              {/* <a href={`/consult?${service.slug}`}> */}
              <Button label="Get Quote" outline={true} />
              {/* </a> */}
              <Button label="Consult how this can help you" outline={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
