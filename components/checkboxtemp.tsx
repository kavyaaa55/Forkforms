export default function checkboxtemp(question: { id: string; title: string; options: { id: string; text: string; }[] }) {
  const optionsHtml = (question.options || [])
    .map((opt) =>
      `<div key="${opt.id}" className="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          id="${opt.id}"
          name="${question.id}"
          value="${opt.text}"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <Label htmlFor="${opt.id}" className="text-sm font-normal">
          ${opt.text}
        </Label>
      </div>`
    )
    .join("");

  return `<div className="mb-4">
    <Label className="block text-sm font-medium mb-3">${question.title}</Label>
    <div className="space-y-2">
      ${optionsHtml}
    </div>
  </div>`;
}
