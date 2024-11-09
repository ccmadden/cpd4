document.querySelectorAll('img').forEach(img => {
    console.log("runs")
    img.onerror = function() {
      this.onerror = null; // Prevents infinite loop if default image missing
      this.src = '../js/default_image.jpg';
      this.alt = ""
    };
  });
  
  document.querySelector(".FilterButton").addEventListener("click", () => {
    document.querySelectorAll("img").forEach(image => {
        image.classList.toggle("filter");
    });
});
