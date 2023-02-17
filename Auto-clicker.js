// Get all elements in the body
const elements = document.querySelectorAll('body *');

// Add mouseover listener to each element
elements.forEach(element => {
  let intervalId = null;
  element.addEventListener('mouseover', () => {
    intervalId = setInterval(() => {
      element.click();
    }, 0);
  });
  element.addEventListener('mouseout', () => {
    clearInterval(intervalId);
  });
});
