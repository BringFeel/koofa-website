function fetchData() {
	fetch('https://api.statcord.com/v3/931401333834121246').then(response => {
		return response.json();
	}).then(data => {

		$('#servers').text(data.data[0].servers);
        $('#ru').text(`${Math.floor(data.data[0].memactive / 1048576)}Mb`);
        $('#rl').text(`${Math.floor(1024 - (data.data[0].memactive / 1048576))}Mb`);
        $('#rt').text('1024Mb');
        $('#nu').text(`${Math.floor(data.data[0].bandwidth / 1048576)}Mb`);
        $('#usr').text(data.data[0].users);
        $('#njs').text('v18.2.0');
        $('#djs').text('v13.8.1');

        if (data.error === 'false') {
        $('#status').text('Offline');
        }
        else {
        $('#status').text('Online');
        }

        if (data.message === 'You have been IP ratelimited.') {
              $('#stapi').text('You sent too many requests to the api.');
        } else {
            $('#stapi').text('');
        }

	}).catch(error => {
		console.log(error);
	});
}

fetchData();
