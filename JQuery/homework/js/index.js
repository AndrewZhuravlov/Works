(function ($) {
  const content =
    `<div class="mbox">
  <h2>Add Todo</h2>
  <form>
    <label for="add-input">New task:</label>
    <input autocomplete="off" type="text" id="add-input" />
    <button id="add-submit">Add</button>
  </form>

  <hr>

  <h2>Todo List</h2>
  <input type="text" autocomplete="off" id="search"  placeholder="Search"/>
  <ul class="list">
  </ul>
</div>`
  $.fn.todoList = function () {
    $(this).prepend(content);    
    let todos = [];
    window.onload = () =>{
      const prev = JSON.parse(localStorage.getItem('todos'));
      todos = [...prev]
      renderList(todos)
    }
    
    $('form').submit(onSubmit);
    function onSubmit(ev) {
      ev.preventDefault()
      const task = $('#add-input').val();
      
      if (!task) {
        return false;
      }

      $('#add-input').val('');
      todos.push({ done: false, text: task });
      renderList(todos);
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    $('#search').on('input', ev => {
      let searchTarget = $(ev.target).val();
      const items = JSON.parse(localStorage.getItem('todos'));
      
      if (searchTarget === '') {
        renderList(items);

        return false;
      }

      const target = items.filter(item => {
        const task = item.text;
        if (task.indexOf(searchTarget) > -1) {
          return item
        }
      });

      renderList(target);
    });

    $('ul').on('click', ev => {

      if ($(ev.target).hasClass('item-text')) {
        $(ev.target).toggleClass('done');

        todos.forEach(item => {
          if (item.text === ev.target.textContent) {
            item.done = !item.done;
          }
        });
      } else if ($(ev.target).hasClass('item-remove')) {
        const task = $(ev.target).siblings(0).text();
        $(ev.target).closest('li').remove();
        todos.forEach((item, i) => {
          if (item.text === task) {
            todos.splice(i, 1);
          }
        });
      }

      localStorage.setItem('todos', JSON.stringify(todos));

      return false;
    });

    function renderList(array) {
     
      if (!array) {
        return false;
      }

      $('.list').html('');
      array.forEach(item => {
        $('.list').prepend(`
      <li class="item">
        <span class="item-text ${item.done ? 'done' : ''}">${item.text}</span>
        <button class="item-remove">Remove</button>
      </li>`);
      })
    }
  };
})(jQuery);

$('body').todoList()
