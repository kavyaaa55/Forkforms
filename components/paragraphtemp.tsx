export default function paragraphtemp(question: { id: string; title: string; }) {
  return `<div style={{margin:'8px 0'}}>${question.title}: <textarea placeholder="Long answer" style={{width:'100%',minHeight:'60px'}}></textarea></div>`;
}
