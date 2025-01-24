import { BsArrowLeft } from "react-icons/bs";

export default function Transform() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-screen bg-gray-50 text-gray-900 p-4 py-28 gap-20">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-4">The Future, Redefined</h1>
        <p className="text-lg lg:text-2xl text-gray-600">
          Discover how technology can elevate your business to new heights.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 max-w-4xl">
        {/* Chapter 1 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">The Cost of Standing Still</h2>
          <p className="text-gray-700 text-lg">
            Businesses that resist change often fade into irrelevance. Customers demand speed, innovation, and seamless
            experiences. The good news? You can still adapt and thrive.
          </p>
        </div>

        {/* Chapter 2 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">When Tech Meets Vision</h2>
          <p className="text-gray-700 text-lg">
            Technology amplifies your strengths. From data analytics to seamless CRM tools, it turns potential into
            exponential growth.
          </p>
        </div>

        {/* Chapter 3 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Why the Timing Is Perfect</h2>
          <p className="text-gray-700 text-lg">
            Affordable, scalable solutions are now within reach. The playing field has leveled—start building your
            future today.
          </p>
        </div>

        {/* Chapter 4 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Building a Future That’s Limitless</h2>
          <p className="text-gray-700 text-lg">
            Imagine an online presence that captivates, tools that automate, and AI insights that propel growth. The
            possibilities are endless.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col gap-4 items-center text-center">
        <h3 className="text-3xl font-bold">Your Future Awaits</h3>
        <p className="text-lg text-gray-600">
          Ready to transform your business? Book a free consultation and let’s make it happen.
        </p>
        <Button label="Get Free Consultation" />
        <Button icon={<BsArrowLeft size={24} />} label="Back" outline={true} />
      </div>
    </div>
  );
}
