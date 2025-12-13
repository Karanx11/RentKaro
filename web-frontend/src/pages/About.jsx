import NavBar from "../components/NavBar";

function About() {
  return (
    <>
      <NavBar />

      <div
        className="
          w-full min-h-screen 
          bg-gray-500/10 backdrop-blur-lg
          px-6 sm:px-10 md:px-20 py-32
        "
      >

        <div className="max-w-6xl mx-auto flex flex-col gap-12">

          {/* BOX 1 — PAGE TITLE */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl 
              border border-gray-500/30 
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
              rounded-3xl p-10 text-center
            "
          >
            <h1 className="text-5xl font-extrabold text-black">
              About RentKaro
            </h1>

            <p className="text-gray-700 text-lg mt-3 max-w-2xl mx-auto">
              RentKaro is a modern platform that helps you Rent, Sell, and Earn effortlessly.
              We bring convenience, affordability, and accessibility to everyone.
            </p>
          </div>

          {/* BOX 2 — MISSION */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl 
              border border-gray-500/30 
              rounded-3xl p-10
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            "
          >
            <h2 className="text-3xl font-bold text-black mb-4">Our Mission</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              At RentKaro, our mission is to make renting more affordable and reduce the need
              for unnecessary purchases.  
              <br /><br />
              Everyone owns something others need. Our platform connects people so items can be 
              shared, rented, and reused — promoting a smart and environment-friendly lifestyle.
            </p>
          </div>

          {/*  BOX 3 — FEATURES  */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl 
              border border-gray-500/30 
              rounded-3xl p-10
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            "
          >
            <h2 className="text-3xl font-bold text-black mb-6 text-center">
              Why Choose RentKaro?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

              <div className="p-6 bg-white/60 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold text-black">✔ Easy to Use</h3>
                <p className="text-gray-800 mt-2">
                  Post or rent items in just a few clicks.
                </p>
              </div>

              <div className="p-6 bg-white/60 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold text-black">✔ Save Money</h3>
                <p className="text-gray-800 mt-2">
                  Rent expensive items instead of buying.
                </p>
              </div>

              <div className="p-6 bg-white/60 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold text-black">✔ Earn from Idle Items</h3>
                <p className="text-gray-800 mt-2">
                  Turn unused things into income.
                </p>
              </div>

              <div className="p-6 bg-white/60 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold text-black">✔ Secure & Verified</h3>
                <p className="text-gray-800 mt-2">
                  Verified users and safe interactions.
                </p>
              </div>

            </div>
          </div>

          {/*  BOX 4 — TEAM  */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl 
              border border-gray-500/30 
              rounded-3xl p-10
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            "
          >
            <h2 className="text-3xl font-bold text-black text-center mb-6">
              Meet the Team
            </h2>

            <div className="flex justify-center">
              <div
                className="
                  bg-white/60 border border-gray-400
                  rounded-2xl shadow-md px-8 py-6
                  text-center
                "
              >
                <img
                  src="https://i.imgur.com/6VBx3io.png"
                  className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
                  alt="profile"
                />

                <h3 className="text-xl font-bold text-black mt-3">
                  Karan Sharma
                </h3>

                <p className="text-gray-700">Founder & Lead Developer</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default About;
