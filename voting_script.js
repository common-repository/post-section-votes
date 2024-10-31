jQuery(function() {
	jQuery(".psv-vote-link").click(function(){
		var id_parts = this.id.split("-");
		if (id_parts[2] != '' && id_parts[3] > 0 && id_parts[4] != '') {
			var vote = 1;
			if (id_parts[2] == 'minus') vote = -1;
			var post_id = id_parts[3];
			var section_name = id_parts[4];
			jQuery.ajax({
				type: 'POST', 
				url: PsvAjax.ajaxurl, // Including ajax file
				data: { "action": "post_section_voting_vote", "section_name": section_name, "vote": vote, "post_id": post_id }, 
				success: function(result){ // Show returned data using the function.
					if (result == 'ok') {
						jQuery("#response_" + section_name).html('Thank you for your vote');
						var sign = jQuery("#psv-rating-" + section_name).html().substr(0,1);
						if (sign == '+') {
							var new_rating = parseInt(jQuery("#psv-rating-" + section_name).html().substr(1)) + vote;						
						} else {
							var new_rating = parseInt(jQuery("#psv-rating-" + section_name).html()) + vote;												
						}					
						if (new_rating > 0) new_rating = '+' + new_rating;
						jQuery("#psv-rating-" + section_name).html(new_rating);
					} else {
						jQuery("#response_" + section_name).html('You have already voted for this block');					
					}
				}
			});
		}
	});
});