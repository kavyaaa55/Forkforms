export default function dropdowntemp(question: { id: string; title: string; options: { id: string; text: string; }[] }) {
  const optionsHtml = (question.options || [])
    .map((opt) => `<option value="${opt.text}">${opt.text}</option>`)
    .join("");

  return `<div className="mb-4">
    <Label htmlFor="${question.id}" className="block text-sm font-medium mb-2">
      ${question.title}
    </Label>
    <select
      id="${question.id}"
      name="${question.id}"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select an option</option>
      ${optionsHtml}
    </select>
  </div>`;
}
