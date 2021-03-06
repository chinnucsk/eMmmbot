App.Views.Index = Backbone.View.extend({
    initialize: function() {
        this.images = this.options.images;
        this.render();
    },

    render: function() {
        if(this.images.length > 0) {
            var out = "<a href='/#first'>First</a> ";
            out += "<a href='/#prev/"+this.images[0].id+"'>Prev</a> ";
            out += " <a href='/#next/"+this.images[this.images.length-1].id+"'>Next</a> ";
            out += "<a href='/#last'>Last</a> ";
            out += "<div class='container'>";
            out += "<ul class='thumb'>";

            _(this.images).each(function(item) {
                out += "<li><div class=\"clip\"><a href='" + item.get('fullsize') + "' id='"+ item.get('id') +"' title='"+item.get('tags')+"'><img src='" + item.get('thumbnail') + "' /></a></div></li>";
            });
            out += "</ul>";
            out += "<div id='main_view'>";
	        out += "<div class=\"mainclip\"><a href='"+this.images[0].get('fullsize')+"' id='"+ this.images[0].get('id') +"' title='"+this.images[0].get('tags')+"' target='_blank'><img src='"+this.images[0].get('fullsize')+"' alt=\"\" /></a></div><br />";
            out += "<div>";
			out += "<input type='text' name='newtag1' id='newtag1' style='font-size: 25px; width:225px; margin: 0 10px 8px 0;' />";
			out += "<button type='button' id='btnTagAdd1' style='margin: 10px 0 0 0;'>Add Tag</button>";
			out += "<div id='tagchecklist1' class='tagchecklist'>";
			out += "<strong>Current tags:</strong>";
   			out += "<br />";
            out += "</div>";
			out += "</div>";
            out += "</div>";
		    out += "<div style='clear:left'></div>";

            out += "</div>";
        } else {
            out = "<h3>No images! <a href='#new'>Create one</a></h3>";
        }

        $(this.el).html(out);
        $('#app').html(this.el);

        $("<input value='"+this.images[0].get('tags')+"' />").addtag({
			                                                        holder_id : 'tagchecklist1',
			                                                        prefix: 't1'
		                                                        });

        $("ul.thumb li").hover(function() {
	                               $(this).find('img').addClass("hover");

	                           } , function() {
	                               $(this).find('img').removeClass("hover");
                               });

        //Swap Image on Click
	    $("ul.thumb li a").click(function() {
                                     $('#tagchecklist1').html("<strong>Current tags:</strong><br />");
                                     $("<input value='"+$(this).attr("title")+"' />").addtag({
			                                                holder_id : 'tagchecklist1',
			                                                prefix: 't1'
		                             });
                            		 $('#newtag1').val('');
		                             var mainImage = $(this).attr("href"); //Find Image Name
		                             var id = $(this).attr("id");
                                     $("#main_view a").attr({ href: mainImage });
                                     $("#main_view a").attr({ id: id });
		                             $("#main_view img").attr({ src: mainImage });
		                             return false;
	                             });

        $('#btnTagAdd1').click(function(){
		                           $('#newtag1').addtag({
			                                                holder_id : 'tagchecklist1',
			                                                prefix: 't1'
		                                                });
                                   $.ajax({
                                              type: "POST",
                                              url: "/tags/"+$("#main_view a").attr("id")+"?tags="+$('#newtag1').val(),
                                              success: function(msg){
		                                          $('#newtag1').val('');
                                              }
                                          });
	                           });
	    $('#newtag1').keydown(function(event){
		                          if ($.isenter({
			                                        event: event
		                                        })) {
			                          $('#newtag1').addtag({
				                                               holder_id: 'tagchecklist1',
				                                               prefix: 't1'
			                                               });
                                   $.ajax({
                                              type: "POST",
                                              url: "/tags/"+$("#main_view a").attr("id")+"?tags="+$('#newtag1').val(),
                                              success: function(msg){
		                                          $('#newtag1').val('');
                                              }
                                          });
			                          return false;
		                          }
	                          });
	    $('#newtag1').keypress(function(event){
		                           if ($.isenter({
			                                         event: event
		                                         })) {
			                           $('#newtag1').addtag({
				                                                holder_id: 'tagchecklist1',
				                                                prefix: 't1'
			                                                });
                                   $.ajax({
                                              type: "POST",
                                              url: "/tags/"+$("#main_view a").attr("id")+"?tags="+$('#newtag1').val(),
                                              success: function(msg){
		                                          $('#newtag1').val('');
                                              }
                                          });
			                           return false;
		                           }
	                           });
	    $('a.delbutton').click(function(e) {
                                   alert("HELLO");
		                           e.preventDefault();
                                   $.ajax({
                                              type: "DELETE",
                                              url: "/tags/"+$("#main_view a").attr("id")+"?tag="+$(this).val(),
                                              success: function(msg){
		                                          $('#newtag1').val('');
                                                  alert( "Data Saved: " + msg );
                                              }
                                          });
		                           $(this).parent().remove();
	                           });

    }
});
