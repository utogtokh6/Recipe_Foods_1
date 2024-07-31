import Search from "./model/search";
import Base, { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from  "./view/searchView";
import Recipe from "./model/Recipe";
import {renderRecipe, clearRecipe, highlightSelectedRecipe} from "./view/recipeView";
import List from "./model/List";
import * as listView from "./view/listView";
import Like from "./model/Like";
import * as likesView from "./view/likesView";
// let search = new Search('pasta');

// search.doSearch().then(r => console.log(r));


/**
 * Web app төлөв
 * Хайлтын query, үр дүн
 * Тухайн үзүүлж байгаа жор
 * Лайкласан жорууд
 * Захиалж байгаа жорын найрлаганууд
*/

const state = {};

const controlSearch = async () => {
    console.log("controlSearch function duudagdlaa!!! ")

    // /**
    //  * 1) Web-s hailtiin tulhuur ugiig gargaj avna...
        const query = searchView.getInput();

        if(query){
    //  * 2) Shinee hailtiin objectiig uusgej ugnu

    state.search  = new Search(query);
    //  * 3) Hailt hiihed zoriulj delgetsiin UI beltgene
    searchView.clearSearch();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //  * 4) Hailtiig guitsetgene
    await state.search.doSearch();

    //  * 5) Hailtiin ur dung delgetsend uzuulne
            clearLoader();

 if(state.search.result === undefined) {alert("Хайлтаар илрэцгүй...")}
    else{    searchView.renderRecipes(state.search.result);}

    //  *      *
    //  * */
        }

}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //default uil ajillagaag ni boliul
    controlSearch();
});

//
elements.PageButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
if (btn){
    // html deerh data-goto -ees gotoPageNumber utgiig avna
    const gotoPageNumber = parseInt(btn.dataset.goto);
    //tovch daragdsan bval hailtiin ur dung tseverlene.
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result,gotoPageNumber);
}

});



/**
 * Joriin controller
 */
const controlRecipe = async () => {

// 1) URL-aac ID-g salgah
const id  = window.location.hash.replace('#','');

// 2) Joriin modeliig uusgej ugnu
state.recipe = new Recipe(id);
// 3) UI delgetsiig beltgene
clearRecipe();
renderLoader(elements.recipeDev);
highlightSelectedRecipe(id);

// 4) Joroo tataj avchirna
await state.recipe.getRecipe();
// 5) Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno

clearLoader();
state.recipe.calcTime();
state.recipe.calcHuniiToo();
// 6) Joroo uzuulne
renderRecipe(state.recipe, state.likes.isLiked(id));

}
window.addEventListener("hashchange", controlRecipe);

window.addEventListener("load", e => {
    //shineer LIKE modeliig APP dunguj achaalagdahad uusgene.
    if (!state.likes)state.likes = new Like();

    //LIKE MENU-iig haah
    likesView.ToggleLikeMenu(state.likes.getNumberOfLikes());

    //LIKE-uud bval tedgeeriig Menu-d nemj haruulna
    state.likes.likes.forEach(like => likesView.renderLike(like));
})

const controlList = () => {
    state.list = new List();
// Odoo bgaa jor "state.recipe"-d hadgalagdsan bgaa, nairlaga ni state.recipe.ingredients
    listView.clearItem();

    state.recipe.ingredients.forEach(n => {
        const item = state.list.addItem(n);
        listView.renderItem(item);

    });

};

/**
 * LIKE controller
 */

const controlLike = () => {
// 1) LIKE-iin model-iig ussgene. likes hooson bval shineer uusge
if (!state.likes)state.likes = new Like();
// 2) Odoo haragdaj bgaa elementiin ID-iig olj avah
const currentRecipeId = state.recipe.id;
// 3) Ene joriig LIKE hiisen esehiig shlgah{
if (state.likes.isLiked(currentRecipeId)){
    // 4) LIKE daragdsan bhad dahin darval LIKE bhgui bolgoh
state.likes.deleteLike(currentRecipeId);
//Like Menu-s ustgah
likesView.deleteLike(currentRecipeId);
likesView.toggleLikeBtn(false);

} else { //esvel esregeeree

const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.img_url);

    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);

}

likesView.ToggleLikeMenu(state.likes.getNumberOfLikes());

};

// Sagsand hiih buttoniig darahad ajillah eventlistner
elements.recipeDev.addEventListener("click", e =>{
    if (e.target.matches(".recipe__btn, .recipe__btn *")){
        controlList();
    }
    //LIKE tovchnii event listner
    else if (e.target.matches(".recipe__love, .recipe__love *")){
        controlLike();
    }
})


elements.shoppingList.addEventListener("click", e  => {
    //click hiisen Li elementiin data-itemid attribute-iig shuuj gargaj avna
    const id = e.target.closest(".shopping__item").dataset.itemid;

    //oldson ID-tei elementiig model-s ustgana.
    state.list.deleteItem(id);

    //delgetsees ustgah oldson ID-tei elementiig ustgana.
    listView.deleteItem(id);

} );
