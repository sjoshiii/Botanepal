import { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { placeOrder } = useContext(ShopContext);

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handlePlaceOrder = () => {
    const { firstName, lastName, email, street, city, state, phone } = form;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !state ||
      !phone
    ) {
      setError("Please fill in all fields before placing your order.");
      return;
    }

    // You can pass form data to placeOrder if needed
    placeOrder({ ...form, paymentMethod: method });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t border-sage font-outfit text-charcoal px-4 sm:px-8 md:px-16">
      {/* Left Side */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"D"} text2={"ELIVERY"} />&nbsp;&nbsp;&nbsp;
          <Title text1={"I"} text2={"NFORMATION"} />
        </div>

        <div className="flex gap-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="border border-sage rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-forest"
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="border border-sage rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-forest"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border border-sage rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-forest"
          type="email"
          placeholder="Email Address"
        />
        <input
          name="street"
          value={form.street}
          onChange={handleChange}
          className="border border-sage rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-forest"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-4">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border border-sage rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-forest"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="border border-sage rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-forest"
            type="text"
            placeholder="State"
          />
        </div>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="border border-sage rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-forest"
          type="number"
          placeholder="Phone Number"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Right */}
      <div className="mt-8 sm:mt-0 w-full sm:max-w-[480px]">
        <CartTotal />
        <Title text1={"P"} text2={"AYMENT"} />&nbsp;&nbsp;&nbsp;
        <Title text1={"M"} text2={"ETHOD"} />

        <div className="flex flex-col gap-4 mt-4">
          {[
            { id: "stripe", logo: assets.stripe_logo },
            { id: "razorpay", logo: assets.razorpay_logo },
            { id: "cod", label: "CASH ON DELIVERY" },
          ].map(({ id, logo, label }) => (
            <div
              key={id}
              onClick={() => setMethod(id)}
              className={`flex items-center gap-3 border border-sage p-3 px-4 rounded cursor-pointer transition ${
                method === id
                  ? "ring-2 ring-forest"
                  : "hover:ring-2 hover:ring-mint"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border border-sage rounded-full ${
                  method === id ? "bg-forest" : ""
                }`}
              ></p>
              {logo ? (
                <img className="h-10 mx-4" src={logo} alt="logo" />
              ) : (
                <p className="text-sm font-medium mx-4">{label}</p>
              )}
            </div>
          ))}
        </div>

        <div className="w-full text-end mt-8">
          <button
            onClick={handlePlaceOrder}
            className="bg-forest text-softwhite px-16 py-3 text-sm rounded hover:bg-mint hover:text-forest transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
