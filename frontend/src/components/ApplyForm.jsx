import { useState } from "react";

export default function ApplyForm({ eventId, onSuccess, onCancel }) {
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applyMessage, setApplyMessage] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      setApplyMessage("Name and email are required.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/events/${eventId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: applicantName, email: applicantEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to apply");
      setApplyMessage("Applied successfully!");
      setApplicantName("");
      setApplicantEmail("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setApplyMessage(err.message || "Failed to apply");
    }
  };

  return (
    <form
      className="flex flex-col gap-2 mt-2 bg-gray-200 p-2 rounded"
      onSubmit={handleApply}
    >
      <input
        type="text"
        placeholder="Your Name"
        value={applicantName}
        onChange={e => setApplicantName(e.target.value)}
        className="p-1 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={applicantEmail}
        onChange={e => setApplicantEmail(e.target.value)}
        className="p-1 border rounded"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-purple-700"
        >
          Submit Application
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 cursor-pointer text-white px-3 py-1 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
      {applyMessage && (
        <div className="text-sm text-center text-red-600">{applyMessage}</div>
      )}
    </form>
  );
}
