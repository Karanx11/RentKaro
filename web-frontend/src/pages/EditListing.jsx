import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    price: {},
    listingType: "",
  });

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchProduct();
  }, [id]);

  /* ---------------- CHANGE HANDLER ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login");

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        price: form.price,
      }),
    });

    if (!res.ok) {
      alert("Failed to update listing");
      return;
    }

    alert("Listing updated successfully ✅");
    navigate("/my-listings");
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this listing?"
    );
    if (!confirm) return;

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Listing deleted ❌");
    navigate("/my-listings");
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-3xl mx-auto bg-gray-400/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">

          <h1 className="text-4xl font-extrabold text-black mb-10 text-center">
            Edit Listing
          </h1>

          {/* TITLE */}
          <div className="mb-6">
            <label className="block text-xl font-semibold mb-2">
              Product Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
              placeholder="Product name"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-xl font-semibold mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-4 rounded-xl bg-white/80 border shadow-md resize-none"
              placeholder="Describe your product"
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="block text-xl font-semibold mb-2">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
              placeholder="Category"
            />
          </div>

          {/* LOCATION */}
          <div className="mb-6">
            <label className="block text-xl font-semibold mb-2">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
              placeholder="City, State"
            />
          </div>

          {/* PRICING */}
<div className="mb-10">
  <label className="block text-xl font-semibold mb-3">
    Pricing
  </label>

  {form.listingType === "rent" ? (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <input
        type="number"
        placeholder="Per Day (₹)"
        value={form.price?.day || ""}
        onChange={(e) =>
          setForm({
            ...form,
            price: { ...form.price, day: Number(e.target.value) },
          })
        }
        className="px-5 py-3 rounded-xl bg-white/80 border shadow-md"
      />

      <input
        type="number"
        placeholder="Per Month (₹)"
        value={form.price?.month || ""}
        onChange={(e) =>
          setForm({
            ...form,
            price: { ...form.price, month: Number(e.target.value) },
          })
        }
        className="px-5 py-3 rounded-xl bg-white/80 border shadow-md"
      />

      <input
        type="number"
        placeholder="Per Year (₹)"
        value={form.price?.year || ""}
        onChange={(e) =>
          setForm({
            ...form,
            price: { ...form.price, year: Number(e.target.value) },
          })
        }
        className="px-5 py-3 rounded-xl bg-white/80 border shadow-md"
      />
    </div>
        ) : (
            <input
            type="number"
            placeholder="Selling Price (₹)"
            value={form.price?.sell || ""}
            onChange={(e) =>
                setForm({
                ...form,
                price: { sell: Number(e.target.value) },
                })
            }
            className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
            />
        )}
        </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-black hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-bold shadow-lg"
            >
              Save Changes
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg"
            >
              Delete Listing
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default EditListing;
