import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items =[];    }


        deleteItem(id){
            // tuhain ID-tai bichlegiin index-g massiv-s olno
            const index = this.items.findIndex(el => el.id === id);
            // tuhain index deerh elementiig massiv-s ustgana.
            this.items.splice(index,1);
        }

        addItem(item){
            let newItem = {
                id: uniqid(),
                item
            };
            this.items.push(newItem);
            return newItem;
        };
};
