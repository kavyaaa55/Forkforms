export default function shortanswertemp(question: { id: string; title: string; }) {
  return `<div className="mb-4">
    <Label htmlFor="${question.id}" className="block text-sm font-medium mb-2">
      ${question.title}
    </Label>
    <Input
      id="${question.id}"
      name="${question.id}"
      placeholder="Short answer"
      className="w-full"
    />
  </div>`;
}
