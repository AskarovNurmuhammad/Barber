import Image from "next/image";

export default function Section1() {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-20 grid md:grid-cols-2 items-center gap-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          BARBERSHOP <br /> WITH YOUR <br /> PERSONALITY
        </h1>
        <p className="mb-10 text-gray-300 max-w-lg">
          At Trimly, we believe everyone deserves a place to pause and feel
          welcome. That’s why we live by The Code—our promise to provide more
          than just a haircut.
        </p>

        <div className="flex items-start gap-4 mb-6">
          <span className="text-orange-500 text-2xl">✂️</span>
          <div>
            <h3 className="font-bold text-lg">PRECISION</h3>
            <p className="text-gray-400 text-sm">
              We craft each look with the utmost precision to ensure you leave
              looking your best.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-orange-500 text-2xl">🧔</span>
          <div>
            <h3 className="font-bold text-lg">AUTHENTICITY</h3>
            <p className="text-gray-400 text-sm">
              Our approach is about timeless grooming, not trends – creating
              classic styles that stand the test of time.
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[500px]">
        <Image
          src="/barbers.png"
          alt="Barbers"
          fill
          className="object-cover rounded"
        />
      </div>
    </section>
  );
}
