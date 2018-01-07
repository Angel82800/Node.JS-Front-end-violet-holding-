import $ from 'jquery'
import 'whatwg-fetch'

const $newsletteBtn = $('#NewsletterButton')
const $menuBtn = $('#MenuButton')
const $pageContainer = $('#PageContainer')

const $emailForm = $('#form')

$newsletteBtn.on('click', (e) => {
	if(!$(e.currentTarget).hasClass('open')) {
		$('#email').focus()
		$(e.currentTarget).addClass('open')
	}
})

$menuBtn.on('click', (e) => {
	$pageContainer.toggleClass('open')
	$(e.currentTarget).toggleClass('open')
})

// $emailForm.on('submit', (e) => {
// 	e.preventDefault()

// 	const data = {
// 		'email': $('#email').val()
// 	}

// 	$.ajax({
// 	  type: "POST",
// 	  url: `http://violet.dev/mailchimp/add-subscriber.php?email=${data.email}`,
// 	  success: (data, response) => {
// 	  	if(response == 'success') {
// 	  		// test
// 	  	}
// 	  }
// 	})
// })


$emailForm.on('submit', (e) => {
	setTimeout(() => {
		$newsletteBtn.removeClass('open')
		$('#email').val('')
	}, 500)
})
