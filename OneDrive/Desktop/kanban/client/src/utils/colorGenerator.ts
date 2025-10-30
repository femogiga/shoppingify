


export const colorGenerator = (index)=>{
    switch (index) {
        case 0: return '#009efa'
        case 1: return '#ff8066'
        case 2: return '#00c9a7'
        default:  {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const a = (Math.random() * 0.8 + 0.2).toFixed(2); 
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
    }
}
