interface CategoryFeedbackProps {
  category: "Visual" | "Técnico" | "Estratégico";
  score: number; // de 0 a 5
}

const CategoryFeedback: React.FC<CategoryFeedbackProps> = ({ category, score }) => {
  let feedback = "";

  switch (category) {
    case "Visual":
    case "Técnico":
    case "Estratégico":
      if (score >= 4.5) feedback = "🟢 Excelente";
      else if (score >= 4) feedback = "🟢 Muy bueno";
      else if (score >= 3.5) feedback = "🟡 Bueno";
      else if (score >= 3) feedback = "🟡 Aceptable";
      else if (score >= 2) feedback = "🔴 Débil";
      else feedback = "🔴 Muy débil";
      break;

    default:
      feedback = "⚠️ Categoría no reconocida";
  }

  return (
      <p className="mt-2">{feedback}</p>
  );
};

export default CategoryFeedback;
