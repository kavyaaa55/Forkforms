export default function checkboxtemp(question: { id: string; title: string; options: { id: string; text: string; }[] }) {
  const optionsHtml = (question.options || [])
    .map(
      (opt) =>
        `<label style={{display:'block',marginBottom:'4px'}}><input type="checkbox" name="${question.id}" value="${opt.text}" /> ${opt.text}</label>`
    )
    .join("");
  return `<fieldset style={{margin:'8px 0'}}><legend>${question.title}</legend>${optionsHtml}</fieldset>`;
}
