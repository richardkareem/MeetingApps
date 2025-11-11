const setAva = (name) => {
    return name.charAt(0).toUpperCase()
}
const toHHMM = (dateObj) => {
    if (!dateObj) return '';
    const h = dateObj.getHours().toString().padStart(2, '0');
    const m = dateObj.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };
  
export { setAva, toHHMM}