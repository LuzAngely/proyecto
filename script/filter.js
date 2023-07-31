export default function filteroptions(entrada, selector) {
    document.addEventListener("click", (e) => {
      if (e.target.matches(entrada)) {
        //alert(entrada);
        //alert(e.target.id);
  
        //$seleccion = e.target.id;
        //alert($seleccion);
        document.querySelectorAll(selector).forEach((ev) => {
          el.classList.contains(e.target.id)
            ? ev.classList.add("filter")
            : ev.classList.remove("filter");
        });
      }
    });
  }