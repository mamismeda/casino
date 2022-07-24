const inp = document.getElementById("input");
const form = document.getElementById("form");



fetch('data.json').then(response => response.json())
.then(res => {
    console.log(res);
  
    let skip = 0;

    document.querySelector('.btn-success').addEventListener('click', function () {
        skip += 60;

        GetProds(res, skip);

    })


    GetProds(res, skip);

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const searchTerm = inp.value;
   console.log(searchTerm);

   if(searchTerm && searchTerm !== ""){
    GetProds(res, searchTerm);


    inp.value = "";
    
   }else{
    window.location.reload();
   }


})


})

function GetProds(res, skip) {

let take = 60;
let outp = document.querySelector('#app');
let card;
outp.innerHTML = '';

let myres = res.GameTemplates.splice(skip, take);

let myresimg = res.GameTemplateImages;
let myresname = res.GameTemplateNameTranslations;

// 60 ელემენტის forEach
myres.forEach(game => {

  
    let img = myresimg.find(imgs => {
        return imgs.GameTemplateId == game.ID;
    })

  
    let name = myresname.find(names => {
        return names.GameTemplateId == game.ID;
    })

    card = `<div class="col-lg-2 mb-2">
    <div class="card">
<img src="https://static.inpcdn.com/${img.CdnUrl}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title text-light text-center">${name.Value}</h5>
</div>
</div>
</div>`;

    outp.innerHTML += card;


});

}