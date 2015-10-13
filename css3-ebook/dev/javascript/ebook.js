$(document).ready(function() {
	$('#home_content').hide()
	$('#start_content').fadeIn(1500, function() {
		$(this).fadeOut(1500, function() {
			$('#home_content').fadeIn(1500);
			$('#start_content').remove();
		})
	})

	$('.help').click(function() {
		$('#dialog').remove();
		$('.container').append('<div id="dialog" style="left:30px;">This ebook is developed only for learning purpose. Any user can use this ebook any way as he wish to use. <br /> For any type of help you can contact me directly on my email id sintu@sintupatel.in <a href="#" class="close-action"><img alt="close" src="images/close-action.png"></a></div>');
		$('#dialog').bind('click');
		return false;
	})

	$('.close').click(function() {
		window.close();
		return false;
	})

	$('body').delegate('#dialog .close-action', 'click', function() {
		$(this).parent().remove();
		return false;
	})
})

var test = function() {
	return "test";
}

var onReady = function(){
	var lessonNum;
	var pageNum;
	var pageContent;
	var pageName = '';
	var lessonName = '';
	var lessonMenu = '';
	var cPage = '';
	var cTag;
	var cLessonNum;
	var cPageNum;
	var pLessonNum;
	var pPageNum;
	var c2PageNum;
	var mLesson;
	var plessonSize = 0;

	$('#open_menu').click(function() {
		$('#menu > ul').slideToggle();
		$(this).toggleClass('active');
	})
	$('#menu ul li').click(function() {
		return false;
	})

	var ebook = {
		loadXml: function() {},
		loadMenu: function() {
			$.ajax({
				method: 'GET',
				url: 'xml/data.xml',
				dataType: 'xml',
				success: function(xml) {
					$(xml).find('lesson').each(function() {
						lessonName = $(this).attr('name');
						pageName = '';
						$(this).find('page').each(function() {
							pageName += '<li class="page"><a href="#">' + $(this).attr('name') + '</a></li>';
						})
						lessonMenu += '<li class="lesson"><a href="#"><span>' + lessonName + '</span></a><ul>' + pageName + '</ul></li>';
					})
					$('#menu > ul').append(lessonMenu);
				}
			})
		},
		currentPage: function(cpage) {
			$('#current').text(cpage);
		},
		pagination: function(cpage, totalpage) {
			$('#pagination').html(cpage + ' of ' + totalpage + ' Pages');
			var progressWidth = 100 / parseInt(totalpage);
			progressWidth = progressWidth * parseInt(cpage);
			progressWidth = progressWidth + '%';
			$('#progress').css({
				width: progressWidth
			});
		},

		currentMenu: function(lessonNum_0, pageNum_0) {
			$('#menu a').removeClass('active');
			var menuLesson = lessonNum_0;
			var menuPage = pageNum_0 - 1;
			$('#menu > ul > li').each(function() {
				var cMenuLesson = $(this).index();
				switch (menuLesson) {
					case cMenuLesson:
						{
							$(this).find('li').each(function() {
								var cMenuPage = $(this).index();
								switch (menuPage) {
									case cMenuPage:
										{
											$(this).find('a').addClass('active');
										}
										break;
								}
							});

						}
						break;

				}
			})
		},
		nextButton: function(lessonNum_0, pageNum_0) {
			$('#next').attr('lesson', lessonNum_0).attr('page', pageNum_0);
			if ((lessonNum_0 == 0) && (pageNum_0 == 1)) {
				$('#prev').addClass('hide');
				$('#next').removeClass('hide');
			} else {
				$('#prev').removeClass('hide');
			}
		},
		prevButton: function(lessonNum_0, pageNum_0) {
			$('#prev').attr('lesson', lessonNum_0).attr('page', pageNum_0);
		},
		displayData: function(lessonNum_0, pageNum_0) {
			$('.main_content').empty();
			$.ajax({
				method: "GET",
				url: "xml/data.xml",
				dataType: "xml",
				success: function(xml) {
					lessonNum = lessonNum_0;
					pageNum = pageNum_0;
					var bookSize = 0;
					$(xml).find('lesson').each(function() {
						bookSize++;
						var xmlLesson = $(this).index();
						var lessonSize = 0;
						switch (lessonNum) {
							case xmlLesson:
								{
									plessonSize = 0;
									var lessonImg = $(this).attr('imgpath');
									var lessonname = $(this).attr('name');
									$('.title').text(lessonname);
									lessonImg = "<img src=" + lessonImg + " />";
									$('.transcript').html(lessonImg);
									$(this).prev().find('page').each(function() {
										plessonSize++;
									})
									cLessonNum = xmlLesson;
									pLessonNum = xmlLesson;
									mLesson = cLessonNum;
									$(this).find('page').each(function() {
										lessonSize++;
										var xmlPage = $(this).index();
										switch (pageNum) {
											case xmlPage:
												{
													cPageNum = xmlPage + 1;
													pPageNum = xmlPage - 1;
													c2PageNum = cPageNum;
													pageContent = $(this).text();
													Cpage = $(this).attr('name');
													$('.main_content').html(pageContent);
												}
										}
									})

									if (lessonSize == cPageNum) {
										cLessonNum = cLessonNum + 1;
										cPageNum = 0;
									} else {

									}


									if (pPageNum < 0) {
										if (pLessonNum == 0) {

										} else {
											pLessonNum = pLessonNum - 1;
											pPageNum = plessonSize - 1;
										}
									}


									ebook.nextButton(cLessonNum, cPageNum);
									ebook.prevButton(pLessonNum, pPageNum);
									ebook.currentMenu(mLesson, c2PageNum);
									ebook.currentPage(Cpage);
									ebook.pagination(c2PageNum, lessonSize);

								};
								break;
						}
					})

					if (bookSize == cLessonNum) {
						$('#dialog').remove();
						$('#next').addClass('hide');
						$('.container').append('<div id="dialog">The course is completed</div>');
						$('#dialog').fadeOut(2000, function() {
							$(this).remove()
						});
					} else {
						$('#next').removeClass('hide');

					}

				}
			})


		}
	}
	ebook.loadMenu();
	$('li').live('click', function() {
		if ($(this).attr('class') == 'lesson') {
			lessonNum = $(this).index();
			pageNum = 0;
			cPage = $(this).children('a').text();
			cTage = $(this).children('a');
			ebook.displayData(lessonNum, pageNum);
			ebook.currentPage(cPage);
		} else {
			lessonNum = $(this).parent().parent().index();
			pageNum = $(this).index();
			cPage = $(this).find('a').text();
			cTage = $(this).children('a');
			ebook.displayData(lessonNum, pageNum);
			ebook.currentPage(cPage);
		}
		return false;
	})

	$('#next').click(function() {
		lessonNum = $(this).attr('lesson');
		lessonNum = parseInt(lessonNum);
		pageNum = $(this).attr('page');
		pageNum = parseInt(pageNum);
		ebook.displayData(lessonNum, pageNum);
	})
	$('#prev').click(function() {
		lessonNum = $(this).attr('lesson');
		lessonNum = parseInt(lessonNum);
		pageNum = $(this).attr('page');
		pageNum = parseInt(pageNum);
		ebook.displayData(lessonNum, pageNum);
	})
	ebook.displayData(0, 0);

}

$(document).ready(onReady);