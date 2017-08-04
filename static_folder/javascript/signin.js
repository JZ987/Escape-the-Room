function setup(){
  $('form').keypress(enterName)
}

function enterName(event){
  if (event.keyCode == 13) //enter key code = 13
    {
      event.preventDefault()
      var Username = $('#nameinput').val()
      var url = '/saveusername'
      var settings = {"type" : "POST",
                      "data" : {"username" : Username}
                     }
      jQuery.ajax(url, settings)
      $('#username').text(Username)
      $('form').remove()
      // $('#nameinput').replacewith("Welcome, " + Username + "!")
    }
  }

  $(document).ready(setup)
