export default function dropdowntemp(question: { id: string; title: string; options: { id: string; text: string; }[] }) {
  const optionsHtml = (question.options || [])
    .map(
      (opt) => `<option value="${opt.text}">${opt.text}</option>`
    ).join("");
  return `<label>${question.title}: <select name="${question.id}" style={{marginLeft:'8px'}}>${optionsHtml}</select></label>`;
}
