import { elements } from "./base";


// Private function
const renderRecipe = recipe => {
const markup = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;

// ul -ruugee nemne
elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearch = () => { elements.searchInput.value = "";}

export const clearSearchResult = () =>{
    // ul -iig tseverlene
    elements.searchResultList.innerHTML = '';
    elements.PageButtons.innerHTML = '';}
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage =10 ) => {
    //huudsand heddugeer elementees hed hurtlehiig uzuulehiig tootsoolno
    const start = (currentPage-1)*resPerPage;
    const end  = currentPage * resPerPage;
    recipes.slice(start,end).forEach(el=> renderRecipe(el));

// huudaslaltiin tovchnuudiig gargah
    const totalPages = Math.ceil(recipes.length /resPerPage);
    renderButtons(currentPage, totalPages);
}

//type ===> 'prev' , 'next'
const createButton =(page, type, direction) =>`
                <button class="btn-inline results__btn--${type}" data-goto=${page} >
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${direction}"></use>
                    </svg>
                    <span>Хуудас ${page}</span>
                </button>`;

const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;
    if(currentPage === 1 && totalPages >1 ){
        // 1-r huudas deer bna 2-j huudas gesen button-iig garga
        buttonHtml = createButton(2,"next", "right");
    }else if (currentPage < totalPages){
        buttonHtml = createButton(currentPage-1,"prev", "left");
        buttonHtml += createButton(currentPage+1,"next","right");
        //umnuh bolon daraagiin huudasruu shiljih tovchiig garga
    } else if(currentPage===totalPages){
        //hamgiin suuliin huudas deer bna Umnuhruu shiljih tovchiig uzuul
        buttonHtml = createButton(currentPage-1,"prev","left");
     }

     elements.PageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
};
