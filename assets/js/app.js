/*
Template Name: DHR - HTML Mobile Template
Author: Dreamguy's Technologies
Version:1.0
Modified: Harald Morjan
*/
var userAvatar,
	userName,
	pendingApprovalArray = [],
	approvedArray = [],
	viewerMessages = [],
	chatUser,
	chatUserAvatar,
	botConfig = [
		{
			token: "hola",
			value: "Bienvenido {0}, soy Monitor\n ¿En que te puedo ayudar?"
		},
		{
			token: "aprobaciones",
			value: '<div class="block" style="padding:0; margin:5px;">¿Qué tipo de aprobaciones quieres?<button onclick="pendingButtonHandler()" class="col button button-fill color-blue button-separator">Pendientes</button><button onclick="approvedButtonHandler()" class="col button button-fill color-green button-separator">Aprobadas</button><button onclick="declinedButtonHandler()" class="col button button-fill color-red button-separator">Rechazadas</button></div>'
		},
		{
			token: "agenda",
			value: '<div class="timeline"><!-- Timeline item with multiple events (inners) per day --><div class="timeline-item"><div class="timeline-item-date">08:00 <small>AM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Reunion de seguimiento</div></div></div><!-- Timeline item with Card --><div class="timeline-item"><div class="timeline-item-date">09:00 <small>AM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Daily Scrum</div></div></div><div class="timeline-item"><div class="timeline-item-date">09:15 <small>AM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Planing</div></div></div><div class="timeline-item"><div class="timeline-item-date">1:00 <small>PM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Almuerzo</div></div></div><div class="timeline-item"><div class="timeline-item-date">02:00 <small>PM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Planing</div></div></div><div class="timeline-item"><div class="timeline-item-date">04:00 <small>PM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Reunion de seguimiento</div></div></div></div>'
		},
		{
			token: "region",
			value: '<div class="list" style="white-space: normal;width: 95%;">' +
				'<h3 class="title is-3">Regiones</h3>' +
				'<ul>' +
				'<li class="accordion-item"><a href="#" class="item-content item-link">' +
				'<div class="item-inner">' +
				'<div class="item-title">Norte</div>' +
				'</div></a>' +
				'<div class="accordion-item-content">' +
				'<div class="block">' +
				// '<p>Item 1 content. Lorem ipsum dolor sit amet...</p>'+
				'<p><div class="gauge north-gauge"></div></p>' +
				'</div>' +
				'</div>' +
				'</li>' +
				'<li class="accordion-item"><a href="#" class="item-content item-link">' +
				'<div class="item-inner">' +
				'<div class="item-title">Sur</div>' +
				'</div></a>' +
				'<div class="accordion-item-content">' +
				'<div class="block">' +
				'<p><div class="gauge south-gauge"></div></p>' +
				'</div>' +
				'</div>' +
				'</li>' +
				'<li class="accordion-item"><a href="#" class="item-content item-link">' +
				'<div class="item-inner">' +
				'<div class="item-title">Este</div>' +
				'</div></a>' +
				'<div class="accordion-item-content">' +
				'<div class="block">' +
				'<p><div class="gauge east-gauge"></div></p>' +
				'</div>' +
				'</div>' +
				'</li>' +
				'<li class="accordion-item"><a href="#" class="item-content item-link">' +
				'<div class="item-inner">' +
				'<div class="item-title">Oeste</div>' +
				'</div></a>' +
				'<div class="accordion-item-content">' +
				'<div class="block">' +
				'<p><div class="gauge west-gauge"></div></p>' +
				'</div>' +
				'</div>' +
				'</li>' +
				'</ul>' +
				'</div>'
		},
		{
			token: "mcc",
			value: '<h3 class="title is-3">MCC</h3><canvas class="chat-chart" id="mcc" style="width: 290px !important;"></canvas>'
		},
		{
			token: "canal",
			value: '<h3 class="title is-3">Canal de fraude</h3><canvas class="chat-chart" id="channel" style="width: 320px !important;"></canvas>'
		},
		{
			token: "monto",
			value: '<h3 class="title is-3">Monto mas alto y mas  bajo</h3><canvas class="chat-chart" id="ammount" style="width: 320px !important;"></canvas>'
		},
		{
			token: "calificaciones",
			value: '<h3 class="title is-3">Calificaciones realizadas</h3><canvas class="chat-chart" id="qualifications" style="width: 290px !important;"></canvas>'
		}
		// {
		// 	token:"region",
		// 	value:'<div data-pagination='+'{"el": ".swiper-pagination"}'+' data-space-between="10" data-direction="vertical" class="swiper-container swiper-init demo-swiper">'+
		// 	'<div class="swiper-pagination"></div>'+
		// 	'<div class="swiper-wrapper">'+
		// 	  '<div class="swiper-slide">Slide 1</div>'+
		// 	  '<div class="swiper-slide">Slide 2</div>'+
		// 	  '<div class="swiper-slide">Slide 3</div>'+
		// 	  '<div class="swiper-slide">Slide 4</div>'+
		// 	  '<div class="swiper-slide">Slide 5</div>'+
		// 	'</div>'+
		//   '</div>'
		// }
	];

// Framework7 App main instance
var app = new Framework7({
	root: '#app', // App root element
	id: 'com.myapp.test',
	name: 'MPAssistant', // App name
	theme: 'ios',
	dialog: {
		// set default title for all dialog shortcuts
		// title: 'My App',
		// change default "OK" button text
		buttonOk: 'Listo'
	},
	// App root methods
	methods: {
		alert: function (msg, title) {
			app.dialog.alert(msg);
		},
		// callbackNotification: function (msg, title) {
		// 	var notification=app.notification.create({
		// 		icon: '<i class="icon demo-icon"><img src="assets/img/MLogoHD.png"></i>',
		// 		title: app.name,
		// 		titleRightText: moment().fromNow(),
		// 		subtitle: title | "",
		// 		text: msg,
		// 		closeOnClick: true,
		// 		on: {
		// 			close: function (btn) {
		// 				// notification.close();
		// 				app.notification.close(notification);
		// 				mainView.router.navigate("/notifications/");
		// 				// app.dialog.alert('Notification closed');
		// 			}
		// 		}
		// 	});
		// 	notification.open();
		// }
	},
	view: {
		iosDynamicNavbar: false,
		xhrCache: false,
	},
	photoBrowser: {
		type: 'popup',
	},
	popup: {
		closeByBackdropClick: false,
	},
	actions: {
		convertToPopover: false,
		grid: true,
	},
	// App routes
	routes: routes,
	on: {
		init: function () {
			// console.log('App initialized');
		},
		pageInit(page) {
			var pageName = page.name;
			switch (pageName) {
				case "index":
					getchart();
					page.router.navigate("/login/");
					break;
				case "profile":
					document.getElementById("profileImage").src = userAvatar;
					document.getElementById("profileName").innerHTML = userName;
					// document.getElementById("profileImage").src=userAvatar;
					break;

					break;

			}
		},
		pageBeforeIn(page) {
			// console.log("pageBeforeIn");
		},
		pageAfterIn(page) {
			var pageName = page.name;
			// console.log("Page in", pageName);
			switch (pageName) {
				case "index":
					getchart();
					break;
				case "profile":
					// document.getElementById("profileImage").src=userAvatar
					break;
				case "dashboard":
					document.getElementById("userAvatar").src = (userAvatar || users.default.avatar);
					document.getElementById("username").innerHTML = userName;
					getchart();
					getNotifications();
					break;
				case "notifications":
					getNotifications();
					break;
				case "chat-view":
					document.getElementById("chatTitle").innerText = chatUser;
					break;
				case "chat-viewer":
					console.log("msgs", viewerMessages);
					var userAvatar = users.jpalacios.avatar;
					var chatMessages = document.getElementById("chatMessagesViewer");
					for (let msg of viewerMessages) {
						var chatEl = document.createElement("div");
						chatEl.className = "message message-received message-first message-last message-tail";
						var userAvatar = users.jpalacios.avatar;
						chatEl.innerHTML = String.format('<div style="background-image:url({1})" class="message-avatar"></div> <div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', msg, userAvatar);
						chatMessages.appendChild(chatEl);
					}
					chatMessages.scrollIntoView(false);
					break;
				case "chat":
					viewerChatUserAvatar = document.getElementById("viewerChatUserAvatar");
					viewerChatUserAvatar.src = users.jpalacios.avatar
					break;
			}
			// if (page.name === 'index') {
			// 	getchart();
			// }
		},
		pageBeforeOut: function (page) {
			var pageName = page.name;
			// console.log("page out", pageName);
			switch (pageName) {
				case "login":
					var userNameField = page.$el.find('input[name="username"]');
					var user = userNameField.val().toLowerCase();
					try {
						userAvatar = users[user].avatar;
						userName = users[user].fullname;
					} catch (error) {
						userAvatar = users.default.avatar;
						userName = users.default.fullname;
					}
					// if (!userAvatar) {
					// 	userAvatar = users.default.avatar;
					// }
					// console.log("avatar", userAvatar);
					showNotification("Bienvenido " + userName);
					// callbackNotification("Bienvenido " + userName);
					initSignalConnection();
					break;
				case "chat":
					chatUser = document.getElementById("chatUser").innerText;
					chatUserAvatar = document.getElementById("chatUserAvatar").getAttribute("userAvatar");
					// debugger
					break;
			}
		}
	}
});

// Dom7
var $$ = Dom7;

var mainView = app.views.create('.view-main');

// Sidebar
! function ($) {
	"use strict";
	var Sidemenu = function () {
		this.$menuItem = $("#sidebar-menu a");
	};

	Sidemenu.prototype.init = function () {
		var $this = this;
		$this.$menuItem.on('click', function (e) {
			if ($(this).parent().hasClass("submenu")) {
				e.preventDefault();
			}
			if (!$(this).hasClass("subdrop")) {
				$("ul", $(this).parents("ul:first")).slideUp(350);
				$("a", $(this).parents("ul:first")).removeClass("subdrop");
				$(this).next("ul").slideDown(350);
				$(this).addClass("subdrop");
			} else if ($(this).hasClass("subdrop")) {
				$(this).removeClass("subdrop");
				$(this).next("ul").slideUp(350);
			}
		});
		$("#sidebar-menu ul li.submenu a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
	},
		$.Sidemenu = new Sidemenu;

}(window.jQuery),


	$(document).ready(function ($) {
		// Sidebar Initiate
		var onGranted = function () {
			console.log("onGranted");
		},
			onDenied = function () {
				console.log("onDenied");
			}
		// if (Push.Permission.has()) {

		// } else {
		// 	Push.Permission.request(onGranted, onDenied);
		// }
		moment.locale("es");
		$.Sidemenu.init();
		if (!String.format) {
			String.format = function (format) {
				var args = Array.prototype.slice.call(arguments, 1);
				return format.replace(/{(\d+)}/g, function (match, number) {
					return typeof args[number] != 'undefined'
						? args[number]
						: match
						;
				});
			};
		}
		// botConfig = [
		// 	{
		// 		token: "hola",
		// 		value: "Bienvenido {0}, soy Monitor\n ¿En que te puedo ayudar?"
		// 	},
		// 	{
		// 		token: "aprobaciones",
		// 		value: '<div class="block" style="padding:0; margin:5px;">¿Qué tipo de aprobaciones quieres?<button onclick="pendingButtonHandler()" class="col button button-fill color-blue button-separator">Pendientes</button><button onclick="approvedButtonHandler()" class="col button button-fill color-green button-separator">Aprobadas</button><button onclick="declinedButtonHandler()" class="col button button-fill color-red button-separator">Rechazadas</button></div>'
		// 	},
		// 	{
		// 		token: "agenda",
		// 		value: '<div class="timeline"><!-- Timeline item with multiple events (inners) per day --><div class="timeline-item"><div class="timeline-item-date">08:00 <small>AM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Reunion de seguimiento</div></div></div><!-- Timeline item with Card --><div class="timeline-item"><div class="timeline-item-date">09:00 <small>AM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Daily Scrum</div></div></div><div class="timeline-item"><div class="timeline-item-date">09:15 <small>AM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Planing</div></div></div><div class="timeline-item"><div class="timeline-item-date">1:00 <small>PM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Almuerzo</div></div></div><div class="timeline-item"><div class="timeline-item-date">02:00 <small>PM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Planing</div></div></div><div class="timeline-item"><div class="timeline-item-date">04:00 <small>PM</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-text">Reunion de seguimiento</div></div></div></div>'
		// 	},
		// 	{
		// 		token: "region",
		// 		value:'<div class="list" style="white-space: normal;width: 95%;">'+
		// 		'<ul>'+
		// 		  '<li class="accordion-item"><a href="#" class="item-content item-link">'+
		// 			  '<div class="item-inner">'+
		// 				'<div class="item-title">Norte</div>'+
		// 			  '</div></a>'+
		// 			'<div class="accordion-item-content">'+
		// 			  '<div class="block">'+
		// 				// '<p>Item 1 content. Lorem ipsum dolor sit amet...</p>'+
		// 				'<p><div class="gauge north-gauge"></div></p>'+
		// 			  '</div>'+
		// 			'</div>'+
		// 		  '</li>'+
		// 		  '<li class="accordion-item"><a href="#" class="item-content item-link">'+
		// 			  '<div class="item-inner">'+
		// 				'<div class="item-title">Sur</div>'+
		// 			  '</div></a>'+
		// 			'<div class="accordion-item-content">'+
		// 			  '<div class="block">'+
		// 			  '<p><div class="gauge south-gauge"></div></p>'+
		// 			  '</div>'+
		// 			'</div>'+
		// 		  '</li>'+
		// 		  '<li class="accordion-item"><a href="#" class="item-content item-link">'+
		// 			  '<div class="item-inner">'+
		// 				'<div class="item-title">Este</div>'+
		// 			  '</div></a>'+
		// 			'<div class="accordion-item-content">'+
		// 			  '<div class="block">'+
		// 			  '<p><div class="gauge east-gauge"></div></p>'+
		// 			  '</div>'+
		// 			'</div>'+
		// 		  '</li>'+
		// 		  '<li class="accordion-item"><a href="#" class="item-content item-link">'+
		// 			  '<div class="item-inner">'+
		// 				'<div class="item-title">Oeste</div>'+
		// 			  '</div></a>'+
		// 			'<div class="accordion-item-content">'+
		// 			  '<div class="block">'+
		// 			  '<p><div class="gauge west-gauge"></div></p>'+
		// 			  '</div>'+
		// 			'</div>'+
		// 		  '</li>'+
		// 		'</ul>'+
		// 	  '</div>'
		// 		// value: String.format('<div data-pagination={0} data-navigation={1} data-space-between="10" data-direction="vertical" class="swiper-container swiper-init demo-swiper">' +
		// 		// 	'<div class="swiper-pagination swiper-pagination-bullets swiper-vertical"><span class="swiper-pagination-bullet-vertical swiper-pagination-bullet-active vertical-bullet"></span><span class="swiper-pagination-bullet vertical-bullet"></span><span class="swiper-pagination-bullet vertical-bullet"></span><span class="swiper-pagination-bullet vertical-bullet"></span><span class="swiper-pagination-bullet vertical-bullet"></span></div>' +
		// 		// 	'<div class="swiper-wrapper">' +
		// 		// 	'<div class="swiper-slide">Slide 1</div>' +
		// 		// 	'<div class="swiper-slide">Slide 2</div>' +
		// 		// 	'<div class="swiper-slide">Slide 3</div>' +
		// 		// 	'<div class="swiper-slide">Slide 4</div>' +
		// 		// 	'<div class="swiper-slide">Slide 5</div>' +
		// 		// 	'</div>' +
		// 		// 	'<div class="swiper-button-prev swiper-button-disabled" tabindex="0" role="button" aria-label="Previous slide" aria-disabled="true"></div>' +
		// 		// 	'<div id ="nextButton" class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-disabled="false"></div>' +
		// 		// 	'<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>' +
		// 		// 	'</div>', JSON.stringify({ "el": ".swiper-pagination", "clickable": true }), JSON.stringify({ "nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev" }))

		// 		// 	value:'<div class="block accordion-list custom-accordion">'+
		// 		// 	'<div class="accordion-item">'+
		// 		// 	  '<div class="accordion-item-toggle">'+
		// 		// 		'<i class="icon icon-plus">+</i>'+
		// 		// 		'<i class="icon icon-minus">-</i>'+
		// 		// 		'<span>Item 1</span>'+
		// 		// 	  '</div>'+
		// 		// 	  '<div class="accordion-item-content">'+
		// 		// 		'<p>Item 1 content. Lorem ipsum dolor sit amet...</p>'+
		// 		// 	  '</div>'+
		// 		// 	'</div>'+
		// 		// 	'<div class="accordion-item">'+
		// 		// 	  '<div class="accordion-item-toggle">'+
		// 		// 		'<i class="icon icon-plus">+</i>'+
		// 		// 		'<i class="icon icon-minus">-</i>'+
		// 		// 		'<span>Item 2</span>'+
		// 		// 	  '</div>'+
		// 		// 	  '<div class="accordion-item-content">'+
		// 		// 		'<p>Item 2 content. Lorem ipsum dolor sit amet...</p>'+
		// 		// 	  '</div>'+
		// 		// 	'</div>'+
		// 		//   '</div>'
		// 	}
		// 	// {
		// 	// 	token:"region",
		// 	// 	value:'<div data-pagination='+'{"el": ".swiper-pagination"}'+' data-space-between="10" data-direction="vertical" class="swiper-container swiper-init demo-swiper">'+
		// 	// 	'<div class="swiper-pagination"></div>'+
		// 	// 	'<div class="swiper-wrapper">'+
		// 	// 	  '<div class="swiper-slide">Slide 1</div>'+
		// 	// 	  '<div class="swiper-slide">Slide 2</div>'+
		// 	// 	  '<div class="swiper-slide">Slide 3</div>'+
		// 	// 	  '<div class="swiper-slide">Slide 4</div>'+
		// 	// 	  '<div class="swiper-slide">Slide 5</div>'+
		// 	// 	'</div>'+
		// 	//   '</div>'
		// 	// }
		// ]
		// $(document).on('swipeout:deleted', (el) => {
		// 	console.log('test', el);
		// 	var target = el.target;
		// });

	});

/* Chart */

function getchart() {

	// Bar Chart

	var barChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],


		datasets: [{
			label: 'Dataset 1',
			backgroundColor: 'rgba(58, 87, 196, 0.6)',
			borderColor: 'rgba(58, 87, 196, 1))',
			borderWidth: 1,
			data: [35, 59, 80, 81, 56, 55, 40]
		}, {
			label: 'Dataset 2',
			backgroundColor: 'rgba(252, 96, 117, 0.5)',
			borderColor: 'rgba(252, 96, 117, 1)',
			borderWidth: 1,
			data: [28, 48, 40, 19, 86, 27, 90]
		}]

	};

	var ctx = document.getElementById('bargraph').getContext('2d');
	window.myBar = new Chart(ctx, {
		type: 'bar',
		// data: barChartData,
		data: {
			// labels: ["1900", "1950", "1999", "2050"],
			labels: ['M', 'T', 'W', 'TH', 'F', 'S'],
			datasets: [
				// {
				// 	label: "Europe",
				// 	type: "line",
				// 	borderColor: "#8e5ea2",
				// 	data: [408, 547, 675, 734],
				// 	fill: false
				// },
				{
					label: "Ana",
					type: "line",
					borderColor: "#009933",
					data: [35, 59, 80, 81, 56, 55, 40],
					// data: [133, 221, 783, 2478],
					fill: false
				},
				{
					label: "Juan",
					type: "line",
					borderColor: "#e67300",
					data: [20, 30, 110, 90, 75, 35, 15],
					// data: [133, 221, 783, 2478],
					fill: false
				},
				//   {
				// 	label: "Europe",
				// 	type: "bar",
				// 	backgroundColor: "rgba(0,0,0,0.2)",
				// 	data: [408,547,675,734],
				//   }, 
				{
					label: "Esperada",
					type: "bar",
					backgroundColor: "#42A5F5",
					// backgroundColorHover: "#3e95cd",
					// data: [133, 221, 783, 2478]
					data: [28, 48, 40, 19, 86, 27, 90]
				}
			]
		},
		options: {
			responsive: true,
			legend: {
				display: true,
				position: "bottom"
			}
		}
	});

	// Line Chart

	var lineChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

		datasets: [{
			label: 'Salvado',
			borderColor: "#009933",
			backgroundColor: "rgb(0,153,51,0.2)",
			// backgroundColor: 'rgba(58, 87, 196, 0.2)',
			// borderColor: 'rgba(58, 87, 196, 1)',
			// pointBackgroundColor: 'rgba(58, 87, 196, 1)',
			borderWidth: 2,
			data: [35, 59, 80, 81, 56, 55, 40],

		}, {
			label: 'Perdido',
			borderColor: "#42A5F5",
			backgroundColor: "rgb(66,165,245,0.2)",
			// backgroundColor: 'rgba(252, 96, 117, 0.2)',
			// borderColor: 'rgba(252, 96, 117, 1)',
			// pointBackgroundColor: 'rgba(252, 96, 117, 1)',
			borderWidth: 2,
			data: [28, 48, 40, 19, 86, 27, 90],
		}]

	};

	var linectx = document.getElementById('canvas').getContext('2d');
	window.myLine = new Chart(linectx, {
		type: 'line',
		data: lineChartData,
		options: {
			responsive: true,
			legend: {
				display: true,
				position: "bottom"
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			}
		}
	});
	var qualificationsPerUser = document.getElementById("qualificationsPerUser");
	if (qualificationsPerUser) {
		var qualificationsPerUserContext = qualificationsPerUser.getContext("2d");
		new Chart(qualificationsPerUserContext, {
			type: 'bar',
			data: {
				labels: ["Buena", "Descartada", "Inusual"],
				datasets: [
					{
						label: "Ana",
						backgroundColor: "#009933",
						data: [20, 16, 8]
					}, {
						label: "Juan",
						backgroundColor: "#42A5F5",
						data: [25, 12, 7]
					}
				]
			},
			options: {
				responsive: true,
				legend: {
					display: true,
					position: "bottom"
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				}
			}
		});
	}

}
function getNotifications() {
	var pendingApproveList = document.getElementById("pendingApproveList");
	var approvedList = document.getElementById("approvedList");
	if (pendingApproveList) {
		pendingApproveList.innerHTML = pendingApprovalArray.join("");
	}
	if (approvedList) {
		approvedList.innerHTML = approvedArray.join("");
	}
	var pendingApprovalCounterEl = document.getElementById("pendingApprovalCounter");
	if (pendingApprovalCounterEl) {
		pendingApprovalCounterEl.innerText = pendingApprovalArray.length;
	}
}
function getChats() {
	var chatCounterEl = document.getElementById("chatCounter");
	if (chatCounterEl) {
		chatCounterEl.innerText = viewerMessages.length;
	}

}
function callbackNotification(msg, title) {
	var notification = app.notification.create({
		icon: '<i class="icon demo-icon"><img src="assets/img/MLogoHD.png"></i>',
		title: app.name,
		titleRightText: moment().fromNow(),
		subtitle: title | "",
		text: msg,
		closeOnClick: true,
		// closeTimeout: 5000
		on: {
			close: function (btn) {
				// notification.close();
				// app.notification.close(notification);
				mainView.router.navigate("/notifications/");
				// app.dialog.alert('Notification closed');
			}
		}
	});
	notification.open();
}
function showNotification(msg, title) {
	var notificationFull = app.notification.create({
		icon: '<i class="icon demo-icon"><img src="assets/img/MLogoHD.png"></i>',
		title: app.name,//'Framework7',
		titleRightText: moment().fromNow(),
		subtitle: title | "",
		text: msg,
		closeButton: true,
		closeOnClick: true,
		closeTimeout: 5000
	});
	notificationFull.open();
	// app.methods.alert(msg);
	// Push.create("MPAssistant", {
	// 	body: msg,
	// 	icon: 'assets/img/MLogoHD.png',
	// 	timeout: 4000,
	// 	onClick: function () {
	// 		window.focus();
	// 		this.close();
	// 	}
	// });
}
var hubProxy;
function initSignalConnection() {
	try {
		$.connection.hub.url = "http://192.168.14.74:50006/signalr/";
		// $.connection.hub.logging = true;
		hubProxy = $.connection.AlertsViewer;
		hubProxy.client.receiveMessage = function (msgFrom, msg, senderId) {
			console.log("receive", msgFrom);
			// pendingApprovalArray.push('<li class="swipeout aproved-callback"><a href="/project-view/"><div class="item-content swipeout-content"><div class="item-media"><img src="assets/img/MLogoHD.png" width="36" class="rounded" alt=""></div><div class="item-inner"><div class="item-title-row"><div class="item-title noti-title">Aprovación requerida <span class="noti-text">por la creación del usuario</span> Jeffrey Warden </div></div></div></div></a><div class="swipeout-actions-right"><a href="#" onclick="approve(this)" class="color-green swipeout-delete" recordId="12345678dasd">Aprobar</a><a href="#" onclick="decline(this)"class="color-red swipeout-delete" data-confirm="¿Desea rechazar la solicitud?" data-confirm-title="Confirmación" recordId="12345678dasd">Rechazar</a></div></li>');
			switch (msgFrom) {
				case "connectAssistant":
					// pendingApprovalArray.push('<li class="swipeout deleted-callback"><a href="/project-view/"><div class="item-content swipeout-content"><div class="item-media"><img src="assets/img/MLogoHD.png" width="36" class="rounded" alt=""></div><div class="item-inner"><div class="item-title-row"><div class="item-title noti-title">Aprovación requerida <span class="noti-text">por la creación del usuario</span> Jeffrey Warden </div></div></div> </div></a><div class="swipeout-actions-left"><a href="#" onclick="approve(this)" class="color-green swipeout-aprove swipeout-delete" recordId="12345678dasd">Aprobar</a></div><div class="swipeout-actions-right"><a href="#" onclick="decline(this)" class="swipeout-delete" recordId="12345678dasd">Rechazar</a></div></li>');
					// console.log(msg);
					break;
				case "mperson":
					var jsonMsg = JSON.parse(msg);
					var status = jsonMsg.status.toLowerCase();
					// console.log("status", status);
					// jsonMsg.message = "{\"fullname\":\"Harald Morjan\",\"avatar\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASSSURBVHhe7ZkxVvMwEIQ5F/1/FR5HoeQYtDS0dKm4AC8dBQfgAqA/iePVRLallTxRktn3NZO82JJmtSs7d/9exTlBLcigFmRQCzKoBRnUggxqQQa1IINakEEtyKAWZFALMqgFGdSCDGpBBrUgg1qQQS3IoBZkUAsyqAUZ1IIMakEGtSCDWpBBLcigFmRQCzKoBRnUIpePt9+f50f4sBzUIo/7l5/fEJsP+LwY1N2wn+HbE37eByH99/H9gF8VgroPDvkV4uvz/uTbeYbftqgPUzx9724RovouqHvg8XN7mF6I0hQ75ubv9uX95Ns2jPlRv0dRN6C2O9npFRfZMTc9uyeP9+evwx263AHDErhT42Gzv4AnhSPz6gt0iugW9R6jrua4fN75j/lVbcAKPdzusCZVDnUtdnv6DKgr4lH/aF2F4OJNdhjqWsblc47PTNKVXzYD/ke7TWCntosm7qKuxOaIb3y1BmAVarUJTGkdokcDbIn0PSWaKzgrLBaKBpsATd1H5wY4l28FA2pXKm68Y3RogM0UZ941tfAYzksFwM7N59hjOjTAFErvE4pdvuoiZsI3Hmi84Vhhmnx/BtSfQRsYkK7XIYrXK3mgajFHC+oqWmRHOwO2XydOFFwQV38oYl0bYDasr3oEqg0YymCoObiIIfKawcyRv2cDbL9qY4DpeBDT1zcGpE5EIebHlviJ7R8XYkD5qSORrdMxM/PjdYZVK+nJyf4RH+d6NsBMdfkMmszN+cjqKycGBNIehDArODUe3C4dG2DSJ5lfJ4V1MTx17HiXeAwOv0MkLL8sAyZTLxX72UY9oJ0B0VeZkVxfa0AyzwpBXUHiddVCpCZQacCY6YvLNx+Ti9vgYdOC2k1usi9t23UN2LE81LlB9mZAVk4VHIoqDRh/vuD05H5davUdGTD50L+PrEPLCSwDDkTNOWtBuzFgZiN7mudAnQEmJ/IMKKcTA7DybDffYyrdigEN/uppYMBhEGbh/C/fA3UGmNW5DQOOa237gQwoAHU2YcXtQvdhgC2M124A0J0BvjNYBhdgQNWwqgwwLxtkgJMaA+yh/tYMaDas3g2Izt8yIMb+9oYNqHo+tKVMBhTQgwHRbxkGnPddUMzNGGD/1ZEBMbYP3ZoBzTamNaD0gY5hQPnr6wVQO2lmgF1EGZBPEwPwT/PCM0Z0PlnLAHvQ6tUA71uwKLlClF5HBhyi5jXkcRM4LsIwIDojXKMBVRCOobEBLWaK2kkXBhDeBXVrAPTPs3kwHoTWMSA6aHVsQIvi6GQYSel7pDwuxYDzVaF1ift8vwasdAQ8P7EBTTYZaieRAVX/CXeNMaBVkqF2Yg04YwNYncMpqGGDQe3EpMY63e9qQe1lOB5ca/tdDdRudi9JGvxFd2ugFmRQCzKoBRnUggxqQQa1IINakEEtyKAWZFALMqgFGdSCDGpBBrUgg1qQQS3IoBZkUAsyqAUZ1IIMakEGtSCDWpBBLcigFmRQCzKoBRnUggxqQQa1IINakEEtyKAWZFALMqgFGdSCDGpBBrUgg1qQQS3IoBZkUAsqr3d/8M8HjqK+grQAAAAASUVORK5CYII=\"}";
					switch (status) {
						case "pending":
							var jsonPerson = JSON.parse(jsonMsg.message);
							console.log(jsonPerson);
							var personObject = String.format('<li class="swipeout deleted-callback"><a href="/project-view/"><div class="item-content swipeout-content"><div class="item-media"><img src="{2}" width="36" class="rounded" alt=""></div><div class="item-inner"><div class="item-title-row"><div class="item-title noti-title">Aprobación requerida <span class="noti-text">por la creación del usuario</span> {0} </div></div></div></div></a><div class="swipeout-actions-left"><a href="#" onclick="approvePerson(this)" class="color-green swipeout-aprove swipeout-delete swipeout-overswipe" recordId="{1}">Aprobar</a><a href="#" onclick="decline(this)" class="swipeout-delete" recordId="{1}">Rechazar</a></div></li>', jsonPerson.fullName || jsonPerson.fullname, jsonMsg.code, jsonPerson.avatar);
							pendingApprovalArray.push(personObject);
							// app.methods.callbackNotification("Requerida la aprobación de un usuario");
							showNotification("Requerida la aprobación de un usuario");
							getNotifications();
							break;
					}
					break;
				case "mcondition":
					var jsonMsg = JSON.parse(msg);
					var status = jsonMsg.status.toLowerCase();
					// console.log("status", status);
					// jsonMsg.message = "{\"fullname\":\"Harald Morjan\",\"avatar\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASSSURBVHhe7ZkxVvMwEIQ5F/1/FR5HoeQYtDS0dKm4AC8dBQfgAqA/iePVRLallTxRktn3NZO82JJmtSs7d/9exTlBLcigFmRQCzKoBRnUggxqQQa1IINakEEtyKAWZFALMqgFGdSCDGpBBrUgg1qQQS3IoBZkUAsyqAUZ1IIMakEGtSCDWpBBLcigFmRQCzKoBRnUIpePt9+f50f4sBzUIo/7l5/fEJsP+LwY1N2wn+HbE37eByH99/H9gF8VgroPDvkV4uvz/uTbeYbftqgPUzx9724RovouqHvg8XN7mF6I0hQ75ubv9uX95Ns2jPlRv0dRN6C2O9npFRfZMTc9uyeP9+evwx263AHDErhT42Gzv4AnhSPz6gt0iugW9R6jrua4fN75j/lVbcAKPdzusCZVDnUtdnv6DKgr4lH/aF2F4OJNdhjqWsblc47PTNKVXzYD/ke7TWCntosm7qKuxOaIb3y1BmAVarUJTGkdokcDbIn0PSWaKzgrLBaKBpsATd1H5wY4l28FA2pXKm68Y3RogM0UZ941tfAYzksFwM7N59hjOjTAFErvE4pdvuoiZsI3Hmi84Vhhmnx/BtSfQRsYkK7XIYrXK3mgajFHC+oqWmRHOwO2XydOFFwQV38oYl0bYDasr3oEqg0YymCoObiIIfKawcyRv2cDbL9qY4DpeBDT1zcGpE5EIebHlviJ7R8XYkD5qSORrdMxM/PjdYZVK+nJyf4RH+d6NsBMdfkMmszN+cjqKycGBNIehDArODUe3C4dG2DSJ5lfJ4V1MTx17HiXeAwOv0MkLL8sAyZTLxX72UY9oJ0B0VeZkVxfa0AyzwpBXUHiddVCpCZQacCY6YvLNx+Ti9vgYdOC2k1usi9t23UN2LE81LlB9mZAVk4VHIoqDRh/vuD05H5davUdGTD50L+PrEPLCSwDDkTNOWtBuzFgZiN7mudAnQEmJ/IMKKcTA7DybDffYyrdigEN/uppYMBhEGbh/C/fA3UGmNW5DQOOa237gQwoAHU2YcXtQvdhgC2M124A0J0BvjNYBhdgQNWwqgwwLxtkgJMaA+yh/tYMaDas3g2Izt8yIMb+9oYNqHo+tKVMBhTQgwHRbxkGnPddUMzNGGD/1ZEBMbYP3ZoBzTamNaD0gY5hQPnr6wVQO2lmgF1EGZBPEwPwT/PCM0Z0PlnLAHvQ6tUA71uwKLlClF5HBhyi5jXkcRM4LsIwIDojXKMBVRCOobEBLWaK2kkXBhDeBXVrAPTPs3kwHoTWMSA6aHVsQIvi6GQYSel7pDwuxYDzVaF1ift8vwasdAQ8P7EBTTYZaieRAVX/CXeNMaBVkqF2Yg04YwNYncMpqGGDQe3EpMY63e9qQe1lOB5ca/tdDdRudi9JGvxFd2ugFmRQCzKoBRnUggxqQQa1IINakEEtyKAWZFALMqgFGdSCDGpBBrUgg1qQQS3IoBZkUAsyqAUZ1IIMakEGtSCDWpBBLcigFmRQCzKoBRnUggxqQQa1IINakEEtyKAWZFALMqgFGdSCDGpBBrUgg1qQQS3IoBZkUAsqr3d/8M8HjqK+grQAAAAASUVORK5CYII=\"}";
					switch (status) {
						case "pending":
							var jsonPerson = JSON.parse(jsonMsg.message);
							console.log(jsonPerson);
							// String.format('<li class="swipeout deleted-callback"><a href="/project-view/"><div class="item-content swipeout-content"><div class="item-media"><img src="{2}" width="36" class="rounded" alt=""></div><div class="item-inner"><div class="item-title-row"><div class="item-title noti-title">Aprobación requerida <span class="noti-text">por la creación del usuario</span> {0} </div></div></div></div></a><div class="swipeout-actions-left"><a href="#" onclick="approvePerson(this)" class="color-green swipeout-aprove swipeout-delete swipeout-overswipe" recordId="{1}">Aprobar</a><a href="#" onclick="decline(this)" class="swipeout-delete" recordId="{1}">Rechazar</a></div></li>', jsonPerson.name, jsonPerson.code,jsonMsg.code,);
							var personObject = String.format('<li class="swipeout deleted-callback"><a href="/project-view/"><div class="item-content swipeout-content"><div class="item-media"><img src="{3}" width="36" class="rounded" alt=""></div><div class="item-inner"><div class="item-title-row"><div class="item-title noti-title">Aprobación requerida <span class="noti-text">por la creación de la condición</span> {1}-{0} </div></div></div></div></a><div class="swipeout-actions-left"><a href="#" onclick="approveCondition(this)" class="color-green swipeout-aprove swipeout-delete swipeout-overswipe" recordId="{2}">Aprobar</a><a href="#" onclick="declineCondition(this)" class="swipeout-delete" recordId="{2}">Rechazar</a></div></li>', jsonPerson.name, jsonPerson.code, jsonMsg.code, jsonPerson.avatar);
							pendingApprovalArray.push(personObject);
							// app.methods.callbackNotification("Nueva aprobacion requerida", "Aprobacion de condición");
							showNotification("Nueva aprobacion requerida", "Aprobacion de condición");
							getNotifications();
							break;
					}
					break;
				case "chat":
					if (senderId === "262A87D9-FC9C-43B9-9CF2-001ACC27AE61") {
						var chatMessages = document.getElementById("chatMessagesViewer");
						if (chatMessages) {
							var chatEl = document.createElement("div");
							chatEl.className = "message message-received message-first message-last message-tail";
							var userAvatar = users.jpalacios.avatar;
							chatEl.innerHTML = String.format('<div style="background-image:url({1})" class="message-avatar"></div> <div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', msg, userAvatar);
							chatMessages.appendChild(chatEl);
							chatMessages.scrollIntoView(false);
						}
					}
					showNotification("Mensaje de Josué Palacios", "Nuevo mensaje");
					viewerMessages.push(msg);
					getChats();
					break;
			}
		}
		$.connection.hub.start({ transport: ['webSockets', 'foreverFrame', 'serverSentEvents', 'longPolling'] }).done(function () {
			// console.log("signalStarted", arguments);
			hubProxy.server.connectAssistant("assistantMovil", "web");
		});
	} catch (error) {
		console.error(error);
	}
	// hubProxy.client.receiveMessage = function (msgFrom, msg, senderId) {
	// 		console.log("receiveMessage")
	// 	}
	// $.connection.hub.url="192.168.14.74:50006/signalr";
	// debugger
	// $.connection.AlertsViewer.client.connectAssistant = function (msgFrom, msg, senderId){

	// }
}
function approvePerson(btn) {
	var recordId = btn.getAttribute("recordId");
	var responseJson = {
		code: recordId,
		status: "Aproved",
		message: ""
	}
	// console.log("approve msg ", JSON.stringify(responseJson));
	var approveObject = String.format('<li class="swipeout deleted-callback"><a href="/project-view/"><div class="item-content swipeout-content"><div class="item-media"><div class="item-title-row"><div class="item-title noti-title">Usuario <span class="noti-text">aprobado</span></div></div></div></div></a></li>');
	approvedArray.push(approveObject);
	// console.log("recordId", recordId)
	hubProxy.server.assistantMperson("mperson", JSON.stringify(responseJson), "web");//assistantMperson("mperson", JSON.stringify(responseJson));
	pendingApprovalArray.pop();
	showNotification("Solicitud Aprobada");
	getNotifications();

}
function approveCondition(btn) {
	var recordId = btn.getAttribute("recordId");
	var responseJson = {
		code: recordId,
		status: "Aproved",
		message: ""
	}
	// console.log("approve msg ", JSON.stringify(responseJson));
	var approveObject = String.format('<li class="swipeout deleted-callback"><a href="/project-view/"><div class="item-content swipeout-content"><div class="item-media"><div class="item-title-row"><div class="item-title noti-title">Usuario <span class="noti-text">aprobado</span></div></div></div></div></a></li>');
	approvedArray.push(approveObject);
	// console.log("recordId", recordId);
	hubProxy.server.assistantCondition("mcondition", JSON.stringify(responseJson), "web");//assistantMperson("mperson", JSON.stringify(responseJson));
	pendingApprovalArray.pop();
	showNotification("Solicitud Aprobada");
	getNotifications();

}
function decline(btn) {
	var recordId = btn.getAttribute("recordId");
	var responseJson = {
		code: recordId,
		status: "Canceled",
		message: ""
	}
	hubProxy.server.assistantMperson("mperson", JSON.stringify(responseJson), "web");//assistantMperson("mperson", JSON.stringify(responseJson));
	// pendingApprovalArray.pop();
	showNotification("Solicitud Rechazada");
	getNotifications();

}
function declineCondition(btn) {
	var recordId = btn.getAttribute("recordId");
	var responseJson = {
		code: recordId,
		status: "Canceled",
		message: ""
	}
	// console.log("cancel json", JSON.stringify(responseJson));
	hubProxy.server.assistantCondition("mcondition", JSON.stringify(responseJson), "web");//assistantMperson("mperson", JSON.stringify(responseJson));
	// pendingApprovalArray.pop();
	showNotification("Solicitud Rechazada");
	getNotifications();

}
function sendMessageViewer() {
	var chatMessages = document.getElementById("chatMessagesViewer");
	var chatText = document.getElementById("chatTextViewer");
	var text = chatText.value;
	if (text != "") {
		var chatEl = document.createElement("div");
		chatEl.className = "message message-sent message-last message-tail";
		chatEl.innerHTML = String.format('<div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', text);
		// chatEl.className = "message message-received message-first message-last message-tail";
		// chatEl.innerHTML = String.format('<div style="background-image:url({1})" class="message-avatar"></div> <div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', text,chatUserAvatar);
		chatMessages.appendChild(chatEl);
		chatText.value = "";
		chatMessages.scrollIntoView(false);
		hubProxy.server.chatViewerMessage("chat", text, "773171A5-AEFB-4F47-B90B-2BFCA6706E22", "262A87D9-FC9C-43B9-9CF2-001ACC27AE61");
		// setTimeout(() => {
		// 	// var swiper = app.swiper.create('.swiper-container', {
		// 	// 	speed: 400,
		// 	// 	spaceBetween: 100
		// 	// });
		// 	var token = botResponse(text);
		// 	// console.log("token", token);
		// 	responseListeners(token);
		// }, 1000);
	}
}
function sendMessage(msg) {
	var chatMessages = document.getElementById("chatMessages");
	var chatText = document.getElementById("chatText");
	if (chatMessages) {
		var text = chatText.value;
		if (text != "") {
			var chatEl = document.createElement("div");
			chatEl.className = "message message-sent message-last message-tail";
			chatEl.innerHTML = String.format('<div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', text);
			// chatEl.className = "message message-received message-first message-last message-tail";
			// chatEl.innerHTML = String.format('<div style="background-image:url({1})" class="message-avatar"></div> <div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', text,chatUserAvatar);
			chatMessages.appendChild(chatEl);
			chatText.value = "";
			chatMessages.scrollIntoView(false);
			setTimeout(() => {
				// var swiper = app.swiper.create('.swiper-container', {
				// 	speed: 400,
				// 	spaceBetween: 100
				// });
				var token = botResponse(text);
				// console.log("token", token);
				responseListeners(token);
			}, 1000);
		}
		// chatMessages.appendChild('<div class="message message-sent message-first"><div class="message-content"><div class="message-bubble"><div class="message-text">Mierda</div></div></div></div>');
	}
}
function addTextToChart() {
	var ctx = this.chart.ctx;
	ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom';

	this.data.datasets.forEach(function (dataset) {

		for (var i = 0; i < dataset.data.length; i++) {
			var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
				total = dataset._meta[Object.keys(dataset._meta)[0]].total,
				mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
				start_angle = model.startAngle,
				end_angle = model.endAngle,
				mid_angle = start_angle + (end_angle - start_angle) / 2;

			var x = mid_radius * Math.cos(mid_angle);
			var y = mid_radius * Math.sin(mid_angle);

			ctx.fillStyle = '#fff';
			if (i == 3) { // Darker text color for lighter background
				ctx.fillStyle = '#444';
			}
			// var percent = String(Math.round(dataset.data[i] / total * 100)) + "%";
			ctx.fillText(dataset.data[i], model.x + x, model.y + y);
			// ctx.fillText(data.labels[i], model.x + x, model.y + y);
			// Display percent in another line, line break doesn't work for fillText
			// ctx.fillText(percent, model.x + x, model.y + y + 15);
		}
	});
}
function responseListeners(token) {
	switch (token) {
		case "region":
			if (document.getElementsByClassName(".north-gauge")) {
				app.gauge.create({
					el: '.north-gauge',
					type: 'semicircle',
					value: 0.4,
					size: 225,
					borderColor: '#4caf50',
					borderWidth: 10,
					valueText: '20',
					valueFontSize: 41,
					valueTextColor: '#4caf50',//'#2196f3',
					labelText: 'fraudes',
				});
			}
			if (document.getElementsByClassName(".south-gauge")) {
				app.gauge.create({
					el: '.south-gauge',
					type: 'semicircle',
					value: 0.1,
					size: 225,
					borderColor: '#2196f3',
					borderWidth: 10,
					valueText: '3',
					valueFontSize: 41,
					valueTextColor: '#4caf50',//'#2196f3',
					labelText: 'fraudes',
				});

			}
			if (document.getElementsByClassName(".east-gauge")) {
				app.gauge.create({
					el: '.east-gauge',
					type: 'semicircle',
					value: 0.2,
					size: 225,
					borderColor: '#ffeb3b',
					borderWidth: 10,
					valueText: '15',
					valueFontSize: 41,
					valueTextColor: '#4caf50',//'#2196f3',
					labelText: 'fraudes',
				});
			}
			if (document.getElementsByClassName(".west-gauge")) {
				app.gauge.create({
					el: '.west-gauge',
					type: 'semicircle',
					value: 0.8,
					size: 225,
					borderColor: '#ff9800',
					borderWidth: 10,
					valueText: '70',
					valueFontSize: 41,
					valueTextColor: '#4caf50',//'#2196f3',
					labelText: 'fraudes',
				});
			}
			break;
		case "mcc":
			var mccChart = document.getElementById("mcc");
			if (mccChart) {
				//if mccChart.childElementCount===0
				// var divEl = document.createElement("div");
				// divEl.classList = "chat-chart";
				// console.log("count",mccChart.childElementCount)
				// mccChart = mccChart.childElementCount > 0 ? divEl : mccChart;

				// var canvas = document.createElement("canvas")
				var mccCanvas = mccChart.getContext('2d');
				var data = {
					datasets: [{
						data: [3, 8, 9],
						backgroundColor: ["#009933", "#42A5F5", "#e67300"],
					}],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: [
						'3013 - Alitalia',
						'5411 - Grocery Stores',
						'5944 - Jewelry Stores '
					]
				};
				new Chart(mccCanvas, {
					type: 'doughnut',
					data: data,
					options: {
						responsive: true,
						animation: {
							duration: 500,
							easing: "easeOutQuart",
							onComplete: addTextToChart,

						},
						legend: {
							display: true,
							position: "right"
							// labels: {
							// 	fontColor: 'rgb(255, 99, 132)'
							// }
						}
						// legend: {
						// 	display: false,
						// }
					}
				});
				// mccChart.appendChild(canvas);
			}
			break;
		case "canal":
			var channelChart = document.getElementById("channel");
			if (channelChart) {
				var channelCanvas = channelChart.getContext('2d');
				var data = {
					datasets: [{
						data: [20, 8],
						backgroundColor: ["#009933", "#42A5F5", "#e67300"],
					}],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: [
						'POS',
						'E-Commerce'
					]
				}
				var myPieChart = new Chart(channelCanvas, {
					type: 'pie',
					data: data,
					options: {
						responsive: true,
						animation: {
							duration: 500,
							easing: "easeOutQuart",
							onComplete: addTextToChart,
						},
						legend: {
							display: true,
							// position:"right"
							// labels: {
							// 	fontColor: 'rgb(255, 99, 132)'
							// }
						}
						// legend: {
						// 	display: false,
						// }
					}
					// options: options
				});
			}
			break;
		case "monto":
			var ammountChart = document.getElementById("ammount");
			if (ammountChart) {
				var amountContext = ammountChart.getContext('2d');
				var data = {
					datasets: [
						// {
						// 	label: ["Alitalia"],
						// 	backgroundColor: "#009933",//"rgba(255,221,50,0.2)",
						// 	// borderColor: "rgba(255,221,50,1)",
						// 	data: [{
						// 		x: 5,
						// 		y: 1500.00,
						// 		r: 15
						// 	}]
						// },
						// {
						// 	label: ["Grocery Stores"],
						// 	backgroundColor: "#42A5F5",//"rgba(193,46,12,0.2)",
						// 	// borderColor: "rgba(193,46,12,1)",
						// 	data: [{
						// 		x: 10,
						// 		y: 150.00,
						// 		r: 15
						// 	}]
						// }
						{
							data: [1200, 150],
							backgroundColor: ["#009933", "#42A5F5"],
						}
					],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: [
						'Alitalia',
						'Grocery Stores'
					]
				}
				new Chart(amountContext, {
					type: 'bar',
					data: data,
					options: {
						responsive: true,
						animation: {
							duration: 500,
							easing: "easeOutQuart",
							onComplete: addTextToChart,
						},
						legend: {
							display: false,
							position: "right"
							// labels: {
							// 	fontColor: 'rgb(255, 99, 132)'
							// }
						}
						// legend: {
						// 	display: false,
						// }
					}
					// options: options
				});
			}
			break;
		case "calificaciones":
			var qualificationChart = document.getElementById("qualifications")
			if (qualificationChart) {
				var qualificationsCtx = qualificationChart.getContext("2d");
				new Chart(qualificationsCtx, {
					type: 'pie',
					data: {
						datasets: [{
							data: [45, 28, 15],
							backgroundColor: ["#009933", "#42A5F5", "#e67300"],
						}],

						// These labels appear in the legend and in the tooltips when hovering different arcs
						labels: [
							'Buena',
							'Descartada',
							'Inusual'
						]
					},
					options: {
						responsive: true,
						animation: {
							duration: 500,
							easing: "easeOutQuart",
							onComplete: addTextToChart,
						},
						legend: {
							display: true,
							position: "right"
							// labels: {
							// 	fontColor: 'rgb(255, 99, 132)'
							// }
						}
						// legend: {
						// 	display: false,
						// }
					}
				});
			}
			break;

	}
}
function botResponse(msg) {
	var text = msg.replace(/[^a-zA-Z0-9-. ]/g, " ").toLowerCase();
	var token;
	var chatMessages = document.getElementById("chatMessages");
	var chatText = document.getElementById("chatText");
	if (chatMessages) {
		var wordArray = text.split(" "),
			responseText;
		for (let word of wordArray) {
			var botResponse = findBotResponse(word);
			responseText = botResponse ? botResponse : "Lo siento, no entiendo lo que preguntas";
			if (botResponse) {
				token = word;
				break;
			}
		}
		var chatEl = document.createElement("div");
		chatEl.className = "message message-received message-first message-last message-tail";
		chatEl.innerHTML = String.format('<div style="background-image:url({1})" class="message-avatar"></div> <div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', responseText, chatUserAvatar);
		chatMessages.appendChild(chatEl);
		chatMessages.scrollIntoView(false);
		return token;
		// chatMessages.appendChild('<div class="message message-sent message-first"><div class="message-content"><div class="message-bubble"><div class="message-text">Mierda</div></div></div></div>');
	}
}
function findBotResponse(text) {
	var responseText;
	botConfig.forEach(function (item) {
		if (RegExp('\\b' + item.token + '\\b').test(text)) {
			responseText = text === "hola" ? String.format(item.value, userName) : item.value;
		}
	});
	return responseText;
}
function pendingButtonHandler() {
	console.log("pending");
}
function approvedButtonHandler() {
	// console.log("approved");
	var chatMessages = document.getElementById("chatMessages");
	var chartEl = document.createElement("div");
	chartEl.className = "message message-received message-first message-last message-tail";
	chartEl.style = "padding:0;"
	chartEl.innerHTML = String.format('<div style="background-image:url({1})" class="message-avatar"></div> <div class="message-content"><div class="message-bubble"><div class="message-text full-text">{0}</div></div></div>', '<h3 class="title is-3">Solitudes Aprobadas</h3><canvas class="chat-chart" id="approvedChart" style="width: 320px !important;"></canvas>', chatUserAvatar);// '<h3 class="title is-3">Solitudes Aprobadas</h3><canvas id="approvedChart"></canvas>';
	chatMessages.appendChild(chartEl);
	chatMessages.scrollIntoView(false);
	setTimeout(() => {
		var context = document.getElementById('approvedChart').getContext('2d');
		var data = {
			datasets: [{
				data: [12, 8],
				backgroundColor: ["#009933", "#42A5F5", "#e67300"],
			}],

			// These labels appear in the legend and in the tooltips when hovering different arcs
			labels: [
				'Usuarios',
				'Condiciones'
			]
		}
		new Chart(context, {
			type: 'pie',
			data: data,
			options: {
				responsive: true,
				animation: {
					duration: 500,
					easing: "easeOutQuart",
					onComplete: addTextToChart,
				},
				legend: {
					display: true,
					// position: "right"
				}
				// legend: {
				// 	display: false,
				// }
			}
			// options: options
		});
		// var barChartData = {
		// 	labels: ['Usuarios', 'Condiciones'],


		// 	datasets: [{
		// 		label: 'Dataset 1',
		// 		backgroundColor: 'rgba(58, 87, 196, 0.6)',
		// 		borderColor: 'rgba(58, 87, 196, 1))',
		// 		borderWidth: 1,
		// 		data: [35, 59]
		// 	}, {
		// 		label: 'Dataset 2',
		// 		backgroundColor: 'rgba(252, 96, 117, 0.5)',
		// 		borderColor: 'rgba(252, 96, 117, 1)',
		// 		borderWidth: 1,
		// 		data: [28, 48]
		// 	}]

		// };

		// var ctx = document.getElementById('approvedChart').getContext('2d');
		// window.myBar = new Chart(ctx, {
		// 	type: 'bar',
		// 	data: barChartData,
		// 	options: {
		// 		responsive: true,
		// 		legend: {
		// 			display: false,
		// 		}
		// 	}
		// });
	}, 500);
}
function declinedButtonHandler() {
	console.log("declined");
}
$('.deleted-callback').on('swipeout:deleted', function () {
	// app.dialog.alert('Thanks, item removed!');
	showNotification("Solicitud rechazada!")
});
$$('.a .swipeout-aprove').on('click', function () {
	showNotification("Solicitud rechazada!")
});