export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB] py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold text-[#7A5C9E]">
          Shipping Policy
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Last Updated: June 2026
        </p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Order Processing
            </h2>

            <p>
              All orders are processed within 1–2 business days after successful
              payment confirmation or order placement. Orders are not processed
              on Sundays or public holidays.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Delivery Timeline
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Metro Cities: 2–5 Business Days</li>
              <li>Tier 2 & Tier 3 Cities: 3–7 Business Days</li>
              <li>Remote Areas: 5–10 Business Days</li>
            </ul>

            <p className="mt-4">
              Delivery timelines are estimates and may vary due to weather,
              courier delays, festivals, or other unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Shipping Charges
            </h2>

            <p>
              Shipping charges, if applicable, will be displayed during checkout
              before payment confirmation.
            </p>

            <p className="mt-3">
              Promotional free shipping offers may be available from time to
              time and will be clearly communicated on the website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Order Tracking
            </h2>

            <p>
              Once your order is shipped, a tracking ID and courier details will
              be shared via email, SMS, or WhatsApp wherever applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Delivery Attempts
            </h2>

            <p>
              Our delivery partners may attempt delivery multiple times. If the
              package remains undelivered due to incorrect address information
              or customer unavailability, the order may be returned.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Incorrect Address
            </h2>

            <p>
              Customers are responsible for providing accurate shipping details.
              Blumyn will not be responsible for delays or failed deliveries
              caused by incorrect address information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Contact Us
            </h2>

            <div className="rounded-2xl border border-[#E8DDF3] bg-white p-6">
              <p>
                <strong>Blumyn Support</strong>
              </p>
              <p>Email: contact@blumyn.shop</p>
              <p>Phone: +91 8766589805</p>
              <p>Website: https://www.blumyn.shop/</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}