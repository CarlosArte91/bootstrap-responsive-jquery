/**
 * Este archivo contiene la interacción con el HTML principal.
 * Se usa JQuery para capturar los comentarios de los usuarios
 * y agregarlos a la lista de comentarios.
 */

/**
 * Esta función carga los comentarios iniciales del localStorage
 */
$(document).ready(function() {
  const initialComments = window.initialComments

  if (!localStorage.getItem('first_time')) {
    var firstTime = { loaded: true };
    localStorage.setItem('first_time', JSON.stringify(firstTime));
    localStorage.setItem('comments', JSON.stringify(initialComments));
  }

  if (localStorage.getItem('comments')) {
    const comments = JSON.parse(localStorage.getItem('comments'))

    const articleComments = $('#article-comments')

    $.each(comments, function(index, comment) {
      const newDiv = $('<div>');

      newDiv.append($('<span>').addClass('comment-users').text(comment.user));
      newDiv.append($('<p>').addClass('comment-text').text(comment.comment));
      newDiv.append($('<hr>'));

      articleComments.append(newDiv);
    });
  }
});

/**
 * Validaciones de JavaScript en los botones de las card.
 * Por ahora los botones abren un alert que muestra un mensaje
 * de proceso en construcción del lugar seleccionado.
 */
$(document).ready(function() {
  $(document).on('click', '.btn-info', function() {
    const buttonId = $(this).attr('id');

    let cardName = '';

    switch (buttonId) {
      case 'one':
        cardName = 'PARIS';
        break;

      case 'two':
        cardName = 'EL TAJ MAHAL';
        break;

      case 'three':
        cardName = 'PIRÁMIDES DE GIZA';
        break;

      case 'four':
        cardName = 'CATARATAS DEL IGUAZÚ';
        break;

      case 'five':
        cardName = 'LA ISLA DE PASCUA';
        break;

      case 'six':
        cardName = 'LA AMAZONIA';
        break;

      default:
        break;
    }

    alert(`La página con la información de ${cardName} está en proceso de construcción, por favor vuelva despues.`);
  });
});


/**
 * Esta función captura los datos del formulario y
 * agrega el nuevo comentario al principio de la lista.
 */
$(document).ready(function (){
  $(document).on('submit', '#new-comment', function(event) {
    event.preventDefault();

    let user = $('#user').val().trim();
    let comment = $('#comment').val().trim();

    /**
     * Validaciones del formulario usando JavaScript
     */
    if (user === '' || comment === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (user.length < 3) {
      alert('El nombre de usuario debe tener al menos 3 caracteres.');
      return;
    }

    if (/\d/.test(user)) {
      alert('El nombre de usuario no puede contener números.');
      return;
    }

    if (comment.length < 8) {
      alert('El comentario debe ser más extenso.');
      return;
    }

    let userName = '';
    let setUser = user.split(' ');
    setUser.forEach((element) => {
      const newElement = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      userName = userName ? `${userName} ${newElement}` : newElement;
    });

    const newComment = {
      user: userName,
      comment,
    };

    // Se carga el nuevo comentario al localStorage
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
    existingComments.unshift(newComment);
    localStorage.setItem('comments', JSON.stringify(existingComments));

    // Se insertan nuevamente los comentarios en el HTML
    const comments = JSON.parse(localStorage.getItem('comments'))

    const articleComments = $('#article-comments')
    articleComments.empty();

    $.each(comments, function(index, comment) {
      const newDiv = $('<div>');

      newDiv.append($('<span>').addClass('comment-users').text(comment.user));
      newDiv.append($('<p>').addClass('comment-text').text(comment.comment));
      newDiv.append($('<hr>'));

      articleComments.append(newDiv);
    });

    // Se limpian los datos del formulario
    this.reset();
  });
});
