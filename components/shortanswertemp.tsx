export default function shortanswertemp(question: { id: string; title: string; }) {
  return `<div style={{margin:'8px 0'}}>${question.title}: <input type="text" placeholder="Short answer" style={{width:'100%'}} /></div>`;
}
