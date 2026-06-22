export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB] py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold text-[#7A5C9E]">
          Refund Policy
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Last Updated: June 2026
        </p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Overview
            </h2>
            <p>
              At Blumyn, customer satisfaction is our priority. Due to the
              hygienic and personal nature of our products, certain restrictions
              apply to returns and refunds.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Non-Returnable Products
            </h2>

            <p>
              For hygiene and safety reasons, opened, used, damaged, or
              partially consumed products cannot be returned or exchanged.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Opened sanitary pad packs</li>
              <li>Used hygiene products</li>
              <li>Products damaged after delivery</li>
              <li>Products without original packaging</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Eligible Refund Cases
            </h2>

            <p>
              Refunds or replacements may be approved under the following
              circumstances:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Wrong product delivered</li>
              <li>Damaged product received</li>
              <li>Missing item in the package</li>
              <li>Order lost during transit</li>
              <li>Duplicate payment charged</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Refund Request Timeline
            </h2>

            <p>
              Customers must report issues within 48 hours of receiving the
              order. Requests received after this period may not be eligible for
              refund or replacement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Refund Processing
            </h2>

            <p>
              Once approved, refunds will be processed to the original payment
              method within 5–7 business days.
            </p>

            <p className="mt-3">
              Actual credit timelines may vary depending on the customer's bank,
              card issuer, UPI provider, or payment gateway.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Order Cancellation
            </h2>

            <p>
              Orders may be cancelled before they are packed or shipped. Once an
              order has been dispatched, cancellation requests cannot be
              accepted.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Contact For Refunds
            </h2>

            <p>
              To request a refund or replacement, please contact our support
              team with your Order ID and issue details.
            </p>

            <div className="mt-4 rounded-2xl border border-[#E8DDF3] bg-white p-6">
              <p>
                <strong>Blumyn Support</strong>
              </p>
              <p>Email: contact@blumyn.shop</p>
              <p>Phone: +91 8766589805</p>
              <p>Website: https://blumyn.vercel.app</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}