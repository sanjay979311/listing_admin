import { useState, useEffect } from "react";

const Info = ({ data = {}, onChange }) => {
  const [faqs, setFaqs] = useState(
    data.faqs && data.faqs.length ? data.faqs : [{ question: "", answer: "" }]
  );

  // Debounce function to reduce unnecessary renders
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ faqs });
    }, 300); // Update parent after 300ms of inactivity

    return () => clearTimeout(timeout);
  }, [faqs, onChange]);

  const handleFaqChange = (index, field, value) => {
    setFaqs((prevFaqs) => {
      const updatedFaqs = [...prevFaqs];
      updatedFaqs[index][field] = value;
      return updatedFaqs;
    });
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    setFaqs((prev) => {
      if (prev.length === 1) return prev; // At least one FAQ
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      <h5>Course FAQs</h5>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-3 p-3 border rounded">
          <label className="form-label">FAQ Question</label>
          <input
            type="text"
            className="form-control mb-2"
            value={faq.question}
            onChange={(e) => handleFaqChange(index, "question", e.target.value)}
            placeholder="Enter FAQ question"
          />

          <label className="form-label">Answer</label>
          <textarea
            className="form-control mb-2"
            rows="2"
            value={faq.answer}
            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
            placeholder="Enter answer"
          />

          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => removeFaq(index)}
            disabled={faqs.length === 1}
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" className="btn btn-success btn-sm" onClick={addFaq}>
        <i className="fa fa-plus"></i> Add FAQ
      </button>
    </>
  );
};

export default Info;
