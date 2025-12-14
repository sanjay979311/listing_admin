import React, { useState } from "react";

const Seo = ({ initial = {}, onChange }) => {
  // optional prop initial: { keywords: [], description: "" }
  const [keywords, setKeywords] = useState(initial.keywords || []);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState(initial.description || "");

  const MAX_DESCRIPTION = 320;

  const addKeyword = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    // avoid duplicates (case-insensitive)
    if (keywords.some((k) => k.toLowerCase() === trimmed.toLowerCase())) {
      setInputValue("");
      return;
    }
    const next = [...keywords, trimmed];
    setKeywords(next);
    setInputValue("");
    if (onChange) onChange({ keywords: next, description });
  };

  const removeKeyword = (index) => {
    const next = keywords.filter((_, i) => i !== index);
    setKeywords(next);
    if (onChange) onChange({ keywords: next, description });
  };

  const handleKeyDown = (e) => {
    // Enter or comma adds keyword
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword(inputValue);
    } else if (e.key === "," ) {
      // prevent comma in input, treat as add
      e.preventDefault();
      addKeyword(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && keywords.length) {
      // backspace with empty input removes last keyword
      removeKeyword(keywords.length - 1);
    }
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_DESCRIPTION) {
      setDescription(val);
      if (onChange) onChange({ keywords, description: val });
    }
  };

  return (
    <div className="seo-tab">
      <h3 className="mb-4">SEO</h3>

      {/* Meta Keywords */}
      <div className="mb-3">
        <label htmlFor="metaKeywords" className="form-label fw-semibold">
          Meta Keywords
        </label>
        <input
          id="metaKeywords"
          type="text"
          className="form-control"
          placeholder="Write a keyword and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-describedby="metaKeywordsHelp"
        />
        <div id="metaKeywordsHelp" className="form-text">
          Press <kbd>Enter</kbd> or type a comma to add keywords. Backspace removes last.
        </div>

        {/* Keyword chips */}
        <div className="mt-2 d-flex flex-wrap gap-2" style={{ rowGap: 8 }}>
          {keywords.map((kw, i) => (
            <span
              key={i}
              className="badge rounded-pill bg-light border d-inline-flex align-items-center"
              style={{ padding: "0.35rem 0.6rem", gap: 8 }}
            >
              <span style={{ color: "#000" }}>{kw}</span>
              <button
                type="button"
                aria-label={`Remove ${kw}`}
                onClick={() => removeKeyword(i)}
                className="btn btn-sm btn-link p-0 ms-2"
                style={{ lineHeight: 0 }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Meta Description */}
      <div className="mb-3">
        <label htmlFor="metaDescription" className="form-label fw-semibold">
          Meta Description
        </label>
        <textarea
          id="metaDescription"
          name="metaDescription"
          rows="4"
          className="form-control"
          placeholder="Write a concise meta description (recommended 50–160 characters)"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="d-flex justify-content-between form-text mt-1">
          <div>Recommended: 50–160 characters</div>
          <div>
            <small>{description.length}/{MAX_DESCRIPTION}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seo;
