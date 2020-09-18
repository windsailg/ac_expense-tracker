document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.matches('.delete__btn')) {
    const id = e.target.dataset.id
    document.delete_form.action = `/record/${id}?_method=DELETE`
  }
  if (e.target.matches('.delete__btn')) {
    const id = e.target.dataset.id
    document.delete_form.action = `/record/${id}?_method=DELETE`
  }
})

$('#dateSelecter').cxCalendar()
AOS.init({
  once: true,
  duration: 400,
  easing: 'ease-in-out'
})
