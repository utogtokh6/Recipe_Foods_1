const arr = [23, 44 ,12];
let myfunc = a =>{

    console.log(`too : ${a}`);

}

const arr2 = [...arr, 44 ,124];

myfunc(arr2[1]);
