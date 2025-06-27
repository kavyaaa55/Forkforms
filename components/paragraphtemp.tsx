export default function paragraphtemp(question: { id: string; title: string; }) {
  return `<div className="mb-4">
    <Label htmlFor="${question.id}" className="block text-sm font-medium mb-2">
      ${question.title}
    </Label>
    <Textarea
      id="${question.id}"
      name="${question.id}"
      placeholder="Long answer"
      className="w-full min-h-[60px]"
    />
  </div>`;
}
