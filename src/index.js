//document.addEventListener('DOMContentLoaded', function() {
import {cardThemesArray} from "./themes-array.js";
console.log("первый вызов массива");
console.log(cardThemesArray);

let counter = 0;
    cardThemesArray.forEach(function(el) {
      el.id = counter++;
});

function themeById(id) {
    for (let i = 0; i < cardThemesArray.length; i++) {
        if (cardThemesArray[i].id == id) {
            return i;
        }
    }
}

function cardById(theme, id) {
    for (let i = 0; i < theme.cards.length; i++) {
        if (theme.cards[i].id == id) {
            return i;
        }
    }
}
console.log("второй вызов массива");
console.log(cardThemesArray);

function idForThemes(id) {
    let allThemes = document.getElementsByClassName('card-theme_block');
    for (let i = 0; i < allThemes.length; i++) {
        if (allThemes[i].getAttribute('data-id') == id)
        return allThemes[i];
    }
}

let cardInfoProperties = {
    character: { ru: 'Персонаж', changeable: false },
    class: { ru: 'Класс', changeable: false },
    rarity: { ru: 'Редкость', changeable: false },
    card_description: { ru: 'Описание', changeable: true },
    ability: { ru: 'Способность', changeable: true },
    energy_cost: { ru: 'Затраты энергии', changeable: true },
    health: { ru: 'Здоровье', changeable: true },
    attack: { ru: 'Атака', changeable: true },
    range: { ru: 'Расстояние атаки', changeable: true },
    radius: { ru: 'Радиус поражения', changeable: true },
    charge_time: { ru: 'Время заряда умения', changeable: true }
};

//set id for all cards
function cardsCounter() {
    let count = 1;
    return () => count++;
}
let idCounter = cardsCounter();

function idForCards(cards) {
    cards.forEach(function(el) {
      el.cards.forEach(card => { card.id = idCounter(); });
    });
}
////end "id for all cards"

document.addEventListener('DOMContentLoaded', function() {
    // Local storage
    function storage() {
        if (localStorage.getItem('dataBase')) {
            cardThemesArray = JSON.parse(localStorage.getItem('dataBase'));
        } else {
            localStorage.setItem('dataBase', JSON.stringify(cardThemesArray));
        }
    };
    storage();
    // Reset local storage
    function storageClear() {
        document.getElementById('reset-storage').addEventListener('click', function(e) {
            localStorage.clear();
        });
    };

    // начало функций добавляем обертку для наших тем
    let allCardThemes_wrapper = document.createElement('main');
        document.body.appendChild(allCardThemes_wrapper);
        allCardThemes_wrapper.classList.add('card-theme_block__wrapper');
        allCardThemes_wrapper.id = ('card-theme_block__wrapper');

    idForCards(cardThemesArray);
    //
    for (let i = 0; i < cardThemesArray.length; i++) {
      getCardTheme(i);
    }

    function getCardTheme(i) {
        let theme = cardThemesArray[i];
        //let's insert Div and give the class
        let themesBody = document.createElement('div');
            allCardThemes_wrapper.appendChild(themesBody);
            themesBody.classList.add('card-theme_block');
        //for sorting add Theme name like class
            themesBody.classList.add(theme['theme name']);
            themesBody.setAttribute('data-id', theme['theme name']);
        // Add Photo to 'card-theme__block' themesBody
        let themeImage = document.createElement('img');
            themeImage.classList.add('card-theme_block__logo');
			themeImage.src = theme['theme logo'];
			themesBody.appendChild(themeImage);
		//Add Name to Theme
		let cardTheme_name = document.createElement('h2');
			themesBody.appendChild(cardTheme_name);
            cardTheme_name.classList.add('theme-name')
			cardTheme_name.innerHTML = (theme['theme name']);
		//Add color to Theme
		let cardTheme_color = document.createElement('h3');
			themesBody.appendChild(cardTheme_color);
            cardTheme_color.classList.add('theme-color');
			cardTheme_color.innerHTML = (theme['theme color']);
		//Add description to Theme
		let cardTheme_description = document.createElement('p');
			themesBody.appendChild(cardTheme_description);
			cardTheme_description.innerHTML = (theme['theme description']);
            cardTheme_description.classList.add('theme-description')
		//Add article for cards
		let cardsArticle = document.createElement('p');
			themesBody.appendChild(cardsArticle);
			cardsArticle.innerHTML = ("Карты в колоде:");
            cardsArticle.classList.add('cards-article')
		//Add cards wrapper
		let allCards_wrapper = document.createElement('div');
			themesBody.appendChild(allCards_wrapper);
			allCards_wrapper.classList.add('all-cards__wrapper');
		//Add cards body for preview
		let cardsPreview = document.createElement('div');
			allCards_wrapper.appendChild(cardsPreview);
			cardsPreview.classList.add('card-icon_small');
			for (let a = 0; a < theme.cards.length; a++) {
				let cards = document.createElement('img');
				    cards.classList.add('cards_preview');
				    cardsPreview.appendChild(cards);
				    // cards.href = '#';
				    // cards.title = theme.cards[a][card_name];
				    // cards.innerHTML = theme.cards[a][card_name] + " ";
					cards.src = theme.cards[a].card_image;
				//let link to array
				//let linkToCards = theme.cards[a];
					cards.addEventListener('click', function(e) {
						let mistBackground = document.createElement('div');
							document.body.appendChild(mistBackground);
							mistBackground.classList.add('mist-background');
						//block where shows clicked card
						let cardInfo_wrapper = document.createElement('div');
							document.body.appendChild(cardInfo_wrapper);
							cardInfo_wrapper.classList.add('card-info__wrapper-null');
							cardInfo_wrapper.classList.add('card-info__wrapper');
                            cardInfo_wrapper.setAttribute('data-idx', theme.cards[a].id);
						//Card title
						let cardInfo_title = document.createElement('h2');
							cardInfo_wrapper.appendChild(cardInfo_title);
							cardInfo_title.classList.add('card-info__title')
							cardInfo_title.innerHTML = theme.cards[a].card_name;
						//Big card image in open window	
						let cardInfo_image = document.createElement('img');
							cardInfo_wrapper.appendChild(cardInfo_image);
							cardInfo_image.classList.add('card-info__image');
							cardInfo_image.src = theme.cards[a].card_image;
						//Card description in window
						//!!!!!!add function construct!!!!
						let cardInfo_about_card = document.createElement('div');
							cardInfo_wrapper.appendChild(cardInfo_about_card);
							cardInfo_about_card.classList.add('card-info__about-card');
                            
                            for (let prop in cardInfoProperties) {
                                cardInfo_about_card.appendChild(construct(cardInfoProperties[prop].ru + ':  ',
                                    theme.cards[a][prop]));
                            }                          
						//Button for close cardWindow
						let closeButton = document.createElement('img');
							cardInfo_wrapper.appendChild(closeButton);
							closeButton.classList.add('card-info_btn__close');
							closeButton.src = "images/icons/close_btn.png";
                        //Clode window function
							closeButton.addEventListener('click', function(evt) {
								mistBackground.classList.remove('mist-background');
								cardInfo_wrapper.classList.remove('card-info__wrapper');
							});
							addEventListener('keydown', function (evt) {
			        			if (evt.keyCode === 27) {
			        				mistBackground.classList.remove('mist-background');
									cardInfo_wrapper.classList.remove('card-info__wrapper');
								}
							});
						let cardInfo_controls = document.createElement('div');
							cardInfo_wrapper.appendChild(cardInfo_controls);
							cardInfo_controls.classList.add('card-info_controls');
						//delete
						let cardInfoBtn_delete = document.createElement('img');
							cardInfo_controls.appendChild(cardInfoBtn_delete);
							cardInfoBtn_delete.classList.add('card-info__delete');
							cardInfoBtn_delete.src = "images/icons/trash.png";
                            cardInfoBtn_delete.addEventListener('click', function() {
                        // удаление карты для своей колоды, перенести кнопку в новый массив со своими картами.
                            });
				        //editing
						let cardInfoBtn_editing = document.createElement('img');
							cardInfo_controls.appendChild(cardInfoBtn_editing);
							cardInfoBtn_editing.classList.add('card-info__editing');
							cardInfoBtn_editing.src = "images/icons/edit-picture.png";
						//card editing
							cardInfoBtn_editing.addEventListener('click', function(evt){
							  	openWindow('card-editing_form', 'card-editing_form__open', 'card-editing_mist', 'mist-background');
							  	addEventListener('keydown', function (evt) {
                                    if (evt.keyCode === 27) {
							    	    closeWindow('card-editing_form', 'card-editing_form__open', 'card-editing_mist', 'mist-background');
                                    }
							  	});
							  	document.getElementById('card-editing_form_close__img').addEventListener('click', function () {
							    	closeWindowImg('card-editing_form', 'card-editing_form__open', 'card-editing_mist', 'mist-background');
							  	});
							  	let id = cardInfo_wrapper.getAttribute('data-idx');
							  	let index = themeById(id);
							  	let cardsEdit = document.getElementsByName('edit')[0];
                                    Object.entries(cardInfoProperties).filter(([key,val]) => val.changeable)
                                        .forEach(function([prop,val]) {
                                            cardsEdit.elements['create_'+prop].value = theme.cards[a][prop] || '';  
                                    });
									cardsEdit.setAttribute('data-idx', index);
									cardsEdit.elements.saveCard.addEventListener('click', function(event){
							  	let cardsEditSave = this.parentElement;
							  	let idx = cardsEditSave.getAttribute('data-idx');
                                Object.entries(cardInfoProperties)
                                    .filter(([key,val]) => val.changeable)
                                    .forEach(function([prop,val]) {
                                        theme.cards[cardById(theme, idx)][prop] = cardsEditSave.elements['create_' + prop].value;
                                });
								localStorage.setItem('dataBase', JSON.stringify(cardThemesArray));
						  		closeWindowImg('card-editing_form', 'card-editing_form__open', 'card-editing_mist', 'mist-background');
						  			event.preventDefault();
						  		console.log(idx);
								});
							});
							return cards;
					});//end off cards func
			}//enf of cards for
		//wrapper for buttons in card window
		let themesBody_controls = document.createElement('div');
			themesBody.appendChild(themesBody_controls);
			themesBody_controls.classList.add('card-theme_block_controls');
		//create
		let addCard_link = document.createElement('a');
		    addCard_link.id = 'card-theme_block__create_idx';
		    addCard_link.classList.add('card-theme_block__create__link');
		    themesBody_controls.appendChild(addCard_link);
		    addCard_link.href = '#';
		    addCard_link.innerHTML = 'Добавь карту в коллецию ';
		let themesBodyBtn_create = document.createElement('img');
			addCard_link.appendChild(themesBodyBtn_create);
			themesBodyBtn_create.classList.add('card-theme_block__create');
			themesBodyBtn_create.src = "images/icons/add_card.png";
			//open form from html
			addCard_link.addEventListener('click', function(evt){
				openWindow('new-card_form', 'new-card_form__open', 'add-new-card_mist', 'mist-background');
				addEventListener('keydown', function(evt){
					if (evt.keyCode === 27) {
						closeWindow('new-card_form', 'new-card_form__open', 'add-new-card_mist', 'mist-background');
					}
				});
				document.getElementById('new-card_form_close__img').addEventListener('click', function(evt) {
					closeWindow('new-card_form', 'new-card_form__open', 'add-new-card_mist', 'mist-background');
				});
				document.getElementById('new-card_get__btn').addEventListener('click', function(evt) {
					closeWindow('new-card_form', 'new-card_form__open', 'add-new-card_mist', 'mist-background');
				});
			});
	};//end off getCardTheme
	// card-theme-offer
		let cardThemeOffer = document.getElementById('add-card-theme');
			cardThemeOffer.addEventListener('click', function(evt) {
  				openWindow('card-theme-offer', 'card-theme-offer__open', 'card-theme-offer_mist', 'mist-background');
  				addEventListener('keydown', function (evt) {
                    if (evt.keyCode === 27) {
    				    closeWindow('card-theme-offer', 'card-theme-offer__open', 'card-theme-offer_mist', 'mist-background');
                    }
  				});
			});
			document.getElementById('card-theme-offer_close__img').addEventListener('click', function(evt) {
			  	closeWindowImg('card-theme-offer', 'card-theme-offer__open', 'card-theme-offer_mist', 'mist-background');
			});

		let cardTheme = document.getElementById('card-theme-offer_get');
			cardTheme.addEventListener('click', function(evt){
  		let newCardTheme = {
		    "theme name": document.getElementById('theme_name').value,
    		"theme color": document.getElementById('theme_color').value,
    		"theme description": document.getElementById('theme_description').value,
    		"theme image": document.getElementById('theme_image').value,
            cards: []
		  };
		  cardThemesArray.push(newCardTheme);
		  getCardTheme(cardThemesArray.length - 1);
		  localStorage.setItem('dataBase', JSON.stringify(cardThemesArray));
		    closeWindowImg('card-theme-offer', 'card-theme-offer__open', 'card-theme-offer_mist', 'mist-background');
		});
            //add footer to body
    let footer = document.createElement('footer');
        document.body.appendChild(footer);
        footer.classList.add('footer__wrapper');
    let footerImg = document.createElement('img');
        footer.appendChild(footerImg);
        footerImg.classList.add('footer-img');
        footerImg.src = "images/kindpng_3395288.png";

}); // DOM end
// abc sorting
// document.getElementById('abc_sorting').addEventListener('click', function(e) {
// 		cardThemesArray.sort(function (a, b) {
// 			a = a['theme name'].toLowerCase();
// 			b = b['theme name'].toLowerCase();
// 		if (a > b) {
//  			return 1;
// 			} if (a < b) {
//   			return -1;
// 				}
// 					return 0;
// 				});
//        //
// 	   // localStorage.setItem('dataBase', JSON.stringify(cardThemesArray));
// 	   // window.location.reload();
// });
// Filter
let filter_select = document.getElementById('filter');
filter_select.onchange = function () {
    let items_el = document.getElementById('card-theme_block__wrapper');
	console.log(this.value);
	let items = items_el.getElementsByClassName('card-theme_block');
	  	for (let i = 0; i < items.length; i++){
	    	if(items[i].classList.contains(this.value)) {
	      		items[i].style.display = 'block';
	    		} else {
	     	items[i].style.display = 'none';
	    }
	}
}

function construct(text, value) {
  let newElement = document.createElement('p');
  newElement.innerHTML = text;
  let newElementSpan = document.createElement('span');
  newElement.appendChild(newElementSpan);
  newElementSpan.innerHTML = value;
  return newElement;
};
function closeWindow(idOne, classOne, idTwo, classTwo) {
    document.getElementById(idOne).classList.remove(classOne);
    document.getElementById(idTwo).classList.remove(classTwo);
};
function closeWindowImg(idOne, classOne, idTwo, classTwo) {
    document.getElementById(idOne).classList.remove(classOne);
    document.getElementById(idTwo).classList.remove(classTwo);
};
function openWindow(idOne, classOne, idTwo, classTwo) {
  document.getElementById(idOne).classList.add(classOne);
  document.getElementById(idTwo).classList.add(classTwo);
};



