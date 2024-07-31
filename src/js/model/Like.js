export default class Like {

constructor(){
    this.readDataFromLocalStorage();
    if(!this.likes) this.likes =[];
}

addLike(id, title, publisher, img){
const like = {id, title, publisher, img};
this.likes.push(like);

//storage ruu hadgalna
this.saveDataToLocalStorage();

return like;
}

deleteLike(id){
    // tuhain ID-tai bichlegiin index-g massiv-s olno
    const index = this.likes.findIndex(el => el.id === id);
    // tuhain index deerh elementiig massiv-s ustgana.
    this.likes.splice(index,1);
this.saveDataToLocalStorage();

}

isLiked (id) {
    if(this.likes.findIndex(el => el.id === id)=== -1) return false;
    else return true;
};

getNumberOfLikes(){
    return this.likes.length;
}

saveDataToLocalStorage(){
localStorage.setItem("likes", JSON.stringify(this.likes));
}

readDataFromLocalStorage(){
   this.likes =  JSON.parse(localStorage.getItem("likes"));
}


}
