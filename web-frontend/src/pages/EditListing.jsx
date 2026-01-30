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

      <div className="w-full min-h-screen bg-gray-500/10 px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto bg-gray-400/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/30">

          <h1 className="text-2xl font-bold text-black mb-6 text-center">
            Edit Listing
          </h1>

          {/* TITLE */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Product Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg bg-white/80 border text-sm"
              placeholder="Product name"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg bg-white/80 border resize-none text-sm"
              placeholder="Describe your product"
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg bg-white/80 border text-sm"
              placeholder="Category"
            />
          </div>

          {/* LOCATION */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg bg-white/80 border text-sm"
              placeholder="City, State"
            />
          </div>

          {/* PRICING */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Pricing
            </label>

            {form.listingType === "rent" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  className="px-3 py-2.5 rounded-lg bg-white/80 border text-sm"
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
                  className="px-3 py-2.5 rounded-lg bg-white/80 border text-sm"
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
                  className="px-3 py-2.5 rounded-lg bg-white/80 border text-sm"
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
                className="w-full px-3 py-2.5 rounded-lg bg-white/80 border text-sm"
              />
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg text-sm font-semibold"
            >
              Save Changes
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-semibold"
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
