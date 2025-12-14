

import React from "react";
import sectionsData from "../../../../../data/sectionsData.json"; // adjust path
import Section from "./section/Section";

import AddSection from "./section/AddSection";
import AddLession from "./lession/AddLession";
import SortSection from "./section/SortSections";
import AddQuiz from "./quiz/AddQuiz";

const Curriculum = () => {
    return (
        <div className="curriculum-tab p-4 bg-white">
            {/* Action Buttons */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
                <AddSection />

                <AddLession />
                <AddQuiz />
                
                <SortSection />

            </div>

            {/* Sections List */}
            <div className="row">
                {sectionsData.map((section) => (
                    <Section key={section.id} section={section} />
                ))}
            </div>
        </div>
    );
};

export default Curriculum;
