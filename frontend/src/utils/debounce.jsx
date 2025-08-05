const debounce = (fn, delay) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      return fn(...args)
    }, delay)
  }
}

export default debounce