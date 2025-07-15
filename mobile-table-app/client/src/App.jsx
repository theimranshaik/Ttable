import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", id: null });

  const fetchContacts = async () => {
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    setContacts(data || []);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await supabase.from("contacts").update({ name: form.name, phone: form.phone }).eq("id", form.id);
    } else {
      await supabase.from("contacts").insert([{ name: form.name, phone: form.phone }]);
    }
    setForm({ name: "", phone: "", id: null });
    fetchContacts();
  };

  const handleDelete = async (id) => {
    await supabase.from("contacts").delete().eq("id", id);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setForm(contact);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Contacts</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input className="w-full p-2 border" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          {form.id ? "Update" : "Add"}
        </button>
      </form>
      <ul className="mt-6">
        {contacts.map((c) => (
          <li key={c.id} className="border p-2 mt-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-600">{c.phone}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-500" onClick={() => handleEdit(c)}>Edit</button>
              <button className="text-red-500" onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
