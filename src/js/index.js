import Search from "./model/search";
import Base, { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from  "./view/searchView";
import Recipe from "./model/Recipe";
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

const r = new Recipe(47746);
r.getRecipe();
