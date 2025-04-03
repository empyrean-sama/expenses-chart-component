import data from './data.json';

interface IEntry {
    day: string,
    amount: number
}

const barGraph = document.getElementById('bar-graph') as HTMLDivElement;
const barTemplate = document.getElementById('bar-template') as HTMLTemplateElement;

const largestValue = data.reduce((prevValue, currentValue) => Math.max(prevValue, currentValue.amount), 0)
data.forEach((entry: IEntry) => {
    const node = barTemplate.content.cloneNode(true) as DocumentFragment;
    (node.querySelector('.day-name') as HTMLDivElement).textContent = entry.day;
    (node.querySelector('.bar-container') as HTMLDivElement).style.flexBasis = `${((100 * entry.amount) / largestValue) * (66/100)}%`;
    (node.querySelector('.tag') as HTMLDivElement).textContent = `$${entry.amount}`;

    if(entry.amount === largestValue) {
        (node.querySelector('.bar-container') as HTMLDivElement).classList.add('cyan');
    }

    (node.querySelector('.bar-container') as HTMLDivElement).addEventListener('click', () => {
        (barGraph.querySelector(`.bar[data-day="${entry.day}"] .tag`) as HTMLDivElement).classList.toggle('show')
    });

    barGraph.appendChild(node);
    (barGraph.lastElementChild as HTMLElement).dataset['day'] = entry.day;
})